  
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

  def sharing?
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
      #scope.joins(:places_users).where("places.user_id = :owner_id or places_users.shared_user_id = @user_id")
    end
  end


# SELECT "places".* FROM "places" INNER JOIN "places_users" ON
# "places"."id" = "places_users"."shared_place_id" WHERE "places_users"."shared_user_id"
#  = $1

end