# How to add the session object to the request in an Express application
## Using middleware to restrict access to an endpoint


In this series of articles, our ultimate goal is to authenticate users with sessions in our Express application.

What we have done so far is import the `express-session` Node library in order to initialize a `session` object that can be used for authentication.

We used a `sessionOptions` object to configure various aspects of the cookies that keep track of the session.

Finally, we registered the session object with the middleware chain by using the server.use(session(sessionOptions)) method, so session is available to all endpoints.

At this point, every time a request comes in, a session object is created and added to it, ready to be used by the rest of our code.

### Updating the login route handler

The next thing we want to do is update the existing login method so we can take advantage of the session.

The login method is defined in a file called authRouter.js where we keep all route helpers that have to do with authentication.

We have seen the login route helper before, and what it does is:

- extract username and password from the request body
- look up the username in the database
- if found, check that the password matches
- send back a welcome message to the user

Now we need to add some extra functionality to this sequence in order to include the session.

After we have confirmed the user login credentials match the user saved in the database, we add to the session object in the request a new property called user that matches the user pulled out of the database.

```
req.session.user = user;
```

We can now test the login endpoint with Postman and see what happens.
We send a POST request to localhost:5000/api/auth/login, passing a username and password in the request body.

[image]

When we log in with the correct credentials, and look at the Cookies tab in Postman, we can verify that a cookie was sent back from the server. The cookie has the name that we have previously defined in the sessionOptions configuration object.

In the cookie, the session id value is encrypted using the secret that we have also specified in sessionOptions. We also see other values like path, domain, the httpOnly setting, and expiration date, all values that we defined in our session configuration object.

Now that we have verified that our session and cookie mechanism is working, let's see how we can take advantage of it to authenticate a user in our application.

In a previous article we have shown how to create a middleware method that verifies that the user credentials passed into our application match those we have in the database.

We can call this method restricted. This is what it looks like:

```
// auth/restricted-middleware.js

module.exports = (req, res, next) => {
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Ran into an unexpected error' });
      });
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
```

The restricted method is added to endpoints that we want to restrict to only logged in users, like /api/users

```
// GET /api/users/ endpoint

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});
```

If we try to access the /api/users/ endpoint now, we won't be able to, even if we use the correct credentials.

The reason is that the restricted middleware is looking for username and password in the request headers. But if you remember, we don't have that data in the headers now, but in the session.

So, the question is: how do we extract user information from the session so the restricted middleware can use it to authenticate the user and give access to its endpoint?

We'll see how to achieve this in the next article. 
