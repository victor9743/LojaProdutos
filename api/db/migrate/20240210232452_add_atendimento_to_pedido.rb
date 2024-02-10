class AddAtendimentoToPedido < ActiveRecord::Migration[7.1]
  def change
    add_column :pedidos, :atendimento, :string
  end
end
