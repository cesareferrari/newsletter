# How to validate credentials on log in using bcryptjs
## Finding the user and validating the password in an Express application

tagged_headline: How to validate credentials in an Express application #bcrypt #express #api #webdev #backend


We have already seen how to register a user and encrypt the password in a previous article.  In this article we'll build on that knowledge and look at how to validate credentials for registered users that want to log in.

In a typical scenario, when a user logs in, he will fill out a form with username and password.
On submit, the browser will then generate a POST request to our API, passing user name and password to the endpoint. Credentials are accessible in the POST body.

Then a validation process occurs. If user name and password match what we have stored in our database, the user is given access. If not, an error message is generated.

Let's start by building a basic login route helper. This helper creates an endpoint that accepts POST requests at localhost:5000/api/login

For now, the helper only checks if the user exists and welcomes him if it does. This code won't do any password validation yet. We will add this functionality shortly.

```
server.post('/api/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findBy({ name }).first();

    if (user) {
      res.status(200).json({ message: `Welcome ${user.name}` });
    } else {
      res.status(401).json({ message: "Invalid credentials" })
    }
  } catch (err) {
    res.status(500).json({message: "Error logging in"});
  }
})
```

In the method above, name and password are extracted from the body of the POST request, but the password is not used.

### Validating the password

What we want to do now is validate the password entered by the user against the hash we have previously saved in the database, when the user registered, using bcrypt.

We already have an if statment to test if the user exists. In this same if condition, let's also check if the password matches.

For this comparison, we use the compareSync() method of bcrypt. compareSync() takes two arguments: the password entered by the user and the hash that was saved in the database.

Since at this point already have the user object from the database, we can find the password in user.password.

This is how we set up compareSync():

```
bcrypt.compareSync(password, user.password)
```

compareSync() will do all the hard work of finding the salt and finding the complexity number we used to originally re-hash the password on registration.  
It will then hash the entered password and compare the resulting string with the hash saved in the database. If those two results match, the user is allowed in.

This is the final code:

```
server.post('/api/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findBy({ name }).first();

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ message: `Welcome ${user.name}` });
    } else {
      res.status(401).json({ message: "Invalid credentials" })
    }
  } catch (err) {
    res.status(500).json({message: "Error logging in"});
  }
})
```

At this point, if we try to login with the correct user name and password, we should get a friendly welcome message:

[image]

But if we supply the wrong password, we won't be able to get in:

[image]

Notice that we don't want to be too specific in the message that's returned when the password is incorrect. We just use a somewhat generic message of "Invalid credentials" so we leave a potential hacker in the dark on what actually went wrong. 

If we were more specific, and sent back "Wrong password" instead, we would possibly given clue that the username was actually correct, and this could give an advantage to someone that wants to access an account for malicious purposes.

In this article we have seen how to verify that a supplied password is correct, but there may be additional steps in the login process. We'll see how to tackle those in future articles.
