# frozen_string_literal: true

FactoryBot.define do
  factory :preference do
    user
    last_notification_sent_date { Time.zone.today }
  end
end
