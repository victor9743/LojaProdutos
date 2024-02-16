class AddQuantidadeToProduto < ActiveRecord::Migration[7.1]
  def change
    add_column :produtos, :quantidade, :integer, :default => 1
  end
end
