class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  include Pundit
  unless Rails.env.development?
    protect_from_forgery with: :exception
  end
  
  after_action :verify_authorized, :except => :index, unless: :devise_controller?
  #after_action :verify_policy_scoped, :only => :index, unless: :devise_controller?

  before_action :set_locale

  def set_locale
    if cookies[:placeme_locale] && I18n.available_locales.include?(cookies[:placeme_locale].to_sym)
      l = cookies[:placeme_locale].to_sym
    else
      l = I18n.default_locale
      cookies.permanent[:placeme_locale] = l
    end
    I18n.locale = l
  end
  before_action :configure_permitted_parameters, if: :devise_controller?
  protected
    def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_up) << :name
    end
end
