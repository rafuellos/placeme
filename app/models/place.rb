class Place < ActiveRecord::Base
  belongs_to :owner, class_name: 'User', foreign_key: :owner_id
  validates :owner,  presence: true

  has_attached_file :photo, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => ":style/missing.png"
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/

end
