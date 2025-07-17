# frozen_string_literal: true

require "test_helper"

class TasksControllerTest < ActionDispatch::IntegrationTest
  def setup
    @creator = create(:user)
    @assignee = create(:user)
    @task = create(:task, assigned_user: @assignee, task_owner: @creator)

    @creator_headers = headers(@creator)
    @assignee_headers = headers(@assignee)
  end

  def test_should_list_all_tasks_for_valid_user
    get tasks_path, headers: @creator_headers
    assert_response :success
    response_json = response.parsed_body
    all_tasks = response_json["tasks"]

    expected_pending_tasks_ids = Task.where(progress: "pending").pluck(:id).sort
    expected_completed_tasks_ids = Task.where(progress: "completed").pluck(:id).sort

    actual_pending_tasks_ids = all_tasks["pending"].pluck("id").sort
    actual_completed_tasks_ids = all_tasks["completed"].pluck("id").sort

    assert_equal expected_pending_tasks_ids, actual_pending_tasks_ids
    assert_equal expected_completed_tasks_ids, actual_completed_tasks_ids
  end

  def test_should_create_valid_task
    post tasks_path,
      params: { task: { title: "Learn Ruby", task_owner_id: @creator.id, assigned_user_id: @assignee.id } },
      headers: @creator_headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", entity: "Task"), response_json["notice"]
  end

  def test_not_found_error_rendered_for_invalid_task_slug
    invalid_slug = "invalid-slug"

    get task_path(invalid_slug), headers: @creator_headers
    assert_response :not_found
    assert_equal I18n.t("task.not_found"), response.parsed_body["error"]
  end
end
