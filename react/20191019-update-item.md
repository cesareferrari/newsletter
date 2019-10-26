# Create a form for updating a remote item with React
## How to use Axios to submit a PUT request


In yesterday's article we saw how to initiate an Axios call to update an item in a remote collection.
We used a PUT request to connect to the external API. The API can then find the item to update and apply the changes that were passed to it in an item object.

In order to make changes, though, we need a web form pre-populated with the item data, so we can update the data.

We open the edit form with a button in the item display page:

```
<Button onClick={this.editItem}>Edit item</Button>
```

The onClick prop calls editItem that loads the Edit form in the browser. Let's see what this form looks like.

Edit form

The edit form is a class component called ItemEditForm. We use a class component in this case because we need to keep track of its own state.  In particular, we need to keep track of changes made to the form fields.

```
class ItemEditForm extends React.Component {
  state = {
    item: {
      name: '',
      description: '',
      imageUrl: '',
      price: '',
      shipping: ''
    }
  }
```

Since we have to pre-populate the form with the existing data we need to grab the current item that is being edited.

We do that in the componentDidMount function of ItemEditForm.

When we access this form component, we pass the id of the current item in the URL, so in componentDidMount we can extract the URL from the path and use it in an Axios call that retrieves the item.

The item id is available to us in `this.props.match.params.id` and we use it to construct the URL for the GET request that finds the item by id.

```
componentDidMount = () => {
  axios.get(`http://localhost:3333/itemById/${this.props.match.params.id}`)
    .then(res => {
      this.setState({item: res.data});
    })
    .catch(err => console.log(err))
}
```

After finding the item, in componentDidMount we set the component state to the item found.

The actual form is similar to the new item form we have seen in a previous article. It's a series of input fields that take their value from the state.
We can change these values by editing the form and when we submit it the original item will be updated.

Here's an example of the form that just displays the Item name field. The other fields are similar to this one.

```
<form onSubmit={this.handleSubmit}>

  <input
  type="text"
  name="name"
  value={this.state.item.name}
  placeholder="Name"
  onChange={this.handleChange}
  />

  // ...

</form>
```

The handleChange function that updates the form fields is also similar to the one in  New Item form that we have already seen, here it is again for reference:

```
handleChange = e => {
  e.persist();

  this.setState(prevState => ({
    item: { ...prevState.item,  [e.target.name]: e.target.value }
  }))
}
```

Once we submit the form, the handleSubmit function is called. We discussed this function in yesterday's article, so take a look at that article again if you need to refresh your memory.

This closes the loop for our Edit functionality. We have a button that displays an Edit form for an item, we can make changes to the data and update the item in the remote collection.


