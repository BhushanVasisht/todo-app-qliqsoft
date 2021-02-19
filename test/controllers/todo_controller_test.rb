require "test_helper"

class TodoControllerTest < ActionDispatch::IntegrationTest
  test "should get events" do
    get todo_events_url
    assert_response :success
  end
end
