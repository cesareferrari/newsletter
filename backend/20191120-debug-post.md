# Building an API with Express and Node.js
## Test HTTP requests to an API endpoint using Insomnia

In previous articles we started building an API with Node.js and Express that can read and write to a database.

We have seen how we can easily test the reading operation with a web browser, since reading is associated with a GET request that web browsers do by default.

When we have more complex situations though, like if we need to perform a POST request that passes data to the API endpoint, we may want to use a more suitable HTTP client to make testing easy.

There are different tools available for this purpose, but in our example we use Insomnia (more details [here](https://insomnia.rest) ).  Insomnia is a REST client that makes it easy to send HTTP requests to an API and view response details.

After we install Insomnia, let's make a GET request to localhost:4000/toys, to make sure our backend application is working correctly and data is sent back from the API the way we expect.

We create a new request, select the GET method and enter the URL localhost:4000/toys.

We should get back the list of all toys:

[image toy1]



### Writing to the database

Great! this works. With this out of the way, let's actually make a request to test out the latest version of our code.
If you remember, in the last article we created an endpoint that managed a POST request in order to add a new toy.

We use the same URL: localhost:4000/toys but this time we select POST as the HTTP verb.  
We also need to pass the new toy name in JSON format to the endpoint.

Insomnia has a section that lets us add data to the request body. We just need to select JSON as the format that will be sent, and enter the toy name in JSON notation to be send to the API like this:

```
{
  "name": "Beetle"
}
```

With this set, we just need to hit Send. This is what we get back:

[Image 2]

Wait a second, that's not quite what we expected! We were expecting the new toy to be added to the database and a successful response to be sent back but we got an error. What went wrong?

Here, you can see the benefits of using an HTTP client to debug our code. In this case we not only got an error, but the error has information that gives us clues on how we may start debugging this issue.

If you notice, Insomnia received back a 500 status code.  This is because we told Express to do exactly that in the server.post method:

```
.catch(err => {
  res.status(500).json({ err })
})

```

We also told Express to return the actual error, so the error was converted to a JSON object and displayed in Insomnia:

```
{
  "err": {
    "errno": 21,
    "code": "SQLITE_MISUSE"
  }
}
```

Looks like something unexpected happened when we tried to add data to the database since this error had to do directly with the database call itself. Maybe we didn't send what the database was expecting?

Let's take a peek at what was actually sent to the database first. We can add a console.log call that verifies that we are sending the right data to the database:

```
server.post('/toys', (req, res) => {
  const toyInfo = req.body;

  console.log("toyInfo:", toyInfo)   // <-- For debugging

  // ...
}
```

Here, we examine toyInfo, after it was extracted from the request body. It should have the toy name, right?

After we add the console.log statement, let's make another request. We still get the same error in Insomnia, but now if we look at the server console we see this printed out:

```
toyInfo: undefined
```

This confirms that the error happens because toyInfo is actually undefined at this point. Why?


### Server middleware

It turns out that when we receive a request, Express keeps it as a JSON object. This is not suitable to be sent directly to the database. The database needs a string in our case and we need to convert the JSON object before sending it to the database.

How do we perform such a conversion? Express has some methods that can help here, using a concept called middleware.

I will go into more detail about middleware later, but for now let's just say that we need to add a middleware method to our server. This method converts the data and saves it back to the request object, so it can be safely sent to the database.

Middleware methods need to be added in our code before the endpoints get defined, so they will be available to all endpoints automatically.

The method we add is named server.use() and it takes a function that gets executed on every single request that comes in. The function passed to server.use() is express.json() which converts JSON objects to a string.

```
server.use(express.json());

// ... route handler code below
```

If we now make another request to the API with Insomnia, we can confirm that the error is gone and we get the expected response:

[Image 3]

This response includes the data we sent in, plus additional information that was added by the database, like ID and creation date.

```
{
  "toy": {
    "id": 5,
    "name": "Beetle",
    "created_at": "2019-11-18 15:53:26",
    "updated_at": "2019-11-18 15:53:26"
  }
}
```

Also, if we look at the server console, we note that toyInfo is not undefined anymore, but is set to the data we passed in the request body:

```
toyInfo: { name: 'Beetle' }
```

Yay! Our new toy was added correctly to the database!
And now that we have a new toy, and we play a little with it, what if we get tired and want to get rid of it?

We will see how to add an endpoint for deleting resources in a future article.

---

Did you like this article?  Share it with your friends. 

I write daily about front-end and back-end web technologies. 
You can receive all my articles in your inbox by subscribing to my newsletter. Just click the button below. No spam, just good, useful content. Guaranteed!

Follow me on Twitter
https://twitter.com/CesareFerrari
