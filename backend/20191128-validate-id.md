# Validate an id with Express middleware
## How to pass the result of database queries between middleware methods

tagged_headline: How to pass the result of database queries between middleware methods #nodejs #expressjs #middleware #backend #webdev #javascript #fullstack


Yesterday we talked about how middleware methods can modify an http request that flows through our application by performing some expensive operation, saving the result in the request, and sending the request along to the next method.

In turn, the next method that needs that data can extract it from the request, avoiding the need to perform that same expensive operation again.

This saves time and resources, especially if we need to query a database repeatedly for the same data.

An example of using this pattern is when we need to validate an id and use that same id in successive methods in our pipeline.

### Accessing records

Let's say we have a database full of Toys and we build an API to access those records. Some things we may want to do with our collection are: find a specific toy, update its description, and maybe delete the toy when we are done playing with it.

We handle these functionalities with methods like server.get(), server.put(), server.delete(), and so on.

All these methods have something in common, though: they all need a toy id to identify the right toy to operate on:

```
server.get('/:id', (req, res) => {...})

server.put('/:id', (req, res) => {...})

server.delete('/:id', (req, res) => {...})
```

In each one of these methods we would need to validate that a record with this particular id exists and, if not, send back an error code and stop the request from going any further.

We could write the logic to handle this situation inside each method, but this would lead to a lot of code duplication.

To make our API more efficient, we could could extract the validation logic into a new middleware method that makes one database query and saves the query result (which is the found record) in the request object, available to all successive methods in the chain.

The next methods could then just look at the request and proceed only if a record exists.

### Validate id

Let's start writing our custom middleware method. 

We will call this method validateId. We pass request and response objects to it as usual.
Since this is custom middleware, we also need to pass the next parameter, so Express can move execution to the next method in the chain when this method is done.


```
function validateId(req, res, next) {

  const { id } = req.params;

  const toy = Toys.findById(id);
}
```

Note that we extract the id from the request params. This object contains an id param that we assign to an id constant using Javascript deconstruct syntax.

We then invoke the Toys.findById(id) method. This method makes a database query returning a toy only if the id matches. If no toy with that id is found, null is returned.

Next, we want to check if the toy was found by the query, so we add an if condition.
If the toy exists we add it to the request object, and then call next() to pass control to the next method in the chain.

If the toy is not found, we return a 404 error and halt the chain with an appropriate message.

```
function validateId(req, res, next) {

  const { id } = req.params;
  const toy = Toys.findById(id);

  if (toy) {
    req.toy = toy;
    next();
  } else {
    res.status(404).json({message: "id not found."})
  }
}
```

### Using validateId middleware

Now that we have this middleware method defined, we are ready to put it to work.

We have seen before that we use custom middleware by passing the method name to server.use(). This will execute methods in our pipeline in the order we add them to the code.

Since we need to run validateId before the methods that need it, we need to add it above them in server.js

```
// call validateId before other methods that use it
server.use(validateId)

server.get('toys/:id', (req, res) => {...})
server.put('toys/:id', (req, res) => {...})
server.delete('toys/:id', (req, res) => {...})
```

This approach works if all the following methods make use of validateId.
But what happens if we also have some other method in the chain that don't require validateId?

For example, we could have a method that returns all the toys, like this one:

```
server.get('/toys', (req, res) => {

  Toys.find(req.query)
    .then(toys => {
      res.status(200).json(toys);
    })
    .catch(error => {
      res.status(500).json({ message: 'Error retrieving the toys' });
    });
});
```

### Unwanted error

Let's exhamine what would happen if we sent a request for localhost:4000/toys

The request is processed by validateId first, because it comes first in the chain

validateId doesn't find an id in the URL passed to it (/toys)

therefore it can't find a toy with that id

so, it returns a 404 error and halts the request

As a result, the request never even touches server.get('/toys')


We clearly don't want this: localhost:4000/toys is a legitimate request to our API, that doesn't need an id to be fulfilled.

We need to find a way to run validateId only for methods that need it, and skip the ones that don't. How do we do that? 

It turns out that Express has a method to handle this situation. We will look at how to solve this issue in tomorrow's article.


