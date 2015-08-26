class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :owned_places, class_name: 'Place', foreign_key: :owner_id
  has_and_belongs_to_many :shared_places, class_name: 'Place', :join_table => "places_user", foreign_key: :shared_id 

  validates :email, presence: true
  validates :locale_value, presence: true

  def all_places
      (self.owned_places + self.shared_places).uniq
  end


  def self.options_for_select
      order('LOWER(name)').map { |user| [user.name, user.id] }
  end


end
