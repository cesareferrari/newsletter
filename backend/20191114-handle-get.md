# How to handle a GET request with Express
## We use an Express route handler to send a response back to the client

If you followed along with the [previous article](https://cesare.substack.com/p/back-end-api-development-with-nodejs), you now have a server listening on port 4000, but doing little else.

In this article we are going to use our server object to handle requests for the root document and to send back a response.

### Handle the root URL

If you send a request to this server for the root URL, the server doesn't know how to respond yet, so the browser gives us an error saying that the request cannot be handled. This is because we haven't written any code to handle requests.

We need to add a route handler for a GET request to the root path.

By default, when we make a request to a web server in this way:

```
localhost:4000
```

our request uses the GET verb defined in the HTTP protocol (we talked about HTTP verbs in [this article](https://cesare.substack.com/p/back-end-api-development-introduction)). It also defaults to the root path '/'.

Now we need to write code that tells Express what to do when a request with a particular URL associated with a particular verb comes in.

### Express helper functions

Express has some helper functions for each of the HTTP verbs and they are easy to remember because each function has the same name as the verb.

When we are browsing to localhost:4000, the browser sends a GET request for the root document at this URL: '/'.

We can tell our server how to handle that request with code similar to this:

```
server.get('/', (request, response) => {
    // ... do something ...
})
```

The first argument to get() is the path that the server must handle, in our case the string '/'.

The second argument is a function that takes two arguments.

### Req and res always go together

The first argument contains information about the request that Express received. 

The second argument is an object that contains information we want Express to send back, so we can control what the client receives.

We name the arguments in the function passed to get() as request and response, but they can be called anything.
It's common to call them req and res for ease of typing, so that's how I will call them going forward. 

Now that we have a basic structure for the function set up, we can tell Express what to do when a request comes in for the root document. We simply send back a message to the browser.

```
server.get('/', (req, res) => {
  res.send('Hello world from Express.');
})
```

As you can see, we use the response object and call the send() method on it, passing a message.

### HTTP responses

A typical HTTP response has a number of components to it. There are headers that indicate what type of response it is, a response code that indicates whether the response was successful or not, and there's a payload that can be text, JSON, or a file, for example.

Express will include all the required headers and response codes for us automatically, if we don't specify them in our code.

This is one advantage of using Express over the HTTP module included in Node.
Even though Express leverages the HTTP module under the hood, if we used that module directly, we would have to set those headers ourselves manually.

At this point, if we visit localhost:4000 with our browser, we should get the message back:

```
Hello world from Express.
```

If we want to see the full request with the headers added by Express, we can use make the request using curl. This is what we get:

```
curl -v http://localhost:4000

* Rebuilt URL to: http://localhost:4000/
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 4000 (#0)
> GET / HTTP/1.1
> Host: localhost:4000
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 25
< ETag: W/"19-nBslrnCvxSha/XY1J2UD9NYt1dI"
< Date: Tue, 12 Nov 2019 15:34:59 GMT
< Connection: keep-alive
<
* Connection #0 to host localhost left intact
Hello world from Express.
```

As you can see, even though in our route handler we only set the message to be sent back, Express adds all those other headers for us.

Great, so now we have a server running, and we are able to handle an endpoint. We will see how to do more complicated stuff in the next articles.



---

Did you like this article?  Share it with your friends. 

I write daily about front-end and back-end web technologies. 
You can receive all my articles in your inbox by subscribing to my newsletter. Just click the button below. No spam, just good, useful content. Guaranteed!

Follow me on Twitter
https://twitter.com/CesareFerrari

