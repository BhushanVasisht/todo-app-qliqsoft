json.extract! todo, :id, :title, :event, :date, :status, :created_at, :updated_at
json.url todo_url(todo, format: :json)
