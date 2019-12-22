# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

tasks = Task.create([{ title: 'Title 1', description: 'Description 1', is_deleted: false }, { title: 'Title 2', description: 'Description 2', is_deleted: false }])

tags = Tag.create([{title: 'None', is_deleted: false}, {title: 'Home', is_deleted: false}, {title: 'School', is_deleted: false}, {title: 'Work', is_deleted: false}])