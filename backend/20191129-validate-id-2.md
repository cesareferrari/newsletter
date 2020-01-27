# Validate an id with Express middleware, part 2
## Run middleware methods as callbacks

tagged_headline: Run middleware methods as callbacks in Express.js #nodejs #expressjs #middleware #backend #webdev #javascript #fullstack

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191129-validate-id-2.jpeg


In the previous article, we saw how to create a `validateId` middleware method that checks if a record exists in a database.

If the record is not found, `validateId` sends a response back to the client with a `404` error, and no further processing occurs.

If the record is found, though, the method saves the record, as a Javascript object, inside the `request` object. It then sends the request further down the line to be processed by other methods in the chain that require the found record.

We have defined `validateId` and called it at the beginning of the file, with `server.use(validateId)`, so it's available to successive methods.

### One possible problem

One problem we have with this approach is that `validateId` will be run for *all* methods defined after it, but successive methods may not actually need any found record for their purposes, so they don't need to validate an id.

For example, we have one method, later in our chain, that displays *all* the toys and doesn't require any specific toy `id`. Since this method doesn't need an `id`, the field is not present in the `URL`:

```js
server.get('/toys', (req, res) => {...})  // no :id
```

Since `validateId` is higher in the methods chain, the '`/toys`' request gets to it before it has a chance to trigger `server.get('/toys')`.

The id field is missing from '`/toys`', so `validateId` stops processing the request and returns an error. `server.get('/toys')` never even sees this request.

### Solving the problem

To solve this problem, we need a way to pick and choose which middleware method gets a chance to run `validateId` and which one skips it.

As it turns out, like many other things with Express, the solution to this problem is pretty easy. We can add an *additional* argument to the `server.get()` method, after the `URL` argument, that takes a callback middleware function. This function is processed before the code inside the method is called.

So, we simply add `validateId` as the second parameter to `server.get()`. `validateId` will run and make a database call, save the returned record in the request and provide it to `server.get()` for further processing.

```js
server.get('/:id', validateId, (req, res) => {
  res.status(200).json(req.toy);
});
```

Since `validateId`, already performs a check to see if a record is present, `server.get()` won't need to do any database call or error handling. Its only responsibility is to return the object found, which is already saved into the `request` object.

This way of handling middleware methods lets us add the `validateId` function only to the methods that need it, so we don't need to call `server.use(validateId)` at the top anymore.

This means that other methods down the line won't be affected by the result of running `validateId` unnecessarily.


