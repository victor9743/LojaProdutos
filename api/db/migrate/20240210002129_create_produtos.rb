class CreateProdutos < ActiveRecord::Migration[7.1]
  def change
    create_table :produtos do |t|
      t.string :nome
      t.string :descricao
      t.float  :preco
      t.float  :desconto, :default => 0.0

      t.timestamps
    end
  end
end
