class UsersController < ApplicationController

  before_action :authenticate_user!

    def profile
      @user = current_user  
      skip_authorization  
      render 'users/profile'
    end


    def set_coordinates
      current_user.longitude = params[:longitude]
      current_user.latitude = params[:latitude]
      current_user.save
    end
    

end
