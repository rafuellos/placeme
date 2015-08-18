  
class PlacePolicy < ApplicationPolicy

  def update?
    user.id == record.user_id
  end

  def create?
    user.id == record.user_id
  end

  def share?
    user.id == record.user_id
  end

  def owner_of?
    user.id == place.owner_id
  end

  # def permitted_attributes
  #   if user.owner_of?(place)
  #     [:comment]
  #   end
  # end

  class Scope < Scope
    def resolve
        scope.where(owner_id: @user.id)
    end
  end


end