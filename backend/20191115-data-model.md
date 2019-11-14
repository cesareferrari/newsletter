# Working with a data model
## Creating an Express API that returns data from a database

To better learn about the Express.js library we are building an API.

APIs often need to access data stored in a database so, in this article, we are exploring how to work with a database. In particular we will look at how to read from a database table.

We won't go into the details of how to actually handle a database right now, we will leave that for future articles.

### The data model

Let's assume we already have a database set up that stores toy information.
To access the database we use a data model.

Conceptually, a data model is a layer between our server and the database itself. It's like an intermediary that handles the database connection.

We write server code that talks to the data model and asks it to perform operations with the database, like fetching or adding data.

In essence, the data model is a sort of API between the server and the database. As you can see, even though we are building an API with our Express application, we are also using an API to connect to the database. It's not a REST API, but it's an API nonetheless.

In order to connect to the database, retrieve data, and send it back to the client that made the original request, we need to create a route handler for a specific endpoint.

The endpoint we are going to use will be 'localhost:4000/toys'.
This endpoint will return data from our database reading operation.
If you remember, reading data corresponds to the R operation in CRUD (Create, Read, Update, Delete).

This is the start of the route handler:

```
server.get('/toys', (req, res) => {
  // ... do something with the data ...
})
```

### Requiring Data

The data model is a Javascript module that connects to the database and exports some functions that let us operate on the data.
The model is defined in a file called data/toys.js, inside our project folder.

One of the functions exported by the data model is the find function.  find reads data from a database table and returns it in an array.

But before we can use methods defined on the data model, we need to import the data model file in index.js so its functions are available. 

We do this at the top of index.js using the require syntax:

```
// index.js

const db = require('./data/hubs-model.js');
```

As you can see, we call require passing the path to the data model file. We also assign the result of this call to an object named db.

We will call methods on the db object that let us interact with the database.

We already noted that the data model exports a find() method that we can use to retrieve data. Let's use it inside our route handler:

```
server.get('/toys', (req, res) => {
  db.find()  // returns a Promise
})
```

### Promises

Methods in our data model return Promises. This is great because it allows us to perform a call asynchronously and handle successful operations but also errors that may pop up during the call.

We need to be able to handle errors because there may be connection errors, data not found, database errors, and so on while dealing with databases.

Promises let us use a then() and a catch() method at the end of find() so we can handle all cases.

Here's the basic structure of our route handler so far:

```
server.get('/toys', (req, res) => {
  db.find()
    .then()    // handle success 
    .catch()   // handle failure 
})
```

Tomorrow we will see how to actually handle the call and the data returned by it.

---

Did you like this article?  Share it with your friends. 

I write daily about front-end and back-end web technologies. 
You can receive all my articles in your inbox by subscribing to my newsletter. Just click the button below. No spam, just good, useful content. Guaranteed!

Follow me on Twitter
https://twitter.com/CesareFerrari
