class CreateOferta < ActiveRecord::Migration[7.1]
  def change
    create_table :ofertas do |t|
      t.string :nome
      t.string :descricao
      t.float :preco
      t.integer :produto_id, :default => 0
      t.integer :pedido_id, :default => 0

      t.timestamps
    end
  end
end
