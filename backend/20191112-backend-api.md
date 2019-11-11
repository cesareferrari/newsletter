## Back-end API development introduction 
# What does back-end mean in the context of web application development

A large part of application development for the web has to do with what is called back-end.

What is the back-end?

We can think of back-end as applications that communicate with one another.  In web development, back-end is a service that sends data to the front-end.

When we create a front-end application, we create an interface for the user to interact with. That interface is made of components like buttons, dropdown menus, pages, fonts, etc.

The back-end also has an interface, but this interface is not used (or consumed) by the end user. It's used by other applications.

Back-end applications often include databases but they don't have to. They are any kind of service (data, computation, actions, activities, events) that need to occur in support of other applications needs.



APIs

API is an acronym that means: Application Programming Interface.

It's the interface that is used by an application, typically a front-end application, to talk to the back-end application.

API are methods and functions that wrap some operations.
We normally talk about API in the context of internet network applications, but API is a more generic term that describe interfaces between any kind of applications.

For example, an application like Axios has an API that it uses to communicate with other applications.

Sometimes API are synchronous, meaning that we have to wait for their response to our requests before we can do anything. Other times APIs are asynchronous, which means that their responses can come at a later time so we can continue with our work while waiting for the response.

Some API never reply back. In this case it's our responsibility to check with them periodically to see if a request has succeeded or not.




REST API

One common type of API we have these days is called REST api.

REST stands for Representational State Transfer.
These are APIs that are meant to leverage the infrastructure of the internet by using the HTTP protocol.

HTTP (Hypertext transfer protocol) is the protocol used on the internet, and by using REST APIs we gain all the benefits of that infrastructure that's already built and tested on a large scale.

The HTTP protocol specifies that any request made by an HTTP client includes a verb in that same request. The verb indicates to the server what kind of action we ask the server to perform.

There are several HTTP verbs, but the four most common ones are GET, POST, PUT, and DELETE.

In the HTTP request we also provide other information, along with these verbs, that tells the server what it's supposed to do.

The GET verb will tell the server "Get something and return it to me"
POST says: "I'm giving you information, I want you to save it"
PUT does a similar thing as POST, but it's used to update existing information. 
The DELETE verb says to the server "I want you to remove something".

Typically these kinds of exchanges happen within the context of a browser / web server interaction, but working with back-end application we create HTTP servers that are not web servers and we use HTTP clients that are not browsers.


CRUD

APIs very often have to deal with data and there are four basic functions that we can perform with data:

Create data
Read data
Update, or change, data
Delete data

Those four functions are represented in an acronym called CRUD.

Each of those four functions has a correlation with an HTTP verb:

Create -> POST
Read -> GET
Update -> PUT
Delete -> DELETE


There are a myriad of applications that are used to develop and run back-end services, let's take a very quick look at the two main ones we are going to use.


Node.js

Node.js is basically Javascript outside the of the browser.

Inside a web browser, the ability to run Javascript is performed by a system called Javascript engine.
It turns out that the team that created the Javascript engine and the team that created the browser are not the same team. 

The creators of the Javascript engine made it available to the browser team, but they created it in such a way that that same engine can be embedded and used in other type of applications.

The Node.js creators took that Javascript engine and created a server out of it so we can now execute Javascript on the back-end without having to do it inside the browser.



Express

Express is a Node.js application that is used to make HTTP requests.

It's possible to use other libraries, but Express makes it very easy to create and send HTTP requests with Node.

We will see how to create and use back-end applications with Node.js and Express in the following articles.

---

Did you like this article?  Share it with your friends. 

I write daily about front-end and back-end web technologies. 
You can receive all my articles in your inbox by subscribing to my newsletter. Just click the button below. No spam, just good, useful content. Guaranteed!

Follow me on Twitter
https://twitter.com/CesareFerrari
