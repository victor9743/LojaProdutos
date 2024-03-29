# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_02_16_005544) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "oferta", force: :cascade do |t|
    t.string "nome"
    t.string "descricao"
    t.float "preco"
    t.integer "produto_id"
    t.integer "pedido_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pedido_produtos", force: :cascade do |t|
    t.integer "pedido_id"
    t.integer "produto_id"
    t.integer "qtd_produto"
    t.float "preco_final"
    t.float "desconto", default: 0.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pedidos", force: :cascade do |t|
    t.string "numero_pedido"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "valor_final"
  end

  create_table "produtos", force: :cascade do |t|
    t.string "nome"
    t.string "descricao"
    t.float "preco"
    t.float "desconto", default: 0.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "desconto_ativo", default: false
    t.boolean "is_bag", default: false
    t.integer "quantidade", default: 1
    t.float "preco_desconto", default: 0.0
  end

end
