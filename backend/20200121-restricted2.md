# How to restrict access to an API endpoints with an Express middleware function
## Using sessions to authenticate users in an Express application

tagged_headline: How to restrict access to an API endpoints with an Express middleware function #bcrypt #express #api #authentication #sessions #webdev #backend


Previously we have seen how to save the user, on successful login, into the session object.

The session object is added by express-session to the request, which is in turn passed to all route handlers in the middleware chain.

If a user property is found on the request, it then means that particular user is authenticated, because it wouldn't be in the session in the first place if the authentication failed.

In our application we also have a middleware function called restricted.
The purpose of the restricted function is to prevent access to an endpoint for unauthenticated users.

This function was originally written to look for a username and password in the request headers and find the corresponding user in the database, authenticate it based on those credentials, and give access to further endpoints.

Here's the original code for reference:

```
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

But now that we have taken advantage of sessions, and modified our application to save authenticated users into the session at login, we can greatly simplify the restricted function.

Since the restricted function has access to the session, and therefore to the authenticated user, it's not necessary for it to check credentials in the request header.

The restricted function can just make sure a user exists on the session property instead. It's also no more necessary for the function to find the user, since the user has already been found by the login function.

So, the way we modify the restricted function is to just have it look at the session. If there's a user, then let the user in. If not, there's something wrong with the credentials, so either issue an error or redirect to a login page.

Here's the simplified version of the restricted function:

```
module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
```

As we have already seen, we use the middleware restricted function in any route handler that we want to restrict, like below: 

```
// GET localhost:5000/api/users/

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});
```

If we test it out with Postman, we are able to confirm that if we log in successfully, we can access this endpoint and list all the users:

[image]


