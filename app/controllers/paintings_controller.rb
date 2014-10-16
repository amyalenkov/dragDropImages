class PaintingsController < ApplicationController
  # require 'app/mailers/image_mailer'
  def index
    @paintings = Painting.all
    ImageMailer.welcome_email('stmy999@gmail.com').deliver
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
