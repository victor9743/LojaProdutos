class PedidosController < ApplicationController
  def index
    begin
      @pedidos = Pedido.all

      render json: @pedidos, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: { message: e.message }, status: :not_found
    rescue StandardError => e
      render json: { message: e.message }, status: :internal_server_error
    end
  end

  def show
    begin
      @pedido = Pedido.find(params[:id])

      render json: @pedido, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: { message: e.message }, status: :not_found
    rescue StandardError => e
      render json: { message: e.message }, status: :internal_server_error
    end
  end

  def create
    @pedido = Pedido.new({
      "produto_id" => params[:produto_id],
      "qtd_produto" => params[:qtd_produto],
      "preco_final" => params[:preco_final],
      "user_id" => params[:user_id],
      "desconto" => params[:desconto],
      "atendimento" => params[:atendimento]
    })

    if @pedido.save
      render json: { message: "pedido salvo com sucesso" }, status: :created
    else
      render json: { message: @pedido.errors }, status: :unprocessable_entity
    end
  end

  def update
    @pedido = Pedido.find(params[:id])

    if @pedido.update({
      "produto_id" => params[:produto_id],
      "qtd_produto" => params[:qtd_produto],
      "preco_final" => params[:preco_final],
      "user_id" => params[:user_id],
      "desconto" => params[:desconto],
      "atendimento" => params[:atendimento]
    })

      render json: { message: "pedido atualizado com sucesso" }, status: :created
    else
      render json: { message: @pedido.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @pedido = Pedido.find(params[:id])

    if @pedido.destroy
      render json: { message: "pedido removido com sucesso" }, status: :created
    else
      render json: { message: @pedido.errors }, status: :unprocessable_entity
    end
  end
end
