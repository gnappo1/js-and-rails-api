# This file is used by Rack-based servers to start the application.

require_relative "config/environment"
# require 'rack/cors'
# use Rack::Cors do
#   allow do
#     origins 'http://matteopiccini.com/js-and-rails-api/frontend'

#     resource '*',
#       headers: :any,
#       methods: [:get, :post, :put, :patch, :delete, :options, :head]
#   end
# end
run Rails.application
Rails.application.load_server
