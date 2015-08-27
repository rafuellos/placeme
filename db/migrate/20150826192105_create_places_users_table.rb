class CreatePlacesUsersTable < ActiveRecord::Migration
  def change
    create_table :places_users, id: false do |t|
      t.belongs_to :shared_place, index: true
      t.belongs_to :shared_user, index: true

    end
  end
end
