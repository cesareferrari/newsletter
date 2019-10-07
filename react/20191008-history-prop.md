# The history prop in Route
## How to programmatically navigate a React app

We have previously talked how Route defines some props that can be passed down to components.

Here's an example.
Route passes its props down to the Books component by using the spread operator:

```
<Route
  path="/books"
  render={(props) => <Books {...props} />}
/>
```

The props defined by Route are history, match and location. They are used in different situations. Let's look briefly at the history prop.

The history prop

Route defines a history prop that helps us navigate programmatically between pages. 


The history prop has a similar function as the history object in the browser. It facilitates navigation between pages and remembers the URLs we have visited earlier.

history is similar to an array that we can modify by adding or removing items from it.

An example

An example of how we use the history prop in Route is when we have a button and we want to move to another URL by pressing the button. In this case we want to move to the store page.

```
<button>Go to the store</button>
```

Right now the button is not doing anything. To make the button work we need to add an onClick event to it. The onClick event will listen for a click on the button and perform some action as a result of it.


```
<button onClick={goToStore}>Shop now</button>
```

Now we have added an onClick event to the button and assigned a function to this event. The function name is gotoStore.

Let's actually write the function:

```
const goToStore = event => {
  event.preventDefault();
  props.history.push('/store')
}
```

goToStore receives the click event as an argument, and the first thing we do in our function should be to prevent the default browser action of reloading a page when a button is clicked. We do this with event.preventDefault()

With that out of the way we then do something with the history property that lives on the props object.

Remember when we said that the history property is similar to an array where you can add or remove items? Here we use the .push() method of the history property to add a URL to the history.

We add the '/store' URL to the end of the history. This will activate the route that handles this URL and will effectively take us to the store page.

So, to summarize:

Route defines some props that can be passed down to components
The history prop of Route is used to programmatically facilitate navigation
history is similar to an array that keeps a list of location visited
We can add a new location to the history prop by using the push() method

---

I write daily about web development. If you like this article, feel free to share it with your friends and colleagues. 

You can receive articles like this in your inbox by subscribing to this newsletter. Just click the button below to sign up for a free subscription.


