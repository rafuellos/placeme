class AddDefaultValueToLatitudeAndLongitudeOnPlaces < ActiveRecord::Migration
  def up
    change_column :places, :longitude, :float, default: 0
    change_column :places, :latitude, :float, default: 0
  end

  def down
    change_column :places, :longitude, :float, default: nil
    change_column :places, :latitude, :float, default: nil
  end
end
