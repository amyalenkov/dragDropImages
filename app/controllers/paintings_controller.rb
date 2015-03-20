class PaintingsController < ApplicationController

  before_filter :get_user

  def index
    @paintings = @user.paintings
  end

  def show
    @painting = Painting.find(params[:id])
  end

  def new
    @painting = Painting.new
  end

  def create
    @painting = Painting.create(params[:painting])
    @painting.user = @user
    @painting.save
  end

  def edit
    @painting = Painting.find(params[:id])
  end

  def update
    @painting = Painting.find(params[:id])
    if @painting.update_attributes(params[:painting])
      redirect_to paintings_url, notice: "Painting was successfully updated."
    else
      render :edit
    end
  end

  def destroy
    puts "here in destroy #{params[:id]} - starting"
    @painting = Painting.find(params[:id])
    @painting.destroy
    puts "here in destroy #{params[:id]} - done"
    redirect_to paintings_url, notice: "Painting was successfully destroyed."
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
