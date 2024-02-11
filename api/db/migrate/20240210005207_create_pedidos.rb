class CreatePedidos < ActiveRecord::Migration[7.1]
  def change
    create_table :pedidos do |t|
      t.string :numero_pedido
      t.timestamps
    end
  end
end
