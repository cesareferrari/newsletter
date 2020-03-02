# How to create a join query with Knex
## Retrieving data from two join tables in a REST API 

tagged_headline: How to retrieve data from two join tables with Knex #database #knex #api #webdev #backend

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191231-join-tables2.jpeg

In the previous article we have seen how to set up an `API` endpoint that retrieves posts associated with an user `id`.
What we got back from the database, apart from the post content, was an integer that represented the user id.

We know that each user also has a *name* saved in the `users` table. What if we want to display the user name in addition to the post?
To achieve this outcome, we need to *join two tables* (`users`, and `posts`) and create a query in Knex that pulls data from both tables.
This is the code we currently have in the User router:

```js
router.get('/:id/posts', async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await db('posts').where({user_id: id})
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({message: "can't get posts"})
  }
})
```

This code creates a route that retrieves the posts with a specific user id.
If we want to grab data from the `users` table, though, we need a join statement in our query.

We have seen in an earlier article how to retrieve data from two joined tables with plain `SQL`.
The syntax would look something like this:

```
SELECT posts.id, users.username, posts.content 
FROM posts 
JOIN users
ON users.id = posts.user_id;
```

When using Knex we write a similar syntax. We can refactor our query to use a join statement like this:

```js
const posts = await db('posts')
  .join('users', 'users.id', 'posts.user_id')
  .select('posts.id', 'users.username', 'posts.contents')
  .where({user_id: id})
```

The `.join()` method above takes the join table name as the first parameter. The next two parameters are the columns that contain the values on which the join is based, that is, the user `id` and the post `user_id`.

We also add a `.select()` method, that lets us pick the columns we want to display, similar to the `SELECT` statement in `SQL`.

If we now try out this endpoint with a `REST` client, we correctly get back the full username from the users table:

![Returning usernames](url)

### Using aliases

Our code works fine, but we can do better.

When we use joins, since the data is coming from two or more tables, we must specify which table we refer to in our code.
We have to write things like '`posts.id`', '`users.username`', and '`posts.contents`' because `SQL` needs to know without ambiguity which tables and columns we refer to.

That's a lot of typing. If we want to avoid some keystrokes, SQL provides us with a feature called *aliases*. An alias is an alternative name we give to an entity. For example, we could refer to the `posts` table with the alias '`p`', which is much shorter to write than '`posts`'.

And we could refer to the `users` table with the alias '`u`'.

This makes it much easier, and faster, to type table names. Here's an example, using aliases:

```js
const posts = await db('posts as p')
  .join('users as u', 'u.id', 'p.user_id')
  .select('p.id', 'u.username', 'p.contents')
  .where({user_id: id})
```

We first define aliases in our code with the keyword '`as`', like 'p`osts as p`', and '`users as u`'. After that, we can use the shortcuts any time we need to type in the full table name.