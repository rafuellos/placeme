class PlacesController < ApplicationController
  
  def index
    @posts = policy_scope(Post)
  end


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


end
