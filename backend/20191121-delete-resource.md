# Deleting a resource via HTTP DELETE
## How to delete resources from a database using an Express API

tagged_headline: How to delete resources from a database using an Express API #nodejs #expressjs #backend #webdev #javascript #LambdaSchool



So far we have crated an API that can show a list of toys in a database, and can add a new toy.

Now that we have played with our new toy for a while, we are getting tired of it, so it would be nice if we could remove it from our toy collection.

We have seen that reading from a list is done by sending the GET verb in the HTTP request while adding to the list involves sending the POST verb. 
In a similar way, deleting from a list is done using the DELETE verb.

We also know that we need to associate an URL to the verb. What URL are we going to use to delete a resource? That's right, the same URL we have been using all along: /toys
The reason we are using the same URL is because we are still dealing with Toy resources, so it makes sense that they are represented by the word /toys in the URL.

But when we delete an object, we also need to tell the database which object to delete. Since all toys, when they are created, have a unique id field, we can use this id to identify the toy to delete.

Our endpoint will then look something like this:

```
DELETE /toys/<id>
```

where <id> is the id of the toy to remove from the database.

Express has a way to specify templatized data in a URL, that is, data that may be variable from one request to another.

In our case, the id of the object to delete varies from request to request. To implement this idea, Express uses a special syntax. It lets us prepend the variable data with a colon character ":", to indicate it's a variable.

If we add the colon before the id in the URL, Express knows that this is not to be taken literally, but it'a a placeholder for variable data. Express will assign the data we pass in this place to a named variable: id.

By the way, we call this variable :id, but we could call it any other name, like :toyId, for example.

Here's how we start building our delete endpoint:

```
server.delete('/toys/:id', (req, res) => {

})
```

### Request params

We need to work with the toy id, but how do we extract it from the URL?

The request object has a property called params that holds all the parameters passed to the URL. id is a param, so it's available inside req.params

In our code, we extract this param from the request and we assign it to a variable (using Javascript deconstruction syntax), so we can use it later.

```
const { id } = req.params;
```

Next, we call a predefined method in our db object called remove(). remove() requires the id of the object to remove.
remove() returns a promise and if the delete operation was successful it will send back the object removed.

So, in our then() method we check if the removed object is present (meaning the removal was successful) and return back to the client a status of 204 (successfully removed).

```
  db.remove(id)
    .then(removed => {
      if (removed) {
        res.status(204).end();
      }
    })
    .catch()
```

If the database does not return an object, it means that the object was not deleted, because it was not found, for example, so in the else branch we should send back a response status of 404, meaning resource not found.

We would also send back a clarifying message inside a JSON object:

```
db.remove(id)
  .then(removed => {
    if (removed) {
      res.status(204).end();
    } else {
      res.status(404).json({message: "Not found"})
    }
  })
```

We have seen error handling before in the catch() method. Why are we now sending a 404 error inside the then method instead? 

This is because 500 errors are considered permanent errors, meaning something went very wrong and the API cannot fulfill that request at all.

400 errors are considered temporary errors, errors that come up because the data sent was not quite correct. If we just sent the data correctly, the request could be fulfilled successfully.

In our case we get a 404 error not because the request was completely wrong, but because the wrong id was passed in a perfectly legitimate request. If we try the request again with an id of an object that actually exists in the database, the request would be considered successful.

So, the 404 error is only temporary, and can be resolved by sending the right data along with the request.

Now let's handle the case where there is indeed a bad request, that deserves the 500 error:

```
.catch(err => {
  res.status(500).json({ err })
})
```

And this is the final code for our delete endpoint:

```
server.delete('/toys/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(removed => {
      if (removed) {
        res.status(204).end();
      } else {
        res.status(404).json({message: "Not found"})
      }
    })
    .catch(err => {
      res.status(500).json({ err })
    })
})
```

If we try this endpoint now with Insomnia, passing an id of an existing toy, the toy will be deleted and we will get back a 204 response code.

We can verify the toy was deleted if we make a GET request for all toys, the deleted one should not be there anymore.


---

Did you like this article?  Share it with your friends. 

I write daily about front-end and back-end web technologies. 
You can receive all my articles in your inbox by subscribing to my newsletter. Just click the button below. No spam, just good, useful content. Guaranteed!

Follow me on Twitter
https://twitter.com/CesareFerrari
