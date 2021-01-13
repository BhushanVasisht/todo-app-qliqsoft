defmodule TodoServerWeb.TodoView do
  use TodoServerWeb, :view
  alias TodoServerWeb.TodoView

  def render("index.json", %{todo_events: todo_events}) do
    %{data: render_many(todo_events, TodoView, "todo.json")}
  end

  def render("show.json", %{todo: todo}) do
    %{data: render_one(todo, TodoView, "todo.json")}
  end

  def render("todo.json", %{todo: todo}) do
    %{id: todo.id,
      title: todo.title,
      event_data: todo.event_data,
      event_date: todo.event_date,
      event_status: todo.event_status}
  end
end
