class AddPhotoColumnToPlaces < ActiveRecord::Migration
  def up
    add_attachment :places, :photo
  end

  def down
    remove_attachment :places, :photo
  end
end
