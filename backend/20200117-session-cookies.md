# How to manage sessions in an Express application
## Configuring session cookies

tagged_headline: How to manage sessions in an Express application: configuring cookies #express #api #authentication #sessions #webdev #backend

In this, and future, articles, we'll show how to work with sessions in Express.

I am assuming we already have a functioning Express application that exposes a REST API with a few different endpoints and is connected to a sqlite3 database.

To set up and manage sessions in our application we are going to use the express-session library. By default, this module stores session information in memory. This may or may not be what you ultimately want in production, but it will be good enough for our immediate purposes.  

As usual in order to use the express-session module we must install it either with npm or yarn:

```
yarn add express-session
```

We then require the library at the top of our server.js file:

```
const session = require('express-session');
```

This will create a middleware object called session, which takes some options.
You can see a full list of options available in the [express-session documentation](https://www.npmjs.com/package/express-session)

Some of the options we need to specify have to do with cookies, since express-session will set cookies in the browser to keep track of the current session.

The session object is Express middleware, so we have to register it with the middleware system by using the server.use() method, like we typically do for all other middleware.

We use server.use() because this will be considered global middleware that will be used by all endpoints.

What the session middleware does is take any request that comes into our server and inject a session object in it, so it's available to the rest of our code.

### Session configuration

When we set up the session object with server.use() we also pass in some configuration in the form of a literal object or a separate config object.
In our example below, we use a separate sessionOptions object, to keep the code clean:

```
server.use(session(sessionOptions));
```

We now need to create sessionOptions where we specify configurations for our cookies.

In our examples we use configuration values that are plain strings but it's important to note that in a real application these values shouldn't be hardcoded, but should come from environment variables in order to be more secure and tailored to the specific application environment used.

Here I am writing the configuration object and will explain below what the options used are:

```
const sessionOptions = {
  name: "mycookie",
  secret: "cookiesaregood",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false
}
```

name: it's the name we want to give to the cookie. By default, express-session used "sid", but we prefer to change it to something else to prevent giving out clues on what library we are using, since this name is visible from outside our application.

secret: the cookie is encrypted, and express-session uses this secret string to encrypt the cookie in a unique way. Needless to say, this also needs to be saved in an environment variable and not left in the code.

maxAge: specifies the lifetime of our cookie, before it expires. It's expressed in milliseconds. In our example, the cookie will expire in 1 hour.

secure: specifies if https is required in order to set the cookie. We would want secure to be true in production, but for development it's OK to be false.

httpOnly: this flag prevents the cookie by being accessed in the browser by the Javascript engine. httpOnly should be set to true, so the browser will only transmit the cookie over http.

resave: this flag should be set to false to prevent problems in case of parallel requests that can leave cookies in a wrong state (see documentation for more details).

saveUninitialized: prevents cookies to be saved before the user gives the consent to save cookies on their machine. It's used for privacy compliance.

We will stop here for now and resume talking about sessions in the following articles.
