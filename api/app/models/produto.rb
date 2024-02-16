class Produto < ApplicationRecord
  validates :nome, presence: {message: "Campo nome obrigatório"}, uniqueness: {message: "nome do campo já existente"}
  validates :preco, presence: {message: "Campo preço obrigatório"}
  has_many  :pedidos

  def  self.descontoAtivo(valor, desconto)
    @valorDesconto = valor - (valor * (desconto / 100.0));
    return @valorDesconto
  end
end
