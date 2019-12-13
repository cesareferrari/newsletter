# Updating a record with Knex in a REST API
## Using Knex to update a record in a database table

tagged_headline: Using Knex to update a record in a REST API #knex #database #api #webdev #backend



Now we know how to show records from a database table, how to post a new record and how to find a record with a specific ID.

In this article we will learn how to update an existing record.

This operation combines two operations we already did: find a record with a specific ID and post a new record.

In order to update one record, we need to find it first, and then post the updated data.
Updating a record uses the PUT HTTP verb in a REST API.

We will make database calls with Knex, like in the previous articles.

### Route helper

First things first. To handle a PUT request we need to use the .put() method of Express in our router, passing the ID of the desired record in the URL:

```
router.put('/:id', (req, res) => {

  // update record here

});
```

We then can get the record ID from the request params and save it in a variable with this code:

```
const {id} = req.params;
```

The updated data gets sent to our API in the request body, so we can save this also in its own variable named changes:

```
const changes = req.body;
```

Now that we have id and changes, we can use Knex to find the correct item by id (with syntax we have already seen) and attach a call to the .update() method of Knex.

The .update() method takes the changes as its argument and behaves like the regular SQL UPDATE statement: it updates the record with the changes passed to it.  

It then returns the number of records changed. We save this number in a variable so we can confirm how many record were changed to the client:

```
const count = await db('posts').where({id}).update(changes);
```

Note that we use the await keyword because we need to wait until the database has processed our request and returned something before we run the rest of our code.

The next step is to check that we are actually getting back a count. If we do, it means the update has succeeded. We can then send a 200 status code back to the client and a message with the number of updated records:

```
if (count) {
  res.status(200).json({updated: count})
}
```

If count does not exist, we can assume that the database has not found the record with the ID we passed in, so we can send back a 404 "record not found" error:


```
if (count) {
  res.status(200).json({updated: count})
} else {
  res.status(404).json({message: "Record not found"})
}
```

Finally, we need to handle the case where the promise does not resolve because something went wrong with the request.
In the catch block we return a 500 status error, with a generic message:


```
catch (err) {
  res.status(500).json({message: "Error updating post", error: err})
}
```

Here's the full code for the PUT request:

```
router.put('/:id', async (req, res) => {
  const {id} = req.params;
  const changes = req.body;

  try {
    const count = await db('posts').where({id}).update(changes);
    if (count) {
      res.status(200).json({updated: count})
    } else {
      res.status(404).json({message: "Record not found"})
    }
  } catch (err) {
    res.status(500).json({message: "Error updating new post", error: err})
  }

});
```

And here's the result of updating a record in Insomnia:

[image: insomina-put-record.png]
