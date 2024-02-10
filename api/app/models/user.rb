class User < ApplicationRecord
  validates :usuario, presence: {message: "Campo nome obrigatório"}, uniqueness: {message: "usuário já existente"}
  validates :password, presence: {message: "Campo password obrigatório"}
end
