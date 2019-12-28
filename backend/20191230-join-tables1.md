# Query a database with Knex
# How to retrieve data from two database tables with Knex

tagged_headline: How to retrieve data from two database tables with Knex #database #knex #api #webdev #backend


In a previous article we have seen how to write SQL statements that can retrieve data from different database tables, provided related records in these tables are connected by what is called a foreign key.

Let's see how we can use this concept to retrieve data from two tables with Knex.

Imagine our application has a database with two tables: users and posts. In our application, users create posts, and when a post is created it's saved in the posts table. One attribute of the posts table is user_id, which is set to the id of the user that created the post.

Here's how those related tables are structured:

```
Table users:

id          username
----------  ----------
1           lao_tzu
2           socrates
3           seneca
---
```

```
Table posts:

id      contents              user_id
------  --------------------  -------
1       Let your workings re  1
6       Things arise and she  1
7       Beware of the barren  2
10      Trusting everyone is  3
---
```

As you can see, each post has a user_id column which is the foreign key for the user that created that post.

In our Express application, we provide an API that consumes this data.

Our goal for now is to retrieve all posts by a particular user, using this endpoint:

```
GET /api/users/:id/posts
```

where :id is the user id we are interested in.


### User router

In our application, we have already defined a UserRouter bound to /api/users, in the server.js file:

```
// server.js

const UserRouter = require('./users/user-router.js');
server.use('/api/users', UserRouter);
```

so, what we need to do in the user router is create an endpoint to handle /:id/posts with a GET method:

Let's start writing the route handler method:

```
router.get('/:id/posts', async (req, res) => {
})
```

Inside the route handler, the first thing to do is to extract the id from the parameters (we have already seen similar code before, refer to previous articles for more details):

```
const { id } = req.params;
```

We then call the database object, defined in our router as db, passing the table 'posts' to it. This will generate a SQL statement similar to SELECT * FROM posts. We assign the posts to a variable posts:

```
const posts = await db('posts')
```

The above code returns all the posts, but we only want posts from a particular user, so we need to limit the posts returned.

We do that by using a where clause. We pass an object to where that looks like this:

```
{user_id: id}
```

The object specifies the column we are interested in (user_id) and the value we want for that column, contained in the id variable set previously.

Finally, in our response, we send the found posts back to the caller, along with a 200 OK status.

This is our code so far:

```
const posts = await db('posts').where({user_id: id})
res.status(200).json(posts)
```

### Handling errors

Of course, we need to handle the case where an error occurs, so in the catch block we send back an error message if the posts cannot be found:

```
res.status(500).json({message: "can't get posts"})
```

This is the full code for the route handler:

```
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

If we now make a request to the API with Insomnia, or some other REST client, we get back all the posts for a particular user:

[users-posts.png]

This works well, and the response includes the user id. 
But we would like to include the actual user name in the response instead of the id.
How do we achieve that?

If we want the user name, we need to learn how to join both posts and users table together. We'll see how to do that in the next article.

