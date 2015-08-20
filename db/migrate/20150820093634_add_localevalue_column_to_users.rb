class AddLocalevalueColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :locale_value, :string
    remove_column :users, :locale
  end
end
