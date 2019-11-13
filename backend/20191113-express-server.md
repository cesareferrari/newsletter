# Back-end API development with Node.js and Express
## How to create a basic Express server #nodejs #expressjs #backend #webdev #javascript #LambdaSchool


This article describes how to create a basic, but functioning, API server from scratch with Express.
  
I will also talk a little about the TCP/IP protocol, HTTP, and explain the reasons why we use port numbers in our applications.

Let's start by installing Express in our project. Express is the Node.js application we use to handle HTTP requests.

We install Express by running this command on the console:

```
yarn add express
```

Any application needs to have an entry point, that is, a file that gets executed first. Our entry point is a file called index.js.

We first create that file:

```
touch index.js
```

and then require the Express library at the top of it in this way:

```
// index.js

const express = require('express');
```

We have seen in previous articles that Javascript has a newer syntax for importing modules. The newer syntax uses the keyword import instead of require.

The reason why we don't use import here is because Node doesn't support this newer syntax yet.

```
// this syntax is not supported in Node.

// import express from 'express'; 
```

Create a server

Once we have required Express, we want to interact with it.  For this reason, we create an object that we name server.

We then invoke the express() function made available by Express, and assign it to the server. The resulting object has all the methods we need to use Express.

```
const server = express();
```

Some notes about the TCP/IP protocol

TCP/IP is the protocol stack that runs the internet.
TCP means Transmission Control Protocol. It is a connection oriented protocol that runs on top of the internet protocol (IP).

It's not necessary to know TCP/IP in detail to work on a back-end application, but since there are some elements of TCP we are going to interact with, it's nice to understand at least some of the aspects of this protocol.

One thing we will look at is the port number.

The server object we have defined previously has a method called listen().
The first argument of listen() is the port number.

```
server.listen(4000)
```

The port number specifies an endpoint for the TCP stack on the machine where the server is running, which can be a local or remote machine.

When http requests come into the server, a TCP port number is sent as part of the request. 

That port number tells the server which application should handle that
particular request.
This is because the machine receiving the requests could be running many applications that are all listening for TCP requests coming in on different ports.

The port number is a way to tell the server to route a particular request to the matching application.

It's like our application saying: "I handle port 4000. Send all the requests on that port to me!"



Well-known ports

Many of the port numbers are known as Well-known ports. Well-known ports are ports used on the internet to handle particular services. There's a registry maintained by an internet governing body that identifies these Well-known ports.

One example of a Well-known port is port 80. That's a typical http port that web servers listen on.

Another example is https, an encrypted version of http, which runs on port 443 by default.
Another example is FTP, which runs on ports 21 and 22.

When we create our own server we don't want to choose a Well-known port because it's typically used for something else already. That's why we are using a port like 4000, which is not Well-known..

If, by chance, a port we choose is already used by another application on our machine, we would get an error if we were trying to start our application on the same port.

After specifying the port, we also need to tell the listen() function what to do
when a request comes in on that port.

We do that by passing a function as the second argument of listen. In our basic server example we just write a message to the console inside this function.

```
server.listen(4000, () => {
  console.log('Server listening on port 4000')
})
```

If we start the server now, with the `yarn server` command, we will see our message printed out on the screen:

```
Server listening on port 4000
```


Running `yarn server` is the equivalent to running our index.js file with Node.
The package.json file in our project folder has a section called scripts.

`yarn server` will call the `server` script in package.json, which is set to call nodemon and run the index.js file.

```
  "scripts": {
    "server": "nodemon index.js"
  },
```

As you remember, nodemon is an application that runs Node and monitors changes in the project files. If some file changes, nodemon will restart the server so the most up to date version of our application is served.

Now that we have set up a server and called the listen method on it, passing a port number and some code to execure when a request comes in, we can visit localhost:4000 in our browser to see the results of our work.

And... we get an error message:

```
Cannot GET /
```

We shouldn't be too sad, though. Even though it's an error message, it's also confirming that the server is running correctly and accepting connections.

The error message in the browser refers to the fact that even though the server is running, it's not currently able to handle requests yet.

This makes sense, since we didn't write any code that handles the '/' endpoint.  

We will take care of this in the following articles.


---

Did you like this article?  Share it with your friends. 

I write daily about front-end and back-end web technologies. 
You can receive all my articles in your inbox by subscribing to my newsletter. Just click the button below. No spam, just good, useful content. Guaranteed!

Follow me on Twitter
https://twitter.com/CesareFerrari
