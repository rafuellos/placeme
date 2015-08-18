class PlacesController < ApplicationController
  
  # GET ../tasks
  def index
    @places = policy_scope(Place)
    #@places = Place.all
    #binding.pry
  end

  # GET ../tasks/new
  def new
    @place = Place.new
    skip_authorization
  end

  # POST ../tasks
  def create
    @place = current_user.owned_places.create(place_params)
    skip_authorization
    respond_to do |format|
      if @place.save
        format.html { redirect_to profile_path, notice: 'Task was successfully created.' }
      else
        format.html { render :new }
      end
    end
  end
  
  #Created just for policy authorization purposes to use in the future
  def update
    @place = Place.find(params[:id])
    raise "not authorized" unless PlacePolicy.new(current_user, @place).update?
    if @place.update(post_params)
    #if @post.update_attributes(permitted_attributes(@post))

      redirect_to @place
    else
      render :edit
    end
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def place_params
      params.require(:place).permit(:comments, :owner_id)
    end


end
