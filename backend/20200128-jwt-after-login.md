# How to generate a JSON web token after login
## Creating a function that send a JWT token back to the client in a web API

tagged_headline: How to generate a JSON web token after login in a web API #jwt #expressjs #api #authentication #webdev


All we've done at this point is create an endpoint that generates a JSON web token and sends it back to the client.

For demonstration purposes, this is good enough, but in the real world we would want to generate a token at a specific event in our application, like right after a user gets validated, for example.

So, our next step will be to create a token that we are going to send back to the client, that contains information about the user so when we receive that token again in a future request, we know exactly who the user is and what their permissions are.

In order to achieve this, we need to generate the token after the user is authenticated with username and password.

The place where the user authenticates themselves in our application is in the login endpoint.
In our application we have an auth-router.js file which defines endpoints that take care of registering and logging the user in.

Inside the login endpoint we want to generate a token right after the user was found in the database and authenticated, right before sending back the welcome message:

```
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {


        // ### generate token here ###


        res.status(200).json({
          message: `Welcome ${user.username}!`,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
```

We could paste the code we have used in the previous article inside the login route handler method, but it would be pretty messy, so let's just call a new method that takes care of generating the token.
We name the method genToken(). genToken() takes a payload as an argument, which contains information about that particular user.

Since our method needs to use information stored in the user object, we pass the  whole user object to the genToken() method and we'll extract the properties we need to compose the payload.

In case we need to pass extra information, we could also create a new object that includes what's needed by the token, and pass that instead.

```
token = genToken(user)
```

We called the genToken() method in our endpoint, but we still have to define it. We can define it right inside the auth-router.js file:

```
function genToken(user) {
  const payload = {
    subject: "user",
    username: user.username,
    favoriteColor: "blue"
  };

  const secret = "Secret"

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, secret, options);
}
```

As you can see, all we've done is take the code we have written before when generating a token and added it to the genToken() function that's used in the login endpoint.

Since we are in the auth-router.js file, we also need to import the jsonwebtoken library to make this work. We just require it at the top of the file:

```
const jwt = require('jsonwebtoken');
```

With this changes, if we now register and then log the user in, we can see that a token is generated and sent back to the client.

[image]

We'll talk more about JSON web tokens in future articles.
