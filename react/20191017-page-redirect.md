We have seen how to add an item to a remote collection in React using the Axios
library.
Axios makes a post request to the remote API and passes in the now item we
have created with our New Item form.

The API call is done in the background and we need a way to show the user that
the new item has been added correctly.

We have decided that a good way to do this is to show the page with the list of
all the items, including the new item we have just created.

In other words, we need a redirect to the ItemList component.

We normally redirect to a component by setting up a Route with the path that
corresponds to this component and use the history object of Route to add the
path to the end of the history array, so the browser follows the redirection and
displays the destination component we want.

In our case, though, the function that adds the new item is defined in App.js.
While the App component import the React router and defines routes it's not
itself wrapped inside a Route, so it doesn't have access to properties defined
on Route, like match, location and history.

We need to find a way to wrap App inside a Route.
React router gives us a way via a higher order component called withRouter

withRouter takes a component as an argument and returns the same component
wrapped inside a Route.
To use withRouter we need to import inside our file:

```
import { withRouter } from 'react-router-dom';
```

Now that we have the higher order component we can use to wrap App inside of it.
After we have defined App we can create a new variable called AppWithRouter and
we assign to it withRouter passing App as an argument in this way:


```
const AppWithRouter = withRouter(App);
```

Finally, at the end of the file, instead of exporting App as the default export,
we export AppWithRouter:

```
export default AppWithRouter;
```

Now our App component has access to the history object and we can use it inside
the addItem function to redirect to the list of items when the new item has been
added to the collection:

```
addItem = item => {
  axios.post("http://localhost:3333/items", item)
    .then(res => {
      this.setState({items: res.data});
      this.props.history.push("/items");  // <-- Add this line
    })
    .catch(err => console.log(err));
}
```



