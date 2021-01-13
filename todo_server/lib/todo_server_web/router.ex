defmodule TodoServerWeb.Router do
  use TodoServerWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api/v1", TodoServerWeb do
    pipe_through :api

    get "/todo_events", TodoController, :show_all
    get "/todo_events/:id", TodoController, :show_one
    post "/todo_events", TodoController, :create_one
    post "/todo_events/delete", TodoController, :delete_one
    post "/todo_events/update", TodoController, :update
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: TodoServerWeb.Telemetry
    end
  end
end
