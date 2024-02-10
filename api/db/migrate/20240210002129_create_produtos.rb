class CreateProdutos < ActiveRecord::Migration[7.1]
  def change
    create_table :produtos do |t|
      t.string :nome
      t.string :descricao
      t.float  :preco
      t.float  :desconto

      t.timestamps
    end
  end
end
