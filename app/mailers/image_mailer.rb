class ImageMailer < ActionMailer::Base
  # default from: 'stmy999@gmail.com'
  default from: 'dsuschinsky@gmail.com'

  def welcome_email(email, fio, cost, phone, email_user, address, count, money, image)
  # def welcome_email(email, fio, cost, phone, email_user, address, count, money)
    attachments['image.jpg'] = File.read(image)
    @fio = fio
    @cost = cost
    @phone = phone
    @user_email = email_user
    @address = address
    @count = count
    @money = money
    mail(to: email, subject: 'Welcome to My Awesome Site').deliver
  end
end
