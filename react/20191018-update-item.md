# Updating an item with React
## How to make a PUT request to a remote server with Axios


In previous articles we have seen how to retrieve items for our React application from a remote server with Axios.
We also saw how to add a new item to the remote collection.

How about updating an item?

Updating an item requires a series of operations:

retrieving the item to update,

loading a form pre-populated with the item details

sending the item back with changes

displaying the updated item

There are many ways to handle this situation, some simple, some more complex.
To keep it simple, we will use an Edit form to display the item to update and we'll invoke a function called updateItem that actually updates the item through an Axios call.

In our application we have a page that displays an item. Let's add a button at the bottom of this page. Clicking on the button loads the Edit form component.

```
<Button onClick={this.editItem}>Edit item</Button>
```

The <Button> component is a ReactStrap component and we add an onClick event handler that is set to run the editItem function defined in the ItemPage component that's displaying the button.

editItem looks like this:

```
editItem = event => {
  event.preventDefault();
  this.props.history.push(`/items/${this.state.id}/edit`);
}
```

All editItem does is prevent default and add an element to the Route history object so the browser can redirect to the URL we use for editing.

The code above uses string interpolation to print out the item id that's needed by the URL.

This page component already has a state object with all the item details, so all we have to do is grab the id and put it into the path with `this.state.id`.

We defined a URL that handles edits, but we still don't have a route for it, so we can create one in App.js

```
<Route
  exact
  path="/items/:id/edit"
  render={props => <ItemEditForm {...props} updateItem={this.updateItem} />}
/>
```

This route renders the ItemEditForm component which displays the actual edit form.

In this Route props we also pass down the updateItem function. This function is defined in App.js and is responsible for handling the call to Axios for the update.

While we are in the App component, let's define this function:

```
updateItem = item => {
  axios.put(`http://localhost:3333/items/${item.id}`, item)
    .then(res => {
      this.setState({items: res.data});
      this.props.history.push('/items');
    })
    .catch(err => console.log(err));
}
```

We know from the API documentation that updating an item requires a PUT call to localhost:3333/items passing the item id in the URL params.
The item id is necessary so the API can find the item to update.

Axios has a put() method that handles this operation for us.

In addition to passing the correct URL, we also need to pass the actual item object with changes. This is passed as the second parameter of axios.put()

If everything goes well, the Axios call will return back to us an array with all the items, including the updated item. We only have to update our state with setState to reflect these changes.

Next, we need to create the Edit form so we can make changes to the items. We will look at the form in tomorrow's article.

---

I write daily about web development. If you like this article, feel free to share it with your friends and colleagues. 

You can receive articles like this in your inbox by subscribing to this newsletter. Just click the button below to sign up for a free subscription.