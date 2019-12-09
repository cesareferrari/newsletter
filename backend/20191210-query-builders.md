# The advantages of using query builders
## Using Knex to build SQL queries for a REST API

tagged_headline: Using Knex to build SQL queries for a REST API #knex #database #api #webdev #backend



In previous articles we talked about relational database systems and SQL queries that let us implement CRUD operations in our API. CRUD stands for Create, Read, Update and Delete records.

We explored SQL syntax and different ways to create queries. We also learned that different database systems may implement the standard SQL syntax in slightly different ways.

This may lead to problems if we write SQL queries that need to be implemented by different databases. For example, it's common to use separate databases for development and production. 

It would be annoying if we had to write different query syntax just because we are using two databases.

### Query builders

One way to tackle this problem is to use a query builder.

Query builders allow us to create database queries that work with any supported database without having to worry about differences between SQL implementations in different database systems.

In this article we will focus on Knex, a very popular query builder for Node applications.

Knex allows us to create queries using Javascript syntax. It will then translate our syntax into the appropriate SQL for each supported database.

Knex supports many popular relational databases like Postgresql, MySQL, SQLite, and others. 

The documentation for Knex can be found at knexjs.org


### Installing Knex

Knex is a Node module, so it can be installed in the usual way with yarn or npm:

```
yarn add knex
```

To practice with Knex we will use a SQLite database, so we might as well install it now:

```
yarn add sqlite3
```

### Connecting to the database

In order for Knex to use a database, it needs to know how to get to it. The way Knex finds the database is through a configuration file called knexfile.js which we place at the root of our application.

knexfile.js specifies the databases we are going to use, the connection details and other information used by Knex.

knexfile.js exports a Javascript object that holds all the connection details. This object can have different sections that specify database connections for different environments, like development, production, and so on.

In the example below, we use SQLite in a development environment. SQLite saves data in a local file, so we include the file name where the database is saved on our system.  Other databases may have other ways to connect to them.

```
// knexfile.js

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/posts.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};

```

### Configuring and using Knex

To use Knex in our application, we require the Node module in a file called db-config.js.
We assign knex to a constant with the same name. We then create another constant named config, and assign the contents of knexfile to it. Finally, we invoke knex passing the development configurations, because we are using this database in a development environment.

```
// db-config.js

const knex = require('knex');

const config = require('../knexfile.js');

module.exports = knex(config.development);
```

config.development above will pass only the development section of our configuration object that we set up in knexfile.js.

Once db-config.js is created, we can use it inside our application router by requiring the db-config.js file and passing it to a constant named db that we can use to make database queries.  

```
// inside our Express Router file
// database access using knex

const db = require('../data/db-config.js');
```

Now that we have knex configured in our system, we will see how to structure those queries in the next article.



