class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  include Pundit
  unless Rails.env.development?
    protect_from_forgery with: :exception
  end
  
  after_action :verify_authorized, :except => :index, unless: :devise_controller?
  #after_action :verify_policy_scoped, :only => :index, unless: :devise_controller?

  before_action :set_locale, unless: :devise_controller?

  def set_locale
    if current_user.locale_value && I18n.available_locales.include?(cookies[:placeme_locale].to_sym)
      language = current_user.locale_value.to_sym
    else
      language = I18n.default_locale
      current_user.locale = language
    end
    I18n.locale = language
  end
  
  
  before_action :configure_permitted_parameters, if: :devise_controller?
  protected
    def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_up) << :name << :locale_value
    end
end
