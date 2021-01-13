defmodule TodoServer.Store.Todo do
  use Ecto.Schema
  import Ecto.Changeset

  schema "todo_events" do
    field :event_data, :string
    field :event_date, :date
    field :event_status, :boolean, default: false
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(todo, attrs) do
    todo
    |> cast(attrs, [:title, :event_data, :event_date, :event_status])
    |> validate_required([:title, :event_data, :event_date, :event_status])
    |> unique_constraint(:title)
  end
end
