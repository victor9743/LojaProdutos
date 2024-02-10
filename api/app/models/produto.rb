class Produto < ApplicationRecord
  validates :nome, presence: {message: "Campo nome obrigatório"}, uniqueness: {message: "nome do campo já existente"}
  validates :preco, presence: {message: "Campo preço obrigatório"}
  validates :desconto, presence: {message: "Campo desconto obrigatório"}
  has_many  :pedidos
end
