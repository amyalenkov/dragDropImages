class PaymentsController < ApplicationController
  def order
  end

  def afterPay
    email = 'dsuschinsky@gmail.com'
    image_src = "public/assets/"+cookies['image_user_token']+".png"
    fio = params[:fio]
    cost = params[:money]
    phone = params[:phone]
    email_user = params[:email]
    address = params[:address]
    count = params[:count]
    money = params[:money]

    case params[:delivery]
      when "post delivery"
      when "free delivery"
      when nil
        @req_message = "request type is not selected"
    end

    # ImageMailer.welcome_email(email, image_src, fio, phone, email_user, address, count, money).deliver
    ImageMailer.welcome_email(email, fio, cost, phone, email_user, address, count, money, image_src).deliver
  end

  def setSrcImage
    src = params[:srcImage]
    image_data = Base64.decode64(src['data:image/png;base64,'.length .. -1])
    image_path = "public/assets/"+cookies['image_user_token']+".png"
    thumb_path = "public/assets/"+cookies['image_user_token']+"_thumb.png"
    File.open(image_path, 'wb') do |f|
      f.write image_data
    end
    resize_image image_path, thumb_path
    render nothing: true
  end

  def resize_image image_path, thumb_path
    image = Magick::Image::read(image_path).first
    image.resize_to_fit!(150)
    image.write(thumb_path)
    image.destroy!
  end
end
