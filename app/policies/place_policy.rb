  
class PlacePolicy < ApplicationPolicy

  def update?
    user.id == record.owner_id
  end

  def create?
    user.id == record.owner.id
  end

  def share?
    user.id == record.owner.id
  end

  def owner_of?
    user.id == record.owner_id
  end

  def destroy?
    user.id == record.owner_id
  end

  def permitted_attributes
    if (user.id == record.owner_id)
      [:comments, :photo]
    end
  end

  class Scope < Scope
    def resolve
        scope.where(owner_id: @user.id)
    end
  end


end