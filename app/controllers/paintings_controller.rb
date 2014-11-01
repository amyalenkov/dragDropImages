class PaintingsController < ApplicationController
  def index
    @user = get_user(cookies['image_user_token'])
    @paintings = @user.paintings
    # @paintings = Painting.all
  end

  def get_user(token)
    if token == nil
      new_token = User.new_remember_token
      encrypt = User.encrypt(new_token)
      user = User.create()
      user.token = encrypt
      user.save
      cookies['image_user_token'] = new_token
      return user
    else
      User.find_by_token(User.encrypt(token))
    end
  end

  def show
    @painting = Painting.find(params[:id])
  end

  def new
    @painting = Painting.new
  end

  def create
    @painting = Painting.create(params[:painting])
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
end
