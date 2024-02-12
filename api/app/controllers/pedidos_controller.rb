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
      @pedido_produto = PedidoProduto.where(pedido_id: @pedido.id)
      @array_produtos = []
      @pedido_produto.each do |produto|
        @array_produtos << produto.produto_id
      end

      @produtos = Produto.where("id in (#{@array_produtos.join(",")})")

      render json: { pedido: @pedido, pedido_produto: @pedido_produto, produtos: @produtos }, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: { message: e.message }, status: :not_found
    rescue StandardError => e
      render json: { message: e.message }, status: :internal_server_error
    end
  end

  def create
    @pedido = Pedido.new({
      "numero_pedido" => (Time.now.to_f * 1000).to_i,
    })


    if @pedido.save
      @produtos = params[:produtos]

      @produtos.each do |produto|
        @produto = Produto.find(produto["id"])

        PedidoProduto.create({
          "pedido_id" => @pedido.id,
          "produto_id" => @produto.id,
          "qtd_produto" => produto["qtd"],
          "preco_final" => produto["valorFinal"],
          "desconto" => @produto.desconto
        })
      end

      render json: { message: "pedido salvo com sucesso" }, status: :created
    else
      render json: { message: @pedido.errors }, status: :unprocessable_entity
    end
  end

  def update
    # @pedido = Pedido.find(params[:pedido_id])

    # if PedidoProduto.where(pedido_id: @pedido.id).update({
    #   "produto_id" => params[:produto_id],
    #   "qtd_produto" => params[:qtd_produto],
    #   "preco_final" => params[:preco_final],
    #   "desconto" => params[:desconto]
    # })

    #   render json: { message: "pedido atualizado com sucesso" }, status: :created
    # else
    #   render json: { message: @pedido.errors }, status: :unprocessable_entity
    # end
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
