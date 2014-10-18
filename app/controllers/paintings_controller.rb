class PaintingsController < ApplicationController
  # require 'app/mailers/image_mailer'
  def index
    @paintings = Painting.all
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
  require 'base64'
  def sendEmail
    p 'email: ' + params[:email]
    src = params[:srcImage]
    # p src
    # p src['data']
    image_data = Base64.decode64(src['data:image/png;base64,'.length .. -1])
    File.open("tmp/image.png", 'wb') do |f|
      f.write image_data
    end
    ImageMailer.welcome_email(params[:email]).deliver
    render :nothing => true
  end
end
