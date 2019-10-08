# Problems when grabbing data from external API in React
## Why we use Promises when we access external data 

In modern web applications we often need to grab data from external API servers
and display it in our own application.

The problem with external services is that the internet is slow and unreliable,
so we need to take into account the fact that some problem may arise that will
delay the arrival of the data needed.

We normally write functions that perform operations like connecting to external
servers and collecting data. But functions are syncronous and if something we do
inside a function takes a lot of time our application may become unresponsive and give a bad user experience.

To avoid this problem, in React we use a Javascript feature called Promises when we need to grab data from an external API.

Promises are a way for the browser to defer the execution of something in an
asyncronous fashion so that the UI doesn't get locked up.

How syncronous functions work

This is how normally functions work:

```
function howdy() {
  return 'hi'
}

let response = howdy();

console.log(response);
```

In this contrived example we define a function called howdy() that returns the string 'hi'. When the function executes, the string is returned immediately and the function terminates.

But what if there was a delay in returning the string 'hi'?
This may happen if we call an external service inside our howdy() function. The
external service may be slow and we would have to wait until the function is
finished and would not be able to do anything else in our application besides
twisting our thumbs.


Using callbacks

A way to solve this problem is by using a callback function.

In the code below we define howdy to take a callback.

howdy() calls the callback and exits immediately so it won't lock up the
interface and will let us continue with our
task. In the meantime, the callback does it slow work.

When the callback is finished it will return the result at its leasure and we
can inject the result into the user interface.


```
function howdy(callback) {
  callback('hi');
}

let cb = greetResponse => console.log(greetResponse);

howdy(cb);
```

This approach works but it may become messy if we have a series of nested callbacks 
waiting for each other.
It just becomes too complicated to keep track, hard to read and prone to bugs.

Promises solve many of the problems with callbacks.

We will look at how promises work in the next article.

