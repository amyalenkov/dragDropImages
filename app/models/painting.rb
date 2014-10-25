class Painting < ActiveRecord::Base
  attr_accessible :image, :name
  mount_uploader :image, ImageUploader

  belongs_to :user

  before_create :default_name

  def default_name
    self.name ||= File.basename(image.filename, '.*').titleize if image
  end
end
