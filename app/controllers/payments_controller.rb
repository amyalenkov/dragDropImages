class PaymentsController < ApplicationController
  def order
    p 'order12'
    href =  '/payments/order'
    render nothing: true
  end
end
