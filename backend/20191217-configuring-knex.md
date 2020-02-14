# Configuring Knex
## How to set up a knexfile to connect Knex to a SQLite3 database.

tagged_headline: Knex configuration for a SQLite3 database #knex #database #api #webdev #backend

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191217-configuring-knex.jpeg


*Knex* is a query builder that supports many types of databases including MySQL, Postgresql, SQLite, and Oracle.
In order to work with all these different databases, Knex uses different `npm` modules to connect to them.

If we work with a SQLite database in our project, for instance, we would have a dependency on the knex module and the sqlite module.
This is a sample of the `package.json` file in such an application that specifies these modules:

```js
"dependencies": {
  "knex": "^0.20.4",
  "sqlite3": "^4.1.1"
},
```

When we configure Knex, we want to give it details on the database we'll use.
In the code below I show an example of calling knex with a configuration object for SQLite3.
The object, which is passed in as an argument to the `knex()` function call, tells Knex which database to use and where to find it (SQLite, unlike other databases, saves the data in a local file).

```js
const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/produce.db3'
  },
  useNullAsDefault: true
});
```

Although this code would work, it's not ideal as a configuration setting. We will see a better way to configure Knex using a separate file called `knexfile.js`.

### Query builder

As we have seen in previous articles, when we use Knex we write our queries in Javascript instead of plain SQL.
When it's time to make the database connection, Knex uses the `sqlite3` module available in our application to translate queries from the Javascript syntax to the specific version of the SQL language implemented by SQLite3.

The reason we normally use a query builder like Knex instead of writing `SQL` commands directly is so that our queries are not bound to a specific implementation of `SQL` but are portable across different databases.
If one day we decide to use a different database, for example in a production environment, we wouldn't have to worry that our queries may generate `SQL` syntax errors.
We can be confident that our code will work seamlessly, provided we have installed the module for the new database in our project.

### Knex configuration

In the code above we have seen how to configure Knex passing a literal object as an argument to `knex()`. But the typical way to make this configuration is through a separate file called `knexfile.js`. The `knexfile` includes all the configuration necessary to run Knex in different environments.

We can create `knexfile.js` manually, but we can more easily have Knex create it for us by running `knex init` on the command line.

`knex init` will create a `knexfile.js` at the root of our application and include some default settings.
`knexfile.js` exports a configuration object with different sections for different environments such as development, production and staging. It also has a section with details about how to run migrations (we'll see what migrations are later).

The development section looks something like this:

```js
// knexfile.js

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  // other configuration here...

}
```

It defaults to `sqlite3`, which is fine for our purposes, but we need to make sure that it's pointing to the right location for the database *filename* on our system.

Another setting we should add when using SQLite3 has to do with default values entered in the database. To make sure undefined keys are entered in the database as `NULL` values, we add this configuration:

```js
useNullAsDefault: true
```

Now that we have a simple configuration file defined, we create a new empty file named `db-config.js`.

### Database configuration

The reason we create a separate file for configuration is to separate concerns in our application.
We want each file to have code that does one single thing in one well defined place, so we don't have to go through several different files if we need to make changes in the future.

In `db-config.js` we first import the `knex` module.
We then require the `knexfile` and assign it to a `config` object which we pass as an argument to `knex()` as the configuration object.
We assign the result of this call to a `db` object that we can use in our application to interact with the database.
At the end of our file, we export the `db` object so it can be used by the rest of our code.

```js
// db-config.js

const knex = require('knex');

const config = require('../knexfile.js');

const db = knex(config.development);

module.exports = db;
```

If you notice, we only pass the `development` property of the `config` object to `knex`, since we are interested only in the development environment for now.
We'll see how to use the `db` object to make database queries and additional Knex configurations in future articles.