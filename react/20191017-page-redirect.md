# React component redirection
## How to redirect to a different component after submitting a form in React

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191017-page-redirect.jpeg



We have seen how easy it is to add new items to a remote collection in React using the Axios library.
Axios makes a post request to the remote API and passes in the new item we have created with our *New Item* form.

The API call is done in the background and we need a way to give feedback to the user that the new item has been added correctly.
We have decided that a good way to do this is to redirect to the page that lists all the items, including the new item we have just created.

This means we need a redirection to the `ItemList` component.

### Page redirection

We normally redirect to a component by setting up a Route and set the path prop to the URL that displays the corresponding component.
We use the `history` object of Route to programmatically add the path to the `history` array, so the browser redirects automatically to it.

In our case, though, the function that adds the new item is defined in `App.js`.
While the `App` component does import React router and defines routes for its children components, it's not itself wrapped inside a Route, so it doesn't have access to properties defined on Route, like `match`, `location`, and `history`.
We need to find a way to wrap `App` inside a `Route`.

React router gives us a way via a *higher order component* called `withRouter`.
If you remember from a previous article, higher order components, or `HOC`, take a component as an argument, add some extra functionality to it, and return the modified component.

`withRouter` does this exact thing by wrapping a component inside a `Route`.
To use `withRouter` we need to first import it inside our file:

```js
import { withRouter } from 'react-router-dom';
```

Now that `withRouter` is available, we can use it to wrap `App` inside of it.
At the bottom of the file, below the definition of `App`, we create a new variable called `AppWithRouter` and we assign `withRouter` to it, passing `App` as an argument in this way:

```js
const AppWithRouter = withRouter(App);
```

Finally, at the end of the file, instead of exporting `App` as the default exported object, we export `AppWithRouter` instead:

```js
export default AppWithRouter;
```

Now our `App` component has access to the history object and we can use it inside the `addItem` function to redirect to the list of items when the new item has been added to the collection by adding this code:

```js
this.props.history.push("/items"); 
```

Here's the complete `addItem` function, with the redirect:

```js
addItem = item => {
  axios.post("http://localhost:3333/items", item)
    .then(res => {
      this.setState({items: res.data});
      this.props.history.push("/items");
    })
    .catch(err => console.log(err));
}
```

### In summary:

- We have seen how to add a new item to a remote collection by using Axios

- We have seen how to wrap the `App` component inside a `Route`, so the component has access to methods like `match`, `history` and `location` that facilitate navigation

We have created a redirect in our application after a form is submitted successfully.


Previous articles in this series are here:

1. [Add a new item to a collection with Axios](https://cesare.substack.com/p/add-a-new-item-to-a-collection-with)

2. [Handling input field updates in React](https://cesare.substack.com/p/handling-input-field-updates-in-react)

3. [Adding an item to a remote collection in React](https://cesare.substack.com/p/adding-an-item-to-a-remote-collection)

---

*I write daily about web development. If you like this article, feel free to share it with your friends and colleagues.*

*You can receive articles like this in your inbox by [subscribing to my newsletter](https://cesare.substack.com).* 
