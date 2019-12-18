# How to use Knex migrations to change database schema
## A look at how to create migration files with Knex

tagged_headline: How to create migration files with Knex #knex #database #api #webdev #backend



When we start developing an application, we have some initial ideas on how the underlying database needs to be structured. We design the database schema to fit the data we need to work with.

For example, we may initially think that a users table needs a username and password fields, but after a certain time we decide to add an email field to the users as well.

This means that we need to update the database to reflect this change.

Migrations are a way to apply and keep track of changes to a database as the application codebase evolves over time.

### The role of migrations

Over time, as we make changes to our application business logic, we will notice that the initial schema, that we thought was appropriate for our needs, becomes out of sync with new features introduced in the application.

These new features may be incompatible with the existing data structure, so we need an easy way to update the database schema.

Migrations help this workflow in four ways:

- they let us make incremental, sequential changes
- they let us reverse changes made previously, in case we change our mind
- they let us recreate the exact data structure in case we decide to use a new database or a new environment.
- they keep a history of the changes made by the team over time

Knex migrations help us in the process of creating the database and keeping it updated over time. 
Knex also provides the possibility to populate the database with seed data, for use in development.

### Knex migrations

We write migration files in a particular folder and Knex needs to know where this folder lives, in order to be able to run the migrations.

The way Knex knows where migration files are located is by looking at its configuration file, knexfile.js. For this purpose, we add a migrations configuration section in the knexfile.

In our configuration object, under development, we add a section called migrations specifying which directory contains the migrations files:

```
// knexfile.js

  migrations: {
    directory: './data/migrations'
  }
```

In the example above, migrations live in data/migrations, at the root of our application.

Now that we have a directory, we can create our first migration file in it.
Knex has a command for this purpose, with this syntax: migrate:make followed by the file name we want to give to the migration.

At the command line we type:

```
knex migrate:make produce-schema

Created Migration: migrations/20191218081503_produce-schema.js
```

If you look at the project directory after running this command you will see that a new migrations directory has been added and a new migration file has been created in it. The migration file has the file name we entered, prefixed by a timestamp.

The timestamp gets added automatically by Knex based on the time the creation command is run.

When we create the next migration file, the timestamp will be higher, so migration files in the directory will keep a chronological order. 

This sequence tells Knex the order in which those files need to be executed if we want to run the migrations again in the future.
It will also tell Knex the order in which to reverse the migrations when we roll back the changes.

Since migrations make assumptions on the state of our schema based on previous migrations, if we don't run (or revert) migrations in the same exact order every time, we end up with a corrupt database schema.

# Migration file

If we look at the migration file we created, we notice that it already has some code in it. In particular, it exports two functions, up and down

```
exports.up = function(knex) {
  
};

exports.down = function(knex) {
  
};
```

The up function is used to move the database schema up to the newest version.
Inside the up function we create tables, add columns, and so on.

The down function is used to do the inverse of what we did in the up function, so we can bring the database to the previous state if we roll back the migration.

If we created a table in the up function, we will make sure to remove this same table in the down function.  If we added a column in the up function, we will remove that column in the down function, and so on.

For now we stop here. We'll see how to add code to migration files in the next article.
