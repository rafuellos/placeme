  
class UserPolicy < ApplicationPolicy

  def update?
    user.id == record.id
  end

  def create?
    user.id == record.id
  end

  def share?
    user.id == record.id
  end

  def owner_of?
    user.id == record.id
  end

  def destroy?
    user.id == record.id
  end

  def permitted_attributes
    if (user.id == record.id)
      [:comments, :photo]
    end
  end

  class Scope < Scope
    def resolve
      scope.where(id: @user.id)
    end
  end



end