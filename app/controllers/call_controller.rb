class CallController < ApplicationController
  def order
  end

  def order_call
    email = 'dsuschinsky@gmail.com'
    name = params[:name_zakaz]
    phone = params[:phone_zakaz]
    text_area = params[:text_area_zakaz]
    puts name
    puts phone
    puts text_area
    ImageMailer.welcome_email_order_call(email, name, phone, text_area).deliver
    respond_to do |format|
      format.html { redirect_to :back }
    end
  end

end
