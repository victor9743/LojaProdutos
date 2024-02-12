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
      "numero_pedido" => params[:numero_pedido],
    })

    if @pedido.save
      PedidoProduto.create(
        "pedido_id" => @pedido.id,
        "produto_id" => params[:produto_id],
        "qtd_produto" => params[:qtd_produto],
        "preco_final" => params[:preco_final],
        "desconto" => params[:desconto]
      )
      render json: { message: "pedido salvo com sucesso" }, status: :created
    else
      render json: { message: @pedido.errors }, status: :unprocessable_entity
    end
  end

  def update
    @pedido = Pedido.find(params[:pedido_id])

    if PedidoProduto.where(pedido_id: @pedido.id).update({
      "produto_id" => params[:produto_id],
      "qtd_produto" => params[:qtd_produto],
      "preco_final" => params[:preco_final],
      "desconto" => params[:desconto]
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
