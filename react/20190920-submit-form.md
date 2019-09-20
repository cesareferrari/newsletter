# Add and item to a list in React
## How to add an item based on user input


In a previous article we learned how to add an input field to a React class component and how to update the state of the component with the value entered in the input field.

Now that we have the value saved in the state we can use it to add a new item to the list of groceries that the component displays.

The user will fill out the grocery item name, press the Return key and the grocery item will be added to the existing list of groceries.

To perform this operation, we could add a button to submit the form, but in this example we take advantage of the default browser behavior of submitting a form automatically when the Return key is pressed.

To take advantage of this behavior we need to add an event listener to the form.
The event listener is called onSubmit and gets triggered when a form is submitted.

onSubmit calls the addGrocery() function that adds the grocery item to the list.
addGrocery() takes as a parameter the content of the name property on the state.
Remember, this property is set to the value of the input field. This is what the user entered.

```
<form onSubmit={e => {
  this.addGrocery(this.state.name);
}}>
```

The main purpose of addGrocery() is to take the name of the item and add it to the list.
But addGrocery() also needs to do a couple of other things.

The first thing it needs to do is to stop  refreshing the page.

When we submit the form by pressing Return, the browser performs a page refresh by default. We don't want this behavior. We would rather see the item added to the list directly, without a page refresh.

The second thing addGrocery() needs to do is clear out the input field from the grocery name that was typed in.

To prevent refreshing the page, we use the handy function preventDefault() of the event object. It simply prevents the browser to do the default action.

After adding the grocery item, we also clear out the state name property, so it's brought to its initial state of empty string.
Since the input field displays the value of state.name, it will display an empty string after adding a new item.

Here's the final code:

```
<form onSubmit={e => {
  e.preventDefault();
  this.addGrocery(this.state.name);
  this.setState({name: ''});
}}>
```

Tomorrow we will build the addGrocery() function and complete the functionality.
Stay tuned.



