class PaymentsController < ApplicationController
  def order
    p 'order'
  end

  def afterPay
    p 'pay'
    p params[:cost_title]

    # p params[:finalCost]
  end

  def setSrcImage
    p 'setSrcImage'

    src = params[:srcImage]
    image_data = Base64.decode64(src['data:image/png;base64,'.length .. -1])
    File.open("public/assets/"+cookies['image_user_token']+".png", 'wb') do |f|
      f.write image_data
    end
    render nothing: true
  end
end
