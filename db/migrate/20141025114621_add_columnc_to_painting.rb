class AddColumncToPainting < ActiveRecord::Migration
  def change
    add_column :paintings, :user_id, :string
  end
end
