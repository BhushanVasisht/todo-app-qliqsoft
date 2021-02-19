Rails.application.routes.draw do
  resources :todos

  root 'todos#index'
  get 'todo/about'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
