class Pedido < ApplicationRecord
  validates :produto_id, presence: {message: "Campo nome obrigatório"}
  validates :qtd_produto, presence: {message: "Campo qtd produto obrigatório"}
  validates :preco_final, presence: {message: "Campo preço final obrigatório"}
  validates :user_id, presence: {message: "Campo usuário obrigatório"}
  belongs_to :produto
  belongs_to :user
end
