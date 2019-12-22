class CreateTaskTagJoinTable < ActiveRecord::Migration[6.0]
  def change
    create_join_table :tasks, :tags
  end
end
