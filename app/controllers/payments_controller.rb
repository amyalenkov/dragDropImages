class PaymentsController < ApplicationController
  def order
    p 'order12'
  end

  def afterPay
    p 'pay'
  end

  def setSrcImage
    p 'setSrcImage'
    @srcImage = params[:srcImage]
    render nothing: true;
  end
end
