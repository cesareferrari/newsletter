# React lifecycle methods
## How to use componentDidMount() in React

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20190929-lifecycle-methods.jpeg



React lets us create either functional components or class components.
Functional components are just functions, while class components are instances of a class.

Since class components extend `React.Component` they automatically inherit methods defined in React for us.
Some of these methods are called *component lifecycle* methods because they are invoked by React at certain points in time in the life of a component.

In the class components that we define we can override these default methods with our own version so we can add functionalities that come into play at a specific point in the life of our component.

One of such methods is `componentDidMount()` which is called automatically after the component has been rendered on the page.
`componentDidMount()` can't be placed inside a functional component because a functional component only renders `JSX` and does little else.

We add `componentDidMount()` to a class component when we need to perform some operation immediately after the component was rendered on the page.
Here's how we define `componentDidMount()` into a class component:

```
class Pokemons extends React.Component {

  componentDidMount {
    // do something here
  }

}
```

Now that we have the method in our class, what are we going to do with it?

`componentDidMount()` is usually the place where we fetch data from an external data source, like an API or a database and update the state with that data.
Since we update the state with `setState()`, React will re-render the component with the new data displayed.

Here's an example.
Suppose the data comes into our application via an external `API` call and is placed into an array called `pokemonData`.
In the `Pokemons` constructor we initialize the state to an empty array, because we know `pokemonData` comes in as an array.

```
class Pokemons extends React.Component {
  constructor() {
    super();

    this.state = {
      pokemons: [] 
    }
  }
}
```

Next we define `componentDidMount()` as the place where we fetch the data and update the component state to include this new data that has just come in.

```
  componentDidMount() {

    // Fetch data from some external API and put it into pokemonData
    // then set the state to this new data:

    this.setState({pokemons: pokemonData})
  }
```

After `componentDidMount()` runs the `pokemons` property in our state is assigned the value of `pokemonData`.
The component is rendered and the new state is displayed in our component.

In a future article we'll see how to fetch data from an external API.

`componentDidMount()` is only one of several lifecycle methods available to us. We will look at other lifecycle methods in the coming days.

If you like this article and want to receive more in your inbox, just click the button below to sign up for a free subscription.