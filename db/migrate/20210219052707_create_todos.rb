class CreateTodos < ActiveRecord::Migration[6.1]
  def change
    create_table :todos do |t|
      t.string :title
      t.text :event
      t.date :date
      t.boolean :status

      t.timestamps
    end
  end
end
