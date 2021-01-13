defmodule TodoServer.Repo.Migrations.CreateTodoEvents do
  use Ecto.Migration

  def change do
    create table(:todo_events) do
      add :title, :string
      add :event_data, :string
      add :event_date, :date
      add :event_status, :boolean, default: false, null: false

      timestamps()
    end

    create unique_index(:todo_events, [:title])
  end
end
