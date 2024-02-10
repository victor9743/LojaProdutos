class OfertasController < ApplicationController
  def index
    begin
      @ofertas =  Oferta.all

      render json: @ofertas, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: { message: e.message }, status: :not_found
    rescue StandardError => e
      render json: { message: e.message }, status: :internal_server_error
    end
  end

  def show
    begin
      @oferta = Oferta.find(params[:id])

      render json: @oferta, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: { message: e.message }, status: :not_found
    rescue StandardError => e
      render json: { message: e.message }, status: :internal_server_error
    end
  end

  def create
    @oferta = Oferta.new({
      "nome" => params[:nome],
      "descricao" => params[:descricao],
      "preco" => params[:preco],
      "produto_id" => params[:produto_id],
      "pedido_id" => params[:pedido_id]
    })

    if @oferta.save
      render json: { message: "oferta salva com sucesso" }, status: :created
    else
      render json: { message: @oferta.errors }, status: :unprocessable_entity
    end
  end

  def update
    @oferta = Oferta.find(params[:id])

    if @oferta.update({
      "nome" => params[:nome],
      "descricao" => params[:descricao],
      "preco" => params[:preco],
      "produto_id" => params[:produto_id],
      "pedido_id" => params[:pedido_id]
    })

      render json: { message: "oferta atualizada com sucesso" }, status: :created
    else
      render json: { message: @oferta.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @oferta = Oferta.find(params[:id])

    if @oferta.destroy
      render json: { message: "oferta removida com sucesso" }, status: :created
    else
      render json: { message: @oferta.errors }, status: :unprocessable_entity
    end
  end
end
