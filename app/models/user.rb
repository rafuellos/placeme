class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :owned_places, class_name: 'Place', foreign_key: :owner_id
  validates :locale_value,  presence: true


  def self.options_for_select
      order('LOWER(name)').map { |user| [user.name, user.id] }
  end


end
