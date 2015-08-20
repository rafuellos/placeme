class Place < ActiveRecord::Base
  belongs_to :owner, class_name: 'User', foreign_key: :owner_id
  validates :owner,  presence: true
  validates :comments, presence: true

  #Include when geolocation is available
  #validates :location, presence: true

  has_attached_file :photo, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => ":style/missing.png"
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/

  self.per_page = 10

  filterrific(
    default_filter_params: { sorted_by: 'created_at_desc' },
    available_filters: [
      :search_query,
      :sorted_by,
      :with_owner_id,
      :with_created_at
    ]
  )
  scope :search_query, lambda { |query|
      return nil  if query.blank?
      # condition query, parse into individual keywords
      terms = query.downcase.split(/\s+/)
      # replace "*" with "%" for wildcard searches,
      # append '%', remove duplicate '%'s
      terms = terms.map { |e|
        (e.gsub('*', '%') + '%').gsub(/%+/, '%')
      }
      # configure number of OR conditions for provision
      # of interpolation arguments. Adjust this if you
      # change the number of OR conditions.
      num_or_conditions = 1
      where(
        terms.map {
          or_clauses = [
            "LOWER(places.comments) LIKE ?",
          ].join(' OR ')
          "(#{ or_clauses })"
        }.join(' AND '),
        *terms.map { |e| [e] * num_or_conditions }.flatten
      )
    }

  scope :with_owner_id, lambda { |owner_ids|
    where(:owner_id => [*owner_ids])
  }

  scope :with_created_at_gte, lambda { |ref_date|
    where('places.created_at >= ?', ref_date)
  }

  scope :sorted_by, lambda { |sort_option|
    # extract the sort direction from the param value.
    direction = (sort_option =~ /desc$/) ? 'desc' : 'asc'
    case sort_option.to_s
    when /^created_at_/
      order("places.created_at #{ direction }")
    else
      raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
    end
  }


  def self.options_for_sorted_by
    [
      ['Owner Id', 'owner_id_asc'],
      ['Owner Id', 'owner_id_desc'],
      ['Id up', 'id_asc'],
      ['Id down', 'id_desc'],
      ['Registration date (newest first)', 'created_at_desc'],
      ['Registration date (oldest first)', 'created_at_asc']
    ]
  end

  def decorated_created_at
    created_at.to_date.to_s(:long)
  end

  def self.get_year(year)
      where("strftime('%Y', created_at) = ?", year)
   end

end
