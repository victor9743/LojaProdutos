class CreateOferta < ActiveRecord::Migration[7.1]
  def change
    create_table :oferta do |t|
      t.string :nome
      t.string :descricao
      t.float :preco
      t.integer :produto_id
      t.integer :pedido_id
      t.timestamps
    end
  end
end
