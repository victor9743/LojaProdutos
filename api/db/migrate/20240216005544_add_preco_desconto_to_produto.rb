class AddPrecoDescontoToProduto < ActiveRecord::Migration[7.1]
  def change
    add_column :produtos, :preco_desconto, :float, :default =>  0
  end
end
