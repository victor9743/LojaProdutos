class AddIsBagToProduto < ActiveRecord::Migration[7.1]
  def change
    add_column :produtos, :is_bag, :boolean, :default => false
  end
end
