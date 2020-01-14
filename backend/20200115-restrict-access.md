# Restricting access to an endpoint in Express
## How to prevent unregistered users from accessing a resource


In the previous article we learned how to validate credentials for a registered user after log in.

If the user account already existed in the database, we used bcryptjs compareSync() method to compare the password entered on log in and the password stored in the database in a hashed format. If the two passwords matched, the user was validated and could log in.

In our previous code example, we wrote an endpoint (localhost:5000/api/login) to handle the login and validation.


### Restricting access

The use of a login system in our application comes from the need to prevent access to some parts of our API for unregistered users.

Imagine we have an /api/users endpoint, that accepts GET requests and shows all the users in the system. Our goal is to show this information to registered users only.
How do we make sure that only logged-in users can access it?

In order to be let in, registered users need to send their credentials to the API.  But our endpoint only accepts GET requests and GET requests don't have a body. Where do we put the credentials?

Since we don't have a body, we can pass the credentials in the request headers.
HTTP requests can send custom headers to the server with arbitrary information in it, so that's what we are going to use for now.

It turns out that there are better ways to perform this operation, but for the moment let's see how to handle it this way. We'll learn how to use authorization tokens in future articles.

### Route handler

Let's start out our route handler. Note that we are not validating anything at this point and the API happily returns the users to anyone who makes the request:

```
server.get('/api/users', async (req, res) => {
  try {
    const users = await User.find()

    if (users) {
      res.status(200).json(users)
    } else {
      res.status(400).json({message: "Users not found"})
    }
  } catch (err) {
    res.status(500).json({message: "Error finding users"})
  }
})
```

But we want to validate users before they can access this endpoint so we could write validation code inside the endpoint. But, to keep our application more modular, we prefer to write a separate validator function instead.
This function will be used by any endpoint that needs it as a middleware function.

### Writing the validate middleware function

We call our function validate and, since it's middleware, we set up the three parameters req, res, and next. We also make this function asynchronous by prefixing it with the async keyword:

```
async function validate(req, res, next) {

  //  ... code here ...

}
```

The first thing we do is extract credentials from the request headers:

```
const { name, password } = req.headers
```

Then we check if name and password exist and, if so, we find the user by name:

```
if (name && password) {
  const user = await User.findBy({ name }).first()
```

Note that findBy() returns an array, so we need to extract its first element with first().

Now that we have the user, we validate the password using compareSync(), like we did in the previous article. We do this in an if statement:

```
if (user && bcrypt.compareSync(password, user.password))
```

If the passwords match, our user is validated, so we can call next() and pass control to the next method in the middleware chain.

If the passwords don't match, we send an error message back and prevent the request to go any further.

### Tying it all together

This is the full code for the function:

```
async function validate(req, res, next) {
  const { name, password } = req.headers

  try {
    if (name && password) {
      const user = await User.findBy({ name }).first();

      if (user && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(403).json({ message: "Invalid credentials" })
      }
    } else {
      res.status(400).json({ message: "No credentials provided" })
    }
  } catch (err) {
    res.status(500).json({ message: "An error occurred" })
  }
}
```

All we have to do now is add this function to the /api/users route handler:

```
server.get('/api/users', validate, async (req, res) => {
```

When we make a request now, passing valid credentials in the headers, we can see all the users. But if the credentials are wrong or missing, we are only shown an the appropriate error. 

[image]

