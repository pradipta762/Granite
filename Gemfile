# frozen_string_literal: true

source "https://rubygems.org"

ruby "3.3.5"

gem "rails", "~> 7.1.3", ">= 7.1.3.4"

gem "sprockets-rails"

gem "sqlite3", "~> 1.4"

gem "puma", ">= 5.0"

gem "jsbundling-rails"

gem "jbuilder"

gem "responders"

gem "tzinfo-data", platforms: %i[ windows jruby ]

gem "bootsnap", require: false

group :development, :test do
  gem "debug", platforms: %i[ mri windows ]

  # For code formatting and linting
  gem "rubocop", require: false
  gem "rubocop-rails", require: false

  # For linting ERB files
  gem "erb_lint", require: false, git: "https://github.com/Shopify/erb-lint.git", branch: "main"
end

group :development do
  gem "web-console"

end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end

gem "react-rails", "~> 2.7.1"

gem "pry-byebug"
