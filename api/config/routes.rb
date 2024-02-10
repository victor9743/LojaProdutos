Rails.application.routes.draw do
  resources :produtos
  resources :pedidos
  resources :users
  resources :ofertas
end
