# Creating a User model file in a REST API
## Handle database logic in a model file with Knex

tagged_headline: How to keep database logic separate in a model file in a REST API #database #knex #api #webdev #backend

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20200101-user-model.jpeg


In previous articles we've seen how to query a database by joining two tables in order to pull out data about posts and users that could be returned in the same `API` call.

We generated the database query with *Knex* inside the router. Here's the code we used:

```js
// user-router.js

router.get('/:id/posts', async (req, res) => {
  const { id } = req.params;

  try {

    const posts = await db('posts as p')
      .join('users as u', 'u.id', 'p.user_id')
      .select('p.id', 'u.username', 'p.contents')
      .where({user_id: id})

    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({message: "can't get posts"})
  }
})
```

Although this code works for our purposes, it's not a best practice to stick all the database query code inside a router file.

To better organize our application, routers should only have code related to routes. We should move the actual database handling logic inside its own separate file.

Having separate files for different chunks of code makes the code more readable, more easy to debug, and allows adding functionality later in a more simple and straightforward way.

We can put all code related to the database into what is called a model file. In our case, since we are dealing with the user, we will create a `user-model.js` file where we define all the methods that deal with the `users` table.

### Users model

In our application we already have a `users` folder, where we keep the `user-router.js` file. We can simply add a `user-model.js` file to this folder.

The first thing we need to do is create a `db` object with which we will interact with the database. We do it the same way we did it in the router, by requiring the `db-config.js` file which pulls in `knex` and all the database configuration details from the `knexfile`:

```js
// users/user-model.js

const db = require("../data/db-config.js");
```

In this file we need to define and export methods that we'll use in the router when we operate with the database.
In the router, we have a `GET` endpoint that returns all the users defined with this code:

```js
router.get('/', (req, res) => {
  db('users')
  .then(users => {
    res.json(users);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
});
```

We can create an `all` method in our `user` model that achieves the same result, finding all the users:

```js
// user-model.js

const all = () => {
  return db('users');
}
```

We then export the method, so we can use it elsewhere:

```js
module.exports = {
  all
}
```

We now need to call this functionality from our router, so we first need to import the user model into the router file:

```js
// user-router.js

const User = require('./user-model.js');
```

We then use the `all()` method defined earlier inside the route. Note that we modified the route helper syntax to use `async/await` syntax:

```js
router.get('/', async (req, res) => {
  try {
    const users = await User.all();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get users' });
  }
})
```

If we access this endpoint now, we should get all the users back.

This is a very small change in our router file, but it's the beginning of removing all database related logic from the router and putting it into its own model file.

We can stop here for now. We will refactor other route helpers in following articles.