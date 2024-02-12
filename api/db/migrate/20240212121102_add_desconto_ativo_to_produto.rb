class AddDescontoAtivoToProduto < ActiveRecord::Migration[7.1]
  def change
    add_column :produtos, :desconto_ativo, :boolean, :default => false
  end
end
