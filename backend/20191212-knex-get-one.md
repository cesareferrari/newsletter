# Knex query builder in a REST API
## Using Knex to retrieve one record by id

tagged_headline: Using Knex to retrieve one record by id in a REST API #knex #database #api #webdev #backend

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191212-knex-get-one.jpeg



We now know how to retrieve, or *get*, all the posts in a database table named posts with Knex (see previous article for details).
The syntax is very simple:

```js
db('posts') // gets all the records in table 'posts'
```

We now want to retrieve *one single post*. We will retrieve the post through a `GET` request to our `API`.
The request `URL` will look like this:

```
localhost:4000/api/posts/1
```

where `1` is the `id` of the record we want.

### `GET` request

We first need to set up a `GET` route handler to handle that route in our `API`. We use an Express router bound to the '`/api/posts`' endpoint:

```js
// server.js

const PostRouter = require('./posts/post-router.js');
server.use('/api/posts', PostRouter);
```

Inside this route handler we use knex to make the database query. Remember, knex uses an object called db to make queries.

### Knex query

If we had to find a record in a database table by a certain `id` using plain `SQL`, the query would look something like this:

```
SELECT * FROM posts WHERE id = 1;
```

We use the same concept with knex. Knex has a `where()` method, that takes a Javascript object as an argument, which specifies the conditions of the `WHERE` clause.
In our case, we only have one condition, the `id` field must match, so our `WHERE` clause could look like this:

```js
where({id: id})
```

In cases like this, when an object property name matches the variable name, Javascript will let us write a shorter syntax:

```js
where({id})
```

So, this is our `WHERE` clause. But where does the `id` come from? Right, it comes from the *request parameters*. We can extract the `id` in this way:

```js
const { id } = req.params;
```

### Putting it all together

Now that we have extracted the `id` from the request parameter and defined the `WHERE` clause, we can finish our route handler:

```js
router.get('/:id', async (req, res) => {

  const { id } = req.params;

  try {
    const [post] = await db('posts').where({id});

    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({message: "Post not found"})
    }
  } catch (err) {
    res.status(500).json({message: "Error getting posts", error: err})
  }
});
```

Note that the database query inside the `try` block returns a collection with one element. We extract this element from the array by assigning it to a constant with this syntax:

```js
const [post] = await db('posts').where({id});
```

Also note that we use an `if` statement to make sure the `post` is found. If the `post` is not found, perhaps because there is no record in the database with a matching `id`, we send back a status of `404` and an error message.
In the `catch` block we handle all other types of errors, like problems with the database, with the connection, etc.

If we send a request now, with a correct item id, it will return the item in a `JSON` object:

![Return item in a JSON object](https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191212-knex-get-one2.jpeg)

If we request a non-existing `id`, we will get a “*not found*” message, like we wanted:

![Item not found](https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191212-knex-get-one3.jpeg)

As you can see, finding one single record is a little more involved than getting all the records but not by much.