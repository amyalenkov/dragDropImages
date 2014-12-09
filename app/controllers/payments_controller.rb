class PaymentsController < ApplicationController
  def order
  end

  def afterPay
    p params[:cost_title]
    email = 'dsuschinsky@gmail.com'
    image_src = "public/assets/"+cookies['image_user_token']+".png"
    cost = params['cost'] + '*' + params['count'] + '=' + params['finalCost']
    ImageMailer.welcome_email(email, image_src,
      params['fio'], params['phone'], params['email'], params['address'], params['post'], params['comment'],
      cost).deliver
  end

  def setSrcImage
    src = params[:srcImage]
    image_data = Base64.decode64(src['data:image/png;base64,'.length .. -1])
    File.open("public/assets/"+cookies['image_user_token']+".png", 'wb') do |f|
      f.write image_data
    end
    render nothing: true
  end
end
