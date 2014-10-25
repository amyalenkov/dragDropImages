class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.binary :token
      t.string :email
      t.string :lastName

      t.timestamps
    end
  end
end
