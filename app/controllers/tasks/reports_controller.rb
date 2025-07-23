# frozen_string_literal: true

class Tasks::ReportsController < ApplicationController
  def create
    ReportsJob.perform_async(current_user.id, report_path)
    render_notice(t("in_progress", action: "Report generation"))
  end

  def download
    if File.exist?(report_path)
      send_file(
        report_path,
        type: "application/pdf",
        filename: pdf_file_name,
        disposition: "attachment"
      )
    end
  end

  private

    def report_path
      @_report_path ||= Rails.root.join("tmp/#{pdf_file_name}")
    end

    def pdf_file_name
      # "granite_task_report.pdf"
      "#{get_user_title}_#{get_today}_report.pdf"
    end

    def get_today
      Time.current.strftime("%A").parameterize
    end

    def get_user_title
      current_user.name.parameterize.underscore
    end
end
