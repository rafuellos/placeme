class Place < ActiveRecord::Base
  belongs_to :owner, class_name: 'User', foreign_key: :owner_id
  validates :owner,  presence: true
  validates :comments, :title, presence: true
  validates :longitude, :latitude, numericality: true, presence: true

  #Include when geolocation is available
  #validates :location, presence: true

  has_attached_file :photo, :styles => {:medium => "400x400>", :thumb => "100x100>" }, :default_url => ":style/missing.png"
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/

  filterrific :default_filter_params => { :sorted_by => 'created_at_desc' },
              :available_filters => %w[
                sorted_by
                search_query
                with_owner_id
                with_year
                with_created_at
              ]

  # default for will_paginate
  self.per_page = 8

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
          "LOWER(places.title) LIKE ?"
        ].join(' OR ')
        "(#{ or_clauses })"
      }.join(' AND '),
      *terms.map { |e| [e] * num_or_conditions }.flatten
    )
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
  scope :with_owner_id, lambda { |owner_id|
    where(:owner_id => [*owner_id])
  }

  scope :with_year, lambda { |year|
    #year = DateTime.parse(year)
    where("YEAR(created_at) = ?", year)
  }

  scope :with_created_at, lambda { |ref_date|
    date = DateTime.parse(ref_date)
    where(:created_at => date.beginning_of_day..date.end_of_day)
  }

  def self.options_for_sorted_by
    [
      ['Registration date (newest first)', 'created_at_desc'],
      ['Registration date (oldest first)', 'created_at_asc'],
    ]
  end

  def decorated_created_at
    created_at.to_date.to_s(:long)
  end


end
