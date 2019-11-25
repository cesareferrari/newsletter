# How to create Middleware methods in Express.js
# Define a custom middleware method to use in a REST API built with Express.js

tagged_headline: Define a custom middleware method to use in a REST API built with Express.js #nodejs #expressjs #middleware #backend #webdev #javascript #fullstack



So far, we have seen that the callback function passed to a route handler has two objects: request and response as exemplified by this code:

```
server.get('/', (req, res) => {
  res.send("Welcome to the API");
});
```

We also talked about how Express sees the request and response objects as passing through a pipeline. At each station on the pipeline they are looked at by a middleware method and the method determines what to do with the objects.

It may send them to the next method in the pipeline, or it may skip further steps and send a response back to the client.

If we use the send() method, like above, the result is that each next step in the pipeline is skipped, and the response is sent back. This is because send() automatically halts the chain of methods.

But if we commented out the res.send() line, Express wouldn't know what to do with this request and will hang until a timeout occurs.

So, when we build methods ourselves, we need to specify what the next step is for the request to keep going to the next middleware method.

Do we need to send it to the next method down the line? Or do we need to send a response back to the client?

We can control what this next step is by using an optional third parameter in the callback. The third parameter is called next by convention and tells Express what to do next, after the request has been processed by our middleware method.

# Example of custom middleware

To demonstrate this concept, let's define a method that uses next.

We will create a simple method that does some logging in server.js called logger. This function takes request, response, and the next parameter.
Inside our logger, we just want to log out the request method.

```
function logger(req, res, next) {
  console.log(`${req.method}` method.);
}
```

If we used this method now, it will cause Express to get stuck, because it doesn't end the chain by either sending the request to the next method, or by sending a response back to the client.

In order to move the request on to the next station, we need to call next(), like this:

```
function logger(req, res, next) {
  console.log(`${req.method}` method.);
  next();
}
```

We basically invoke what was passed in the next parameter, which is telling Express to go ahead to the next method in the chain.

In order to use our method we need to add it to the pipeline, with server.use():

```
server.use(logger);
```

At this point, our code should look something like this:

```
// define the server
const express = require('express');
const server = express();

// user middleware
server.use(logger);

// root route handler 
server.get('/', (req, res) => {
  res.send("Welcome to the API");
});

// define middleware function
function logger(req, res, next) {
  console.log(`${req.method} method.`);
  next();
}
```

If we now make a request like localhost:4000 to our server the console will print out this: 

```
GET method.
```

This shows that our middleware method was called, it printed out its log message, and the request was sent furter to the root route handler which responded with a welcome message.


---

Did you like this article?  Share it with your friends. 

I write daily about front-end and back-end web technologies. 
You can receive all my articles in your inbox by subscribing to my newsletter. Just click the button below. No spam, just good, useful content. Guaranteed!

Follow me on Twitter
https://twitter.com/CesareFerrari