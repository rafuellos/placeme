class PlacesController < ApplicationController

  def index
    @filterrific = initialize_filterrific(
      policy_scope(Place),
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
    #if @place.update(post_params)
    if @place.update_attributes(permitted_attributes(@place))
      redirect_to user_places_path(current_user.id)
    else
      render :edit
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
