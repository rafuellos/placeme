class AddCommentColumnToPlaces < ActiveRecord::Migration
  def change
    add_column :places, :comments, :text
  end
end
