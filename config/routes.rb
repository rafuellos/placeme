Rails.application.routes.draw do
  devise_for :users
  get 'users/set_coordinates', to: 'users#set_coordinates'
  get 'profile', to: 'users#profile'
  root to: 'users#profile'
  post 'places/share', to: 'places#share'

  match '/signup',    to: 'users#new',    via: 'get'

  resources :users do
    resources :places
  end

  get '/change_locale/:locale', to: 'settings#change_locale', as: :change_locale
  get '/users/:user_id/map', to: 'places#map', as: :places_map
 
end
