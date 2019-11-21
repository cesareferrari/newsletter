# Working with a REST API
## How to update records in a database with a PUT request.

Updating a record in a database using a REST API is similar to creating a new record.

Both operations involve making an HTTP request that sends along some sort of data.

If it's a new record to be created, we need new data, while if a record needs to be updated we send along the updated data.

To make the distinction between creating and updating an record clear, HTTP uses two different verbs: POST for create and PUT for update.

In this article we will talk about updating resources, so we will show how to use the PUT verb in our request.

### Updating a record

Changing an existing object, in terms of endpoints, looks like a combination of post and delete. If you remember, delete uses an id to find the record, and post puts data in the body of the request.

In an update request we need both an id to identify a specific record and updated data in the body to tell the database what to update.

To create the endpoint, Express has methods that correspond to the verbs we need, and since we are using the PUT verb, we use the put method. 

Not that in the URL we pass the id of the record to update, a toy resource:

```
server.put('/toys/:id', (req, res) => { })
```

Just like we did for the post endpoint, we want to take the toy information from the request body:

```
const toyInfo = req.body
```

We also want to grab the object id from the params object of the request:

```
const { id } = req.params;
```

### Connecting to the database

Next we are going to use our existing db object (that we use to make database connections)  and call its predefined update() method. This method takes as arguments the id and the data needed to update the record stored in toyInfo.

The update() method, like all other db methods, returns a Promise, so we can add the then and catch method at the end of it.

If the update was successful, update() will send back the updated toy.

Similar to what we did for the delete endpoint, we want to make sure updatedToy exists using a conditional statement inside then().

If updatedToy is undefined, it probably means that the database has not found a record with that id. In this case we send back a 404 error and a message, so the API caller knows they can try another id.  

If updatedToy is present, that's a signal that the update operation was successful so we can send back the updated item with a status code of 200.

### Handling failures

Finally, we handle a permanent failure in the catch method, by sending back a 500 error.

Here's the code we have written so far:

```
server.put('/toys/:id', (req, res) => {
  const toyInfo = req.body
  const { id } = req.params;

  db.update(id, toyInfo)
    .then(updatedToy => {
      if (updatedToy) {
        res.status(200).json({ updatedToy });
      } else {
        res.status(404).json({message: "Not found"})
      }
    })
    .catch(err => {
      res.status(500).json({ err })
    })
})
```

If we now connect to the endpoint with a REST client like Insomnia, and pass new data for an existing record, we should be able to update it successfully.

### Are you up for some practice?

Previously we have seen how to implement an endpoint for getting all database records. Now try and see if you can implement an endpoint to get only one record.
It's similar to getting all the records, but you need to pass in the id of the specific record you want to retrieve.

To communicate with the database, you can use the db.findById() method, which takes a toy id as a parameter.

---

Did you like this article?  Share it with your friends. 

I write daily about front-end and back-end web technologies. 
You can receive all my articles in your inbox by subscribing to my newsletter. Just click the button below. No spam, just good, useful content. Guaranteed!

Follow me on Twitter
https://twitter.com/CesareFerrari
