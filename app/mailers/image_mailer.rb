class ImageMailer < ActionMailer::Base
  default from: 'stmy999@gmail.com'

  def welcome_email(email)
    mail(to: email, subject: 'Welcome to My Awesome Site').deliver
    # attachments.inline['image.jpg'] = File.read(img)
  end
end
