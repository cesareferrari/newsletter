# How to verify a JSON web token after login
## Creating a middleware function that verifies a JWT token in a web API

tagged_headline: How to verify a JSON web token after login in a web API #jwt #expressjs #api #authentication #webdev


In the last article we have seen how to generate a JSON web token on log in.

A registered user can send username and password in the request body. Those credentials are used by a middleware method in our application to check if the user exists, and if the password matches the hashed password stored in our database.

When the user is authenticated, we generate a JSON web token using the jsonwebtoken Node.js module and send it back to the client.

The idea is: if the client sends the token back unchanged in the subsequent requests, we can safely assume that the client is authenticated. 

If you remember, the JSON web token (JWT) is made up of three parts: header, payload and signature. The signature is the section that verifies the integrity of the token. If the token we issued was tampered with, and is sent back to us, we will know it because the tampering will be evident in the signature.

### Restricted middleware

In the previous version of our application we were managing authentication by using a restricted middleware method that checked the validity of username and password.

What we want to do now, is use the token to validate the user, not username and password anymore. In essence, we just want to replace the restricted middleware method with another method, by the same name, that validates the JWT instead of validating username and password.

Since we need to manage the token in the middleware file, we need to import the jsonwebtoken module at the top of restricted.js:

```
const jwt = require('jsonwebtoken');
```

We know the client is going to send us the token, but how exactly?

Well, the token could be either in the headers or in the body of the request.

Since we would need to validate GET requests, though, it's not considered good form to have the token added to the body, even though it's possible to do so.
The only viable place then, it's in the headers, and in particular in a header called authorization.

In our restricted middleware, we need to extract the token from the header in this way:

```
const token = req.headers.authorization
```

Once we have the token, we need to verify it. jsonwebtoken can do that with a method called verify().

The way verify() works is like this: it takes the received token, it adds together the header and the body, and generates a hashed signature from this combination by adding the secret we have stored on our server.

If header and payload have not changed, meaning the token is valid, the generated signature would correspond to the one we could generate ourselves on the server.

Since verify() needs the secret to do its job, we need to pass it in as the second argument.

verify() also takes a callback function as a third argument.

If something went wrong while verifying the token, the callback is passed an error   object. Otherwise, it's passed the decoded token.
Inside the callback we check if we have an error. If so, we send back a 401 status code and end the middleware chain.
 
If there is no error it means the token was properly verified. In this case we need to set things up so the following methods in the chain can access the token.
We do that by adding the token to the request object. We then call next() to continue the middleware chain.

Here's the full restricted middleware code:

```
module.exports = (req, res, next) => {

  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json(message: "Error decoding token")
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    } else {
      res.status(401).json(message: "Missing token")
    })
  }
}

```

Great! By using this code, we don't need to authenticate the user with credentials anymore. We just need to verify that a valid token exists in the authorization header of each request. 





JWT are for authentication and authorization and cookies are for sessions that
track application state.
