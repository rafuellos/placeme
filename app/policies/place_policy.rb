  
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

=begin
  def permitted_attributes
    if user.admin? || user.owner_of?(post)
      [:title, :body, :tag_list]
    else
      [:tag_list]
    end
  end=end


  class Scope < Scope
    def resolve
      if user.admin?
        scope.all
      else
        scope.where(user_id: @user.id)
      end
    end
  end


end