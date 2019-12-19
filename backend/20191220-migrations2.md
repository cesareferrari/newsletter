# Migrations in Knex
## How to create and apply migrations with Knex.js

tagged_headline: How to create and apply migrations with Knex.js #knex #database #api #webdev #backend


In a previous article we discussed migrations and how they help in setting up and keeping the database schema updated.

As a brief recap of what we have seen so far:

we first define a database connection and a migrations directory in knexfile.js

we then create migration files invoking the knex migrate:make command

this command will create a file with a timestamp

the migration file contains two functions, up and down

the up function is where we write code that updates the database to the next version

the down function is where we write code that restores the previous version of the database

### Schema builder methods

Knex has methods that help build the database schema. They are called schema builder methods and you can learn more about them in the [Knex documentation](http://knexjs.org/).

These methods can create tables, delete them, create columns, add constraints, and much else.
We call these methods on knex.schema, which returns an object containing the query that will be run in the database.

Here we'll look at some of them.

### The createTable() method

Let's start with createTable(). 

Like the name says, createTable() is a function that creates a new database table. We pass the table name as the first argument and a callback function as the second argument.

The callback function takes a table object and creates columns on it using additional schema builder methods.

```
exports.up = function(knex) {
  return knex.schema.createTable('fruits', tbl => {

    // create columns here

  })
};
```

### Creating columns

To create columns we call methods on the tbl object. Depending on the column we want to create, we call different methods.

One column that most tables have is the primary key column. This columns is used to keep the record id, and it usually contains an auto incremented integer.

This column may be implemented in different ways across different databases, but we don't have to worry about it because Knex takes care of the underlying details.

Here's how we create a primary key column named 'id' that will be incremented each time a record is created:

```
tbl.increments('id')
```

Next, we'll create a text column named 'name', that will contain the name of our records. For that we use the .text() method on the tbl object. The first argument to .text() is the column name, and the second argument is the character length. We want to constrain the length to 128 characters in this case.

We can chain schema builder methods one after the other, in order to add constrains to our columns.

We also want the name to be unique for each of our records, so we chain the .unique() method as well.

And we want to set the value in it as requires, so we call .notNullable() on it, which will raise an error if we omit a value when a record is created.

```
tbl.text('name', 128).unique().notNullable();
```

Next, we create a column for the record weight. This is a number, so we use a decimal column type using the .decimal() method.

```
tbl.decimal('weight');
```

Finally, we create a boolean column called 'delicious' that can be set to true or false.

```
tbl.boolean('delicius');
```

This is the complete code in the migration file:

```
exports.up = function(knex) {
  return knex.schema.createTable('fruits', tbl => {
    tbl.increments('id');
    tbl.text('name', 128).unique().notNullable();
    tbl.decimal('weight');
    tbl.boolean('delicius');
  })
};
```

### Drop table

If you remember, we said we need to have a way to reverse our migrations, so in the down function of our migration file we add code that removes the whole table we created in the up function.

To remove a table, which will also remove all its columns, we call the dropTableIfExists() function, passing the table name as an argument.

```
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('fruits')
};
```

### Applying the migration

Now that we have set up the migration file, we might as well use it. The way we run the migration is to call the migrate:latest command of knex:

```
knex migrate:latest

Using environment: development
Batch 1 run: 1 migrations
```

This will create a new database, if it doesn't already exist, and run all the migrations that have not yet been run, in the correct order (remember, the order is set by the timestamp in the file name).

If the database doesn't exist yet, Knex will create it based on the name and location specified in knexfile.js
