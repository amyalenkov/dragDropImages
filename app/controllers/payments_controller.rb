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
    p 'set src image'
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
