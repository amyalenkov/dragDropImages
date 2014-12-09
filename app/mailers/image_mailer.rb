class ImageMailer < ActionMailer::Base
  # default from: 'stmy999@gmail.com'
  default from: 'dsuschinsky@gmail.com'

  def welcome_email(email, image, fio, phone, user_email, address, post, comment, cost)
    attachments['image.jpg'] = File.read(image)
    @fio = fio
    @phone = phone
    @user_email = user_email
    @address = address
    @post = post
    @comment = comment
    @cost = cost
    mail(to: email, subject: 'Welcome to My Awesome Site').deliver
  end
end
