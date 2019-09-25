# How to update one property in a list of items in React
## Toggle a boolean property from true to false and back

https://unsplash.com/photos/Q44xwiDIcns

Imagine we have a list of groceries and we want to mark groceries that are purchased with a different style. We want to be able to click on the <div> element that contains one grocery and apply a new CSS class to it.

In essence, what we want to do is toggle the state of the grocery item from non purchased to purchased.

Each grocery item has a property called purchased that is set to false by default. When we click on the item we want to set this property to true.

What we need is a new function called toggleItem() that performs this operation on each click:

- if item.purchased is false, set it to true
- if item.purchased is true, set it to false

toggleItem() needs to know which item to toggle, and in order to do that it
needs to know the item id. We pass the item id in the arguments to toggleItem().

Here's how we define the function on our class component:

```
toggleItem = itemId => {
  this.setState({
    groceries: this.state.groceries.map(item => {
      if (itemId === item.id) {
        return { ...item, purchased: !item.purchased }
      }
      return item;
    })
  });
}
```

Let's explain what the function does in detail.

To do any operation to the state we need to call the setState() function of the class instance.

setState() takes an object as an argument and merges it with the current state, in effect applying any changes to the current state.

setState() also re-renders the components that are affected by this state change, so they are displayed according to the new state.

In the new state object we use map() to create a new array from the current state array.

Inside the map() method we iterate through all grocery items and we check if the item id is the same as the id passed in the function  as the argument.

If the id is the same it means we have found the item to toggle, so we return an object that has all the existing item properties (using the spread operator) and we also update the purchased property to the opposite of the current value.

This code:

```
purchased: !item.purchased
```

takes the item.purchased value, which can be true or false, and returns the opposite. It then re-assigns the value to the purchased property.

If the id of the item we are iterating on is not the same as the id passed into the arguments, we don't perform any operation on the item and just return it unchanged.

That's how we toggle a property on an item in a list of items.

If you like this article and want to receive more in your inbox, just click the button below to sign up for a free subscription.
