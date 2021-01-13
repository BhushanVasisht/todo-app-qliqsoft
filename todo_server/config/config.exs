# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :todo_server,
  ecto_repos: [TodoServer.Repo]

# Configures the endpoint
config :todo_server, TodoServerWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "utv4Hl+hO6fg2zkoEXifYSXl3BnievlXf/LLND66/cop0c8hlFJEeOn9raZXwfPN",
  render_errors: [view: TodoServerWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: TodoServer.PubSub,
  live_view: [signing_salt: "3q6C+Wgt"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
