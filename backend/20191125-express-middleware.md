# Express Middleware
## What is the purpose of middleware in an Express application?

tagged_headline: What is the purpose of middleware in an Express application? #nodejs #expressjs #middleware #backend #webdev #javascript #fullstack



You can think of an Express application as a long pipeline with stations along the way.
The stations represent the methods in our application, methods like server.get() or server.use().

The way the system works is similar to this: 

A request comes into the pipeline from an HTTP client. It carries with it two properties: URL, and HTTP verb.

At each station, a method looks at these two properties and based on them, it decides to process the request or not.

If the URL and verb match what is required by the method, the request is processed and either sent to the next station for further processing, or returned back immediately to the client, bypassing all the other stations on the pipeline.

On the other hand, if URL and verb don't match, the request is ignored by the method and sent to the next station untouched.

Each method can handle both request and response, and can add or remove information to it, before the request object is passed to the next method.

### Middleware methods

Here's an example of an Express method:

```
server.use(express.json())
```

In this example, we are not specifying any URL or HTTP verb. This signifies to Express that all requests that stop at this station must  be processed by it.

If we look at another method, like server.get() we see that it specifies both an HTTP verb (GET) and an URL:

```
server.get('/', (request, response) => {
  response.send('Hello world from Express.');
})
```

So, if the two request properties match both verb and URL, a request will stop at this station and the code within the method will be executed.

All these methods, or stations, are called middleware.


### Three types of middleware

There are three types of middleware in Express: built-in middleware, custom middleware, and third party middleware.

Built-in middleware comes included with the Express package. One example is the express.json() method we have already seen.

Custom middleware is the middleware that we create, like server.get() or other specific middleware we create ourselves.

Third party middleware comes from third party libraries and adds extra functionality to Express.

All three types of middleware are added to the pipeline in the same way, and process the request in the sequence in which they are added to the pipeline.

### Example of using middleware

To demonstate how to use middleware, we can look at one common third party middleware that's used often in Express applications: Helmet.

If you take a look at the headers of a typical Express response, you can notice this header: 

```
`X-Powered-By: Express`
```

The header is added by Express itself, but it could be considered a security risk. An attacker may look at our response, know that it's served by Express, and exploit bugs or vulnerabilities in our software package to disrupt our server.

There are a couple of ways we can make our response a little more obscure and fix this vulnerability.

One way is to modify the response object directly in our code and remove that header. 

But there may be other things we want to do to the headers that will provide additional security features.

For this purpose, many developers use a third party middleware called Helmet. It's a package that we can install with yarn.

```
yarn install helmet
```

We then need to add it to our middleware pipeline by requiring it at the top of the server.js file. 

```
const helmet = require('helmet');
```

Helmet should be enabled for all endpoints, so we don't specify URL or verb in the middleware.
We also add it before all endpoints, so it will be automatically run for all requests.

The way we enable it is with the server.use() method of Express. server.use() takes a middleware method and adds it to the pipeline:

```
server.use(helmet());
```

After we have enabled Helmet, if we make the request again, we notice several things have changed with our headers: 

```
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: text/html; charset=utf-8
Content-Length: 76
ETag: W/"4c-ZAJpbq82PO+s7kc4WVDCocQKg+M"
Date: Thu, 21 Nov 2019 16:46:49 GMT
Connection: keep-alive
```

As you can see, the response doesn't include `X-Powered-By: Express` anymore, and a number of other headers that enhance our security have been added.

In this article we have seen, conceptually, what Express middleware is and its function. In the following articles we will go into more details on how to create and use middleware.


---

Did you like this article?  Share it with your friends. 

I write daily about front-end and back-end web technologies. 
You can receive all my articles in your inbox by subscribing to my newsletter. Just click the button below. No spam, just good, useful content. Guaranteed!

Follow me on Twitter
https://twitter.com/CesareFerrari
