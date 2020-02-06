# Creating database queries with Knex
## Using Knex to retrieve records in a REST API

tagged_headline: Using Knex to retrieve records in a REST API #knex #database #api #webdev #backend

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191211-knex-db-call.jpeg



We have learned before about *Knex*, a Node module that is used to make database queries in the `SQL` language using Javascript syntax.
Knex has a promise based `API`, so the methods we use to create queries and interact with the database return promises.

As you know, promises either resolve successfully with a payload, or resolve unsuccessfully returning an error. We can handle promises either by attaching the `.then()` and `.catch()` methods at the end of the function, or by using the `async/await` syntax.

### Retrieve posts

Let's make a simple database query to retrieve a collection of *Post* records.

Imagine we have a database with a `posts` table that keeps many post records. If we want to retrieve all the records in a `REST API`, we may make a `GET` request for the root URL '/'.

This should return all the records found in the database table (unless there is some error).

As we have seen in the previous article, Knex uses an object, that we called `db`, to interact with the database. All our database requests will be done through this object.

Knex configurations are kept in two files: `knexfile.js` and `db-config.js` ([see previous](https://cesare.substack.com/p/the-advantages-of-using-query-builders) article for details).

We set up the db object in our Express router, and then we use it in the `API` to make queries.
So, let's see how we can use knex to retrieve all the records in the posts table.

### SQL syntax

If we had to do this operation using plain `SQL` we would write something like this:

```
SELECT * FROM posts;
```

To write the same query using knex we call the `db` object and pass the table name to it. If we just pass the table name, knex will assume we want all the records from that table. The knex syntax for retrieving all posts will be this:

```js
db('posts')
```

Once our posts are returned, we need a place to store them, so we assign the post collection returned by the database call to a constant that we can use later:

```js
const posts = db('posts')
```

Obviously, since we are building an `API`, this whole database call needs to be inside a `GET` route handler. The route handler returns the posts:

```js
router.get('/', (req, res) => {
  const posts = db('posts');
  res.status(200).json(posts)
});
```

### `async/await` syntax

We have said before that knex methods return promises, so we can use the `async/await` syntax to make the call.
By adding the `async` keyword before the callback function we make it asynchronous and inside the function we use `try/catch` blocks to handle either a successful response or a possible error.

This is the whole route handler code:

```js
router.get('/', async (req, res) => {
  try {
    const posts = await db('posts');
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({message: "Error getting posts"})
  }
});
```

If we now make a `GET` request to the `'/'` URL we get back all the records saved in the database.
In the next article we will see how to retrieve one particular record, identified by its `id`.