class CreatePedidos < ActiveRecord::Migration[7.1]
  def change
    create_table :pedidos do |t|
      t.integer :produto_id
      t.integer :qtd_produto
      t.float :preco_final
      t.float :desconto, :default => 0.0
      t.integer :user_id

      t.timestamps
    end
  end
end
