class PlacesController < ApplicationController
  
  # GET ../places
  def index
    #@places = policy_scope(Place)

    @filterrific = initialize_filterrific(
      Place,
      params[:filterrific],
      :select_options => {
        sorted_by: Place.options_for_sorted_by,
        with_country_id: User.options_for_select
      }
    ) or return
    @places = @filterrific.find.page(params[:page])
    skip_authorization
    respond_to do |format|
      format.html
      format.js
    end
  end

  # GET ../places/new
  def new
    @place = Place.new(owner_id: current_user.id)
    skip_authorization
  end

  # POST ../places
  def create
    @place = current_user.owned_places.create(place_params)
    skip_authorization
    respond_to do |format|
      if @place.save
        format.html { redirect_to profile_path, notice: 'Place was successfully created.' }
      else
        format.html { render :new }
      end
    end
  end
  
  #Created just for policy authorization purposes to use in the future
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

  # DELETE ../place/:id
  def destroy
    @place = Place.find(params[:id])
    authorize @place
    @place.destroy
    respond_to do |format|
      format.html {redirect_to user_places_url(current_user.id), notice: 'Place was successfully destroyed.' }
    end
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def place_params
      params.require(:place).permit(:comments, :photo)
    end


end
