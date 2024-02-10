class Oferta < ApplicationRecord
  validates :preco, presence: {message: "Campo preço obrigatório"}
end
