defmodule TodoServer.StoreTest do
  use TodoServer.DataCase

  alias TodoServer.Store

  describe "todo_events" do
    alias TodoServer.Store.Todo

    @valid_attrs %{event_data: "some event_data", event_date: ~D[2010-04-17], event_status: true, title: "some title"}
    @update_attrs %{event_data: "some updated event_data", event_date: ~D[2011-05-18], event_status: false, title: "some updated title"}
    @invalid_attrs %{event_data: nil, event_date: nil, event_status: nil, title: nil}

    def todo_fixture(attrs \\ %{}) do
      {:ok, todo} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Store.create_todo()

      todo
    end

    test "list_todo_events/0 returns all todo_events" do
      todo = todo_fixture()
      assert Store.list_todo_events() == [todo]
    end

    test "get_todo!/1 returns the todo with given id" do
      todo = todo_fixture()
      assert Store.get_todo!(todo.id) == todo
    end

    test "create_todo/1 with valid data creates a todo" do
      assert {:ok, %Todo{} = todo} = Store.create_todo(@valid_attrs)
      assert todo.event_data == "some event_data"
      assert todo.event_date == ~D[2010-04-17]
      assert todo.event_status == true
      assert todo.title == "some title"
    end

    test "create_todo/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Store.create_todo(@invalid_attrs)
    end

    test "update_todo/2 with valid data updates the todo" do
      todo = todo_fixture()
      assert {:ok, %Todo{} = todo} = Store.update_todo(todo, @update_attrs)
      assert todo.event_data == "some updated event_data"
      assert todo.event_date == ~D[2011-05-18]
      assert todo.event_status == false
      assert todo.title == "some updated title"
    end

    test "update_todo/2 with invalid data returns error changeset" do
      todo = todo_fixture()
      assert {:error, %Ecto.Changeset{}} = Store.update_todo(todo, @invalid_attrs)
      assert todo == Store.get_todo!(todo.id)
    end

    test "delete_todo/1 deletes the todo" do
      todo = todo_fixture()
      assert {:ok, %Todo{}} = Store.delete_todo(todo)
      assert_raise Ecto.NoResultsError, fn -> Store.get_todo!(todo.id) end
    end

    test "change_todo/1 returns a todo changeset" do
      todo = todo_fixture()
      assert %Ecto.Changeset{} = Store.change_todo(todo)
    end
  end
end
