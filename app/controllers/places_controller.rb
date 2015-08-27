class PlacesController < ApplicationController

  def index
    @users = User.where.not(id: current_user.id)
    total_places = current_user.owned_places + current_user.shared_places
    binding.pry
    @filterrific = initialize_filterrific(
      policy_scope(Place),
      #total_places,
      params[:filterrific],
      :select_options => {
        sorted_by: Place.options_for_sorted_by,
        with_owner_id: User.options_for_select
      }
    ) or return
    @places = @filterrific.find.page(params[:page])
    
    respond_to do |format|
      format.html
      format.js
    end
    
  end

  def map
    skip_authorization
  end

  def share
    @user = User.find(params[:user][:user_id])
    @place = Place.find(params[:place_id])
    @user.shared_places.push(@place)
    binding.pry
    skip_authorization
    respond_to do |format|
      if @place
        format.html { redirect_to user_places_path(current_user), notice: 'Place was successfully shared with: ' + @user.name  }
      end
    end
  end  

  def show
    @place = Place.find(params[:id])
    authorize @place
  end


  def new
    @place = Place.new(owner_id: current_user.id)
    skip_authorization
    respond_to do |format|
      format.js
    end
  end

  def create
    @place = current_user.owned_places.create(place_params)
    #binding.pry 
    skip_authorization
    respond_to do |format|
      if @place.save
        format.html { redirect_to user_places_path(current_user), notice: 'Place was successfully created.' }
      else
        format.html { render :new }
      end
    end
  end
  
  def edit
    @place = Place.find(params[:id])
    authorize @place
  end

  def update
    @place = Place.find(params[:id])

    raise "not authorized" unless PlacePolicy.new(current_user, @place).update?
    authorize @place


    if @place.update_attributes place_params
      redirect_to user_places_path(current_user)
    else
      @errors = @concert.errors.full_messages
      render 'edit'
    end

  end

  def destroy
    @place = Place.find(params[:id])
    authorize @place
    @place.destroy
    respond_to do |format|
      format.html {redirect_to user_places_url(current_user.id), notice: 'Place was successfully destroyed.' }
    end
  end

  private

    def place_params
      params.require(:place).permit(:comments, :photo, :title, :longitude, :latitude, :address)
    end


end
