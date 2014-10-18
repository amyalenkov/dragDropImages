class ImageMailer < ActionMailer::Base
  default from: 'stmy999@gmail.com'

  def welcome_email(email)
    attachments['image.jpg'] = File.read("tmp/image.png")
    mail(to: email, subject: 'Welcome to My Awesome Site').deliver
  end
end
