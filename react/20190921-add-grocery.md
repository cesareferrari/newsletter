# How to add a new item to a list in React
## Submit a form and update the application state

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20190921-add-grocery.jpeg

If you read the previous articles, you know that at this point in our grocery list application we have a form with an input field and a button.
What we enter in the input field, a grocery item name, is saved in the application state, ready to be added to the array of grocery items already present.
How do we add a new item to the array? We do it with the `addGrocery()` method.
Let's add the `addGrocery()` method to our class:

```
addGrocery = event => {
  // code to add grocery item here
}
```

When we enter a name in the input field and press the `Add` button, the first thing that happens is the browser reloads the page. This is the default action a browser takes after submitting a form.

We don't want this behavior, though, we would rather have the list be updated without page refresh, so we use `preventDefault()` to stop the browser from reloading the page:

```
`addGrocery` = event => {
  event.preventDefault();
}
```

The next thing we want to do is update the state of the application because we are adding something to it.
We update the state with the `setState()` function and we pass into `setState()` a new state object that merges what is currently in the state and the new thing we are adding.

So, we first define a `newGrocery` variable and assign to its `name` property the value of `state.name`.
This is the value that is updated by the `changeHandler()` function that takes its value from the input field.
We then call `setState()` passing this new object and add the new grocery item to the state.

```
let newGrocery = {
  name: this.state.name
}

this.setState(
  { groceries: [...this.state.groceries, newGrocery] }
)
```

Notice that in React we need to keep the state object immutable, so instead of updating the current state object we set groceries to a new array. We then add the current state to this new array using the spread (`...`) operator, and finally append the new grocery item at the end of the array.
So, the state gets a brand new array, populated with the current groceries and the new grocery we are adding.

If we now add a new grocery in our web page and submit the form, the new grocery object is added to the end of the array and displayed in the page.