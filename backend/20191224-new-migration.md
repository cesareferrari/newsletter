# Knex Migrations
## How to add a column to a database through migrations

tagged_headline: How to create a new database column through a Knex.js migration #knex #database #api #webdev #backend


Now that we have a database with a table and some columns, we decide to add an additional column to our fruits table. The column name will be "color", and it will contain a string of characters.

In order to add the column, we need to create a new migration file.

The command to add a new migration file with Knex is knex migrate:add passing a name for the migration as the last parameter.

I like to name my migrations in a descriptive way, so I know what they are going to do just by looking at the file name. In this case we are adding a color attribute to the fruits table, so the name will be add_color_to_fruits.

```
knex migrate:make add_color_to_fruits

Using environment: development
Created Migration:
/data/migrations/20191222090615_add_color_to_fruits.js
```

When creating the migration file, Knex will handle prefixing the migration name with a timestamp, so to keep the chronological order among all migration files.

The new migration file already has some boilerplate code in it, setting up the up and down methods for us.

```
exports.up = function(knex) {

};

exports.down = function(knex) {
  
};
```

In this migration we don't want to create any table, but just want to make a change to an existing one. In order to do this we call the table() method of knex, passing in the table name and a callback that will receive the table object.

Using this table object, we create a new column on it, by calling the string() method, since we are creating a column of type string, and passing a character limit of 128 characters.

```
exports.up = function(knex) {
  return knex.schema.table('fruits', table => {
    table.string('color', 128);
  })
};
```

Of course, we also need to take care of the down method in the migration file.
In it, we add code that reverses our migration by removing the "color" column.  Knex has a method for that: dropColumn()

```
exports.down = function(knex) {
  return knex.schema.table('fruits', table => {
    table.dropColumn('color');
  })
};
```

The command for running the migration is the usual:

```
knex migrate:latest
```

This will apply the migration and create the "color" column.

Now that we have our table created, we can add some initial data to it for development purposes.

We could fire up a REST client, like Insomnia, or Postman, and create data manually.
But it would be nice if this operation could be somewhat automated, so it could be done more easily and be repeatable if necessary.

It turns out that Knex has a way to add data automatically through an operation called seeding.  

We will look at seeding in the next article.
