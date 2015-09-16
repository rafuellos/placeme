class UsersController < ApplicationController

  before_action :authenticate_user!

    def profile
      @user = current_user  
      skip_authorization  
      render 'users/profile'
    end


    def destroy
      @user = User.find params[:id]
      @user.destroy
      skip_authorization
      redirect_to profile_path
    end

      
end
