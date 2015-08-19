class SettingsController < ApplicationController

  def change_locale
    skip_authorization
    l = params[:locale].to_s.strip.to_sym
    l = I18n.default_locale unless I18n.available_locales.include?(l)
    cookies.permanent[:placeme_locale] = l
    redirect_to request.referer || root_url
  end

end


