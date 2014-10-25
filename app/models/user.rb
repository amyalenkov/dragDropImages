# require '../../app/models/user'
class User < ActiveRecord::Base
  attr_accessible :email, :lastName, :token

  has_many :paintings

  def User.new_remember_token
    SecureRandom.urlsafe_base64
  end

  def User.encrypt(token)
    Digest::SHA1.hexdigest(token.to_s)
  end

  private

  def create_remember_token
    self.token = User.encrypt(User.new_remember_token)
  end

end
