class Produto < ApplicationRecord
  validates :nome, presence: {message: "Campo nome obrigatório"}, uniqueness: {message: "nome do campo já existente"}
  validates :descricao, presence: {message: "Campo nome obrigatório"}, uniqueness: {message: "nome do campo já existente"}
  validates :preco, presence: {message: "Campo nome obrigatório"}, uniqueness: {message: "nome do campo já existente"}
  validates :preco, presence: {message: "Campo nome obrigatório"}, uniqueness: {message: "nome do campo já existente"}
end
