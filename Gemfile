source 'https://rubygems.org'
gem 'devise'
gem 'pundit'

platforms :ruby do # linux

gem 'unicorn'

end

platforms :mswin do # gems specific to windows

end

gem 'leaflet-rails'

gem "paperclip", "~> 4.3"

gem 'globalize', '~> 5.0.0'
gem 'rails-i18n', '~> 4.0.0'

gem 'filterrific'
gem 'will_paginate', '~> 3.0.6'

gem 'bundler', '>= 1.8.4'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.3'
# Use postgresql as the database for Active Record
group :development, :production do 
  gem 'pg' 
end
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  gem 'pry-rails'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]


source 'https://rails-assets.org' do
  gem 'rails-assets-bootstrap'
end