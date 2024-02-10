class User < ApplicationRecord
  validates :nome, presence: {message: "Campo nome obrigatório"}, uniqueness: {message: "usuário já existente"}
end
