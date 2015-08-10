Gallery::Application.routes.draw do
  get "canvases/index"

  get "canvases/choise_canvas"

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
  post 'call/order'
  post 'payments/setSrcImage'
  post 'payments/afterPay'
  post 'call/order_call'
  post 'static_pages/index'

  get 'canvases/index'
  post 'canvases/choice_canvas'
end
