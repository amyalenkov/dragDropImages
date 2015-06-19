class CanvasesController < ApplicationController

  before_filter :get_user

  def index
    @template = 'template1';
    @paintings = @user.paintings
  end

  def choice_canvas
    @template = params[:template]
    respond_to do |format|
      format.js {}
    end
  end

  private

  def get_user
    token = cookies['image_user_token']
    if token == nil
      create_new_token_and_user
    else
      @user = User.find_by_token(User.encrypt(token))
      if @user.nil?
        create_new_token_and_user
      end
    end
  end

  def create_new_token_and_user
    new_token = User.new_remember_token
    encrypt = User.encrypt(new_token)
    @user = User.create
    @user.token = encrypt
    @user.save!
    cookies['image_user_token'] = new_token
  end
end
