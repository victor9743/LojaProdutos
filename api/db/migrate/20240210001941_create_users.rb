class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :usuarios
      t.string :password
      t.boolean :isAdmin

      t.timestamps
    end
  end
end
