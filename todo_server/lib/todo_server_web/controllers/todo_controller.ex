defmodule TodoServerWeb.TodoController do
  require Logger
  use TodoServerWeb, :controller

  alias TodoServer.Store
  alias TodoServer.Store.Todo

  action_fallback TodoServerWeb.FallbackController

  def show_all(conn, _params) do
    todo_events = Store.list_todo_events()
    render(conn, "index.json", todo_events: todo_events)
  end

  def show_one(conn, %{"id" => id}) do
    todo = Store.get_todo!(id)
    render(conn, "show.json", todo: todo)
  end

  def create_one(conn, %{"todo" => todo_params}) do
    with {:ok, %Todo{} = todo} <- Store.create_todo(todo_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.todo_path(conn, :show_one, todo))
      |> render("show.json", todo: todo)
    end
  end

  def update(conn, %{"todo" => todo_params}) do
    todo = Store.get_todo!(todo_params.id)

    with {:ok, %Todo{} = todo} <- Store.update_todo(todo, todo_params) do
      render(conn, "show.json", todo: todo)
    end
  end

  def delete_one(conn, %{"id" => id}) do
    Logger.debug "#{id}"

    todo = Store.get_todo!(id)

    with {:ok, %Todo{}} <- Store.delete_todo(todo) do
      send_resp(conn, :no_content, "")
    end
  end
end
