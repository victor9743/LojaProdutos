class AddValorFinalToPedido < ActiveRecord::Migration[7.1]
  def change
    add_column :pedidos, :valor_final, :float
  end
end
