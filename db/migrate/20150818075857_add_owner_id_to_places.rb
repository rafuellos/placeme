class AddOwnerIdToPlaces < ActiveRecord::Migration
  def change
    add_column :places, :owner_id, :integer
  end
end
