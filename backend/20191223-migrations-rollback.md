# Rolling back a migration in Knex
## Dropping and recreating a table in Knex.js

tagged_headline: How to drop and recreate a table in a Knex.js migration #knex #database #api #webdev #backend

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191223-migrations-rollback.jpeg



In the previous article, we saw how to set up a migration file. We saw how to create a table, named `fruits`, with an `id`, `name`, `weight`, and `delicious` columns.

We set the `name` column to be required, by calling the `.notNullable()` method of Knex. `notNullable()` makes sure that an error is raised if we try to create a record without a name.

This is how the code for creating the table and columns looks like at this point:

```js
exports.up = function(knex) {
  return knex.schema.createTable('fruits', tbl => {
    tbl.increments('id');
    tbl.text('name', 128).unique().notNullable();
    tbl.decimal('weight');
    tbl.boolean('delicius');
  })
};
```

After we set up the migration, we run it with this command:

```
knex migrate:latest
```

Since we didn't have a database already, this command created one for us with a `fruits` table and the specified columns.

### So far so good, right?

Oh, no! We just remembered that the `weight` column has another requirement. It cannot have `NULL` values. In other words, it’s a required field.

This means that we should have added the `notNullable()` method call to the call to `tbl.decimal('weight')`
The problem is that we have already run the migration. How can we fix this situation?

### Rollback to the rescue.

At this point we have a couple of options to fix our little mistake.

We could just create a second migration, that will run after the first one, and inside the up method we could modify the column to make the weight required.
This is certainly a valid option, especially if we already had some data in the database.

The second option would be to simply roll back the migration and try again. Rolling back the migration means running the code in the `down` method in the migration file, which destroys the whole `fruits` table and all the data in it.

We could then adjust the line where the weight column is created by adding the call to `notNullable()`. We could finally run the migration again. This would fix our little mistake and have us up and running in no time.

### Migration rollback

Since we haven't added any data to our database yet, probably the best option in this case is the second one, just roll back the migration and start over. We have nothing to lose.
To run a migration rollback we simply issue this command at the console:

```
knex migrate:rollback
```

Knex will run the code in the `down` method, in the last migration file, and respond with a message telling us the migration has been rolled back and the database has been brought to its previous state.

```
Using environment: development
Batch 1 rolled back: 1 migrations
```

Notice that we only want to roll back a migration if we are working on the latest migration file and if we don't have any data that we may need in the database.
In our case, rolling back will destroy the `fruits` table, so it's not a viable option if we need the data in it.
Once the migration has been rolled back, we can chain on the `.notNullable()` method to that column:

```
tbl.decimal('weight').notNullable();
```

We then save the migration file, and run the migration again with:

```
knex migrate:latest
```

This will recreate the table with the correct setting for the weight column.