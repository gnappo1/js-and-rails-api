# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
clothing = Category.create(name: 'Clothing')
accessories = Category.create(name: 'Accessories')
electronics = Category.create(name: 'Electronics')
home_and_kitchen = Category.create(name: 'Home&Kitchen')
pet_supplies = Category.create(name: 'Pet Supplies')



Product.create(name: "Sweater", price: 50.99, category: clothing)
Product.create(name: "Nike Shoes", price: 130.99, category: clothing)
Product.create(name: "Loops Earrings", price: 5.99, category: accessories)
Product.create(name: "Fancy Necklace", price: 99.99, category: accessories)
Product.create(name: "Nutra Bullet", price: 40.50, category: home_and_kitchen)
Product.create(name: "Microwave", price: 150.99, category: home_and_kitchen)
Product.create(name: "Phone Charger", price: 4.50, category: electronics)
Product.create(name: "New Android", price: 800.99, category: electronics)
Product.create(name: "Kibble", price: 49.99, category: pet_supplies)
Product.create(name: "Bacon Treats", price: 29.99, category: pet_supplies)

