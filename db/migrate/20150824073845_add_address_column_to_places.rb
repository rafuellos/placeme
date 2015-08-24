class AddAddressColumnToPlaces < ActiveRecord::Migration
  def change
    add_column :places, :address, :text
  end
end
