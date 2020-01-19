# How to save user sessions in the database
## Using Connect Session Knex to store session information


tagged_headline: How to use Connect Session Knex to save user sessions in the database #expressjs #api #authentication #sessions #webdev #backend

We have created a login system in our Express application that allows a user to use credentials in order to log in and access some restricted resources.

This system is implemented using the express-session Node module.
express-session creates a session object and inserts it in the request. By checking if this object exists we are able to determine that the user is indeed logged in, and therefore allow access to parts of our API we want to keep private.

The way express-session validates the user is through a cookie that is automatically stored in the user's browser and sent back with the next request.
The cookie has an expiration date far enough in the future that allows the user to access restricted content over a reasonable period of time.

So far, so good. But what if the server shuts down for some reason?

Since express-session keeps all session information in memory, if the server goes down all the sessions are also gone, and the user won't be able to access content again without a new login session.

This is far from desirable, from a user experience standpoint. Saving sessions in memory is fine in development, but in a production environment we would like to have sessions saved in a more permanent way.

The way we are going to do it for this demonstration is to use Knex to save the session in the sqlite database.

We will use the [Connect Session Knex](https://www.npmjs.com/package/connect-session-knex) library for this.  
connect-session-knex is an express-session store backed by SQLite3, and other popular databases, via the knex.js library.

As usual, the first step is to install the module:

```
yarn add connect-session-knex
```

Then we require the library at the top of the server.js file, after the line in which we define the session.
The require call returns a function, and we pass in the session object defined earlier:

```
// server.js

const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
```

Since now we are using a storage system for our sessions, we need to add some options to our sessionOptions object. We basically need to tell connect-session-knex where we want to store the session and other related details:

```
const sessionOptions = {
  // ... existing code ...

  store: new knexSessionStore({
    knex: require('../database/dbConfig.js'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}
```

The new options are:

store: initializes a new knexSessionStore instance with some options of its own

knex: points to the instance of knex that we have available in our application

tablename: database table where we want to save our sessions

sidfieldname: the name of the column that holds the session ids

createtable: tells knexSessionStore to  create the sessions table if it doesn't exist

clearInterval: will clear the table of expired sessions at the specified interval

If we now log a user in, and then look at the database, we can see we have a new sessions table with the user's session information in it:

```
sqlite> select * from sessions;

4vjP3H1k1pbDZus283FnvtCdpir2u9Yi|{"cookie":{"originalMaxAge":3600000,"expires":"2020-01-19T13:01:42.117Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":2,"username":"cesare","password":"$2a$10$aiONZpLsR0GAJiE9/O8hmOhN/k.7XZxf.JB6yPVYIeTtuqjpxAgRu"}}|2020-01-19T13:02:21.686Z
```

We can see that the session information saved in the database includes the user name, password and other potentially sensitive information. This is because when we saved the session in the login route handler we passed it the full user object.

But the session doesn't really need the full object to work effectively, so it's up to us to decide which information we want to include in the session. It may be as simple as a flag that marks the user authenticated.