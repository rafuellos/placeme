class RemoveColumnsLongitudeLatitudeOfUsers < ActiveRecord::Migration
  def up
    remove_column :users, :longitude
    remove_column :users, :latitude
  end

  def down
    add_column :users, :longitude, :float, default: 0
    add_column :users, :latitude, :float, default: 0
  end
end
