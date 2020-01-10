## API authentication with Express
# How to encrypt a password on user registration with bcryptjs

tagged_headline: How to encrypt a password with bcryptjs in Express #database #api #webdev #backend



In a previous article we have seen the importance of saving an encrypted password in a database associated with a REST API, as opposed to just saving it in plain text.

We talked about hashes and salts, elements that can make our passwords more secure.

But how do we go about hashing a password?

If we use Node and Express we have a library at our disposal called bcryptjs that can help us hash and salt passwords.

Let's imagine we have a web API with this endpoint:

```
localhost:5000/api/register
```

The endpoint accepts POST requests in order to register a user.

The route handler for this endpoint would look something like this:

```
server.post('/api/register', async (req, res) => {
  const userData = req.body;

  try {
    const user = await User.add(userData);
    res.status(201).json(user);
  } catch(err) {
    res.status(500).json({message: 'Error saving the user'});
  }
});
```

The user data is extracted from the request body and passed to the User model to be added to the database.

In the body of our POST request, we pass the credentials entered by the user, formatted as JSON, like this:

```
{
    "name": "cesare",
    "password": "secret"
}
```

Here's a screenshot of this request made with Postman:

[ user-register1.png]

As you can see, the API returns the newly created user, but there's a problem: we can see the password in plain text.

In fact, if we look at the users table in the database, we can confirm that the password is stored without any encryption:


```
sqlite> select * from users;

id          name        password
----------  ----------  ----------
6           cesare      secret
---
```

Obviously, this is not what we ultimately want. We want to modify the code in the route handler so we can hash the password received, and store it securely in the database.

In order to do that, we need to add the bcryptjs library into our project. We first install the library:

```
yarn add bcryptjs
```

We then require the library at the top of the router file:

```
const bcrypt = require('bcryptjs');
```

bcryptjs has a method called .hashSync() that returns a hash of the password passed to it.

This method takes the plain text password as the first argument, and a number as the second argument.

The number determines how many times the hashed password is re-hashed. If we re-hash a hashed password multiple times, we increase the security of our password, because we make it very expensive, in term of computer resources, to recover the original password from the final hash.

The higher the number, the better the security. But there's a catch: the higher the number the more time the hashing process takes. 
This means that the user would have to wait longer, and our server work harder, when the password is hashed with a higher number.

Note that this value is not the number of times a password is hashed. If we passed 10, the password would be hashes 2 elevated to the power of 10.

Since we need to find a happy medium between security and resources, for our purposes we will use 10 as the second argument.

```
const hash = bcrypt.hashSync(userData.password, 10);
```

Once we have generated the hash, we want to replace the original plain text password in the object passed to the endpoint with it, and save the hashed password to the database:

```
userData.password = hash;
```

Here's the final code:

```
server.post('/api/register', async (req, res) => {
  const userData = req.body;

  const hash = bcrypt.hashSync(userData.password, 10);
  userData.password = hash;

  try {
    const user = await User.add(userData);
    res.status(201).json(user);
  } catch(err) {
    console.log(err);
    res.status(500).json({message: 'Error saving the user'});
  }
});
```

If we call the API with a new user name, using the same password, we now get back a JSON object with the hashed password:

[ user-register2.png]

This is the hashed string that was created by the bcrypt.hashSync() method.

```
$2a$10$roDcAEvy5dk3L4dvGQNnK.XUJLdloNbuRVh6PmgKpOHhF1fctny3G
```

It's worth to know a little more about the format of this hashed string. We will look at it in more detail in the next article.


