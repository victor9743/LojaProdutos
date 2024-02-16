class ProdutosController < ApplicationController
  def index
    begin
      @produtos = Produto.order(id: :desc).all

      render json: @produtos, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: { message: e.message }, status: :not_found
    rescue StandardError => e
      render json: { message: e.message }, status: :internal_server_error
    end
  end

  def show
    begin
      @produto = Produto.find(params[:id])

      render json: @produto, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: { message: e.message }, status: :not_found
    rescue StandardError => e
      render json: { message: e.message }, status: :internal_server_error
    end
  end

  def create
    @produto = Produto.new({
      "nome" => params[:nome],
      "descricao" => params[:descricao],
      "preco" => formatarValor(params[:preco]),
      "desconto" => formatarValor(params[:desconto].to_f)
    })

    if params[:descontoAtivo]
      @produto.desconto_ativo = params[:descontoAtivo]
      @produto.preco_desconto = formatarValor(Produto.descontoAtivo(params[:preco], params[:desconto]))
    end

    if @produto.save
      render json: { message: "produto salvo com sucesso" }, status: :created
    else
      render json: { message: @produto.errors }, status: :unprocessable_entity
    end
  end

  def update
    @produto = Produto.find(params[:id])

    if params[:descontoAtivo]
      @desconto = formatarValor(params[:desconto])
      @desconto_ativo = params[:descontoAtivo]
      @preco_desconto = formatarValor(Produto.descontoAtivo(params[:preco], params[:desconto]))
    else
      @desconto = 0
      @desconto_ativo = false
      @preco_desconto = 0
    end

    if @produto.update({
      "nome" => params[:nome],
      "descricao" => params[:descricao],
      "preco" => params[:preco],
      "desconto" => @desconto,
      "desconto_ativo" => @desconto_ativo,
      "preco_desconto" => @preco_desconto
    })

      render json: { message: "produto atualizado com sucesso" }, status: :created
    else
      render json: { message: @produto.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @produto = Produto.find(params[:id])

    if @produto.destroy
      render json: { message: "produto removido com sucesso" }, status: :created
    else
      render json: { message: @produto.errors }, status: :unprocessable_entity
    end
  end
end
