class CreatePedidoProdutos < ActiveRecord::Migration[7.1]
  def change
    create_table :pedido_produtos do |t|
      t.integer :pedido_id
      t.integer :produto_id
      t.integer :qtd_produto
      t.float :preco_final
      t.float :desconto, :default => 0.0
      t.timestamps
    end
  end
end
