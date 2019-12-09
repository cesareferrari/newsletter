# Query builders

Query builders allow us to create database queries that work on every database
without us worrying about differences between SQL implementation in different
database systems.

The query builder we are going to use when building our API is a very popular
Node module called Knex.

Knex allows us to create the same queries we would build with SQL, but using
Javascript 

Knex is a query builder that's compatible with many relational database systems
The documentation for Knex can be found at knexjs.org

Knex supports several databases, like Postgresql, MySQL, SQLite, and others. When we
build queries with Knex we don't have to worry about different database
implementations, but can write queries that will work with all the supported
databases.

The part where we need to worry about the specific database is in the
connection, that is different for each database. But as far as queries, the knex
syntax works with all supported databases.

### Installing Knex

Knex is a Node module, so it can be installed in the usual way:

```
yarn add knex
```
