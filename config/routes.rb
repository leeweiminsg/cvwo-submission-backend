Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post 'authenticate', to: 'authentication#authenticate'
  resources :users, only: [:create, :show, :index]
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

  namespace :api do
    jsonapi_resources :tasks
    jsonapi_resources :tags
  end
end