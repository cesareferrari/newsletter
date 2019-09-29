# How to use componentDidUpdate in React
## Update components based on comparison of previous and current state

https://unsplash.com/photos/miWGZ02CLKI

We have seen how the componentDidMount() method is called on class components immediately after the component is mounted in the application and rendered.

componentDidMount() is part of the React component lifecycle methods, methods that get called automatically by the React system at specific points in the life of a component.

Another such methods is componentDidUpdate().
componendDidUpdate() is called after componentDidMount() and can be useful to perform some action when the state changes.

componentDidUpdate() takes as its first two arguments the previous props and the previous state.

Inside the method we can check if a condition is met and perform an action based on it.

For example, in the code below we check if the previous state and the current state are different. If they are, the console log statement will be run.

```
componentDidUpdate(prevProps, prevState) {
  if (prevState.pokemons !== this.state.pokemons) {
    console.log('pokemons state has changed.')
  }
}
```

Be careful when you call setState() inside componentDidUpdate().

If you don't call setState() inside an if condition you will trigger an infinite loop because setState() would be called recursively every time componentDidUpdate() is called.

When do we use componentDidUpdate()?

An example of when to use componentDidUpdate() is when we need to call an external API on condition that the previous state and the current state have changed.
The call to the API would be conditional to the state being changed. If there is no state change, no API is called.

Like mentioned before, to avoid an infinite loop, the API call needs to be
inside a conditional statement.

If you like this article and want to receive more in your inbox, just click the button below to sign up for a free subscription.
