class SettingsController < ApplicationController

  def change_locale
    skip_authorization
    language = params[:locale].to_s.strip.to_sym
    language = I18n.default_locale unless I18n.available_locales.include?(language)
    current_user.locale_value = language
    current_user.save
    I18n.locale = language
    redirect_to request.referer || root_url
  end

end


