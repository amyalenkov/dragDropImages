Gallery::Application.routes.draw do
  resources :paintings do
    # member do
    #   post :sendEmail
    # end
  end
  root to: 'paintings#index'
  post 'paintings/sendEmail'
  post 'payments/order'
  get 'payments/order'
  post 'payments/setSrcImage'
  post 'payments/afterPay'
end
