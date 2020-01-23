# Working with the request object in Express.js
## How to modify request body and headers inside middleware methods

tagged_headline: How to modify request body and headers inside middleware methods #nodejs #expressjs #middleware #backend #webdev #javascript #fullstack

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191127-modify-request.jpeg



When an `HTTP` request comes in, *Express* middleware methods have full access to request and response so they can modify those objects. But, why would we want to modify the request?

One use case has to do with making our application more efficient in regards to database queries.
Let's say we have several methods in our Express pipeline that rely on a piece of data the `API` needs to retrieve from a database.

The first method could make the actual database query, and save the data received in the request. Then it would pass the request to the next method in the chain. The second method could get the data directly from the request, avoiding a second database query, therefore saving time and resources.

### Adding a middleware function

To demonstrate how this works, let's show an example by creating a simple `addName` middleware function.
All this function does is add a property to the `request` object, called `name`, with an arbitrary value.

Since this function is not supposed to end the chain, we need to add the `next` parameter to it, so the request can move along to the next method.

```js
function addName(req, res, next) {
  req.name = "Mickey";
  next();
}
```

To use this function, we must remember to call it towards the top of our server file like this:

```js
server.use(addName);
```

Now that we have added this middleware method, let's take advantage of it in the `root` route handler:

```js
server.get('/', (req, res) => {
  const requestName = (req.name) ? ` ${req.name}` : '';

  res.send(`Welcome to the API, ${requestName}`);
});
```

This route handler method gets executed after the `addName` method.
`server.get` looks at the request and if there is a `name` property, it will add the value of it to its message (or it will add an empty string if the property is not there).

As you can see from this code, we have modified the request and sent the request to the next method with the information embedded, so the next method can use it if it needs to.

### Custom headers

In the same way that we can modify the request, we can also modify the `HTTP` headers that come with it.

Request headers are supposed to be used to exchange information between client and server. In an `API` we have access to them and we can modify them if necessary.

One example of why we would want to modify headers is with caching. In the response, we can add a header that tells the browser not to save some particular information in the browser cache, to prevent caching time-sensitive information.

So, let's see how we can add a new header to our response.
It's common to name custom headers starting with a "`X-`" at the beginning of the header name. For example, we could call a custom header "`X-CustomHeader`".

To test this out we can add our custom header to the request in Insomnia:

https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191127-modify-request2.png


If we then have this middleware function in our server code:

```js
function addName(req, res, next) {
  req.name = req.header('X-CustomHeader');
  next();
}
``` 

we can extract the "`X-CustomHeader`" value from the header, add it to the request and send it to the route handler which will add it in the welcome message like above.

In this article we have seen how to perform operations on the request body and headers to make our application more efficient.