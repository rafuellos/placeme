class UsersController < ApplicationController

  before_action :authenticate_user!

    def profile
      @user = current_user  
      skip_authorization  
      render 'users/profile'
    end

    

end
