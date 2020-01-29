# How to save a JSON web token secret into an environment variable
## Use config/secrets.js for all your web application secrets 

We now know how to generate and verify a JSON web token, but we still have some work to do.

In our previous examples we hardcoded the secret required by the JWT inside our methods as a simple string.

But this is not a good practice. It creates a security vulnerability in our code, and it also creates code duplication because the secret is used in two places in our application.

Let's clean this up and make it better.

What we really want to do is make the secret a configuration setting for the environment and make it so we can read it from the environment in a variable called JWT_SECRET.

Let's create a config folder at the root level of our application and inside of it we can create a secrets.js file:

```
mkdir config

touch config/secrets.js
```

In the secrets.js file, we export an object that contains our secret.
The object has one property, called jwtSecret, that is set to the value of an environment variable called JWT_SECRET.

```
// config/secrets.js

module.exports = {
  jwtSecret: process.env.JWT_SECRET
}
```

Now, in our restricted middleware file we require the secrets.js file and assign the exported object to a secrets variable that we can use instead of the hardcoded secret string.

```
const secrets = require('../config/secrets.js');

// ...

module.exports = (req, res, next) => {

  // ...

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
 
    // ...

  }
};
```

We will do the same thing inside the auth-router.js file, where the login route is defined. The login route also needs the secret in order to generate the initial token, so we can use the secrets.js file as well:


```
// auth/auth-router.js

const secrets = require('../config/secrets.js');
 
// ...

return jwt.sign(payload, secrets.jwtSecret, options);
```

If we try to connect to localhost:5000/api/users now, we get this error:

```
"Error decoding token"
```

Why? That's because we used an environment variable called JWT_SECRET that we still have to define in the .env file in our project.


```
// .env

JWT_SECRET=Secret
```

Once we have this variable defined, and we use the dotenv library to implement it, we can make our request and be sure we are authorized for access to restricted endpoints.


