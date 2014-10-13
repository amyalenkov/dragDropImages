namespace :painting do
  desc 'Delete all paintings'
  task delete_all: :environment do
    ::Painting.destroy_all
  end
end