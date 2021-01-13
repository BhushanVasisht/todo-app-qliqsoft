defmodule TodoServer.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      TodoServer.Repo,
      # Start the Telemetry supervisor
      TodoServerWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: TodoServer.PubSub},
      # Start the Endpoint (http/https)
      TodoServerWeb.Endpoint
      # Start a worker by calling: TodoServer.Worker.start_link(arg)
      # {TodoServer.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: TodoServer.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    TodoServerWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
