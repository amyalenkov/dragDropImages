Gallery::Application.routes.draw do
  resources :paintings do
    member do
      post :sendEmail
    end
  end
  root to: 'static_pages#index'
  # root to: 'paintings#index'
  post 'paintings/sendEmail'
  post 'paintings/index'
  post 'payments/order'
  post 'payments/setSrcImage'
  post 'payments/afterPay'
  post 'static_pages/index'
end
