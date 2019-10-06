# Using the Route render prop in React
## How to pass props down to a rendered component via Route

In previous articles we have seen how to use Route to render different views in our application.

The way Route works is pretty straightforward: we simply specify a component to render when our browser hits a particular URL.

For example, a route can specify a path of '/books' to render a Books component. Or it can specify a path of '/books/treasure-island' that renders the TreasureIsland component.

Now, let's say we have an App component that keeps a list of books on its own state. 

```
class App extends React.Component {
  state = {
    books
  }
}
```
We want App to display the books using a component called Books, so we need to pass the books array down from App to Books.

We start by creating a route in App that looks like this: 

```
<Route path="/books" component={Books} />
```

This will render the component Books, but how do we pass the list of books down to the Books component so books can be displayed on the page?
Well, we can't do it using the syntax we have just seen, but Route gives us another option.

The other option is to use the render prop of Route, in place of the component prop.
Using Route with the render prop looks like this:

```
<Route path="/store" render={() => <Books />} />
```

The render prop takes a function (an arrow function) that returns a component, in this case the Books component.

Since the function returns a component, in the function body we can pass props to this component like we do normally. We just need to make sure the props object is available to the function body, so we need to pass it in as an argument to the anonymous function passed to render.

So, that's how we solve our original problem. We can pass the books array to the
Books component in this way:

```
<Route path="/store" render={(props) => <Books books={this.state.books} />} />
```

Now the Books component has a prop called books that holds the list of books from the App state and can display those books.

Yeah, problem solved!
But what about the Route props?

Route props

As it turns out, the Route component defines its own props.
These props are called history, match and location. They are used as help in navigating our application and they can be passed down to components as well.

We will look at these props in more detail in future articles, but for now let's see how we can pass these down to our Books component because it may need them in the future.

We can use the spread operator to pass down those props in a simple way like so:

```
<Route
  path="/store"
  render={(props) => <Books {...props} books={this.state.books} />}
/>
```

Did you notice the syntax {...props} inside the Books component?

That's how we pass all the props set by Route down to the Books component. This syntax uses the spread operator as a shortcut to listing all the Route props manually.

And there you have it, how to pass props down to rendered components via Route.
