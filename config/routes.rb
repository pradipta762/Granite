# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: JSON do
    resources :tasks, except: %i[new edit], param: :slug
    resources :users, only: :index
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
