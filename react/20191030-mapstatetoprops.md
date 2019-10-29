# Connecting a React component to the application state via props
## How to use the connect function to map state to props

We have already seen how to connect a React component to an action by using the connect function provided by the React Redux library.

For example, here's how we connect the turntitleGreen function to the Title component. We just call connect at the bottom of the Title component and pass turnTitleGreen inside the second argument to connect.


```
export default connect(
  () => {},
  { turnTitleGreen }
)(Title);
```

We mentioned that the first argument of connect is a function but we didn't say what it is for.
This function is for connecting the application state to the component props, so state will be available inside the component to be displayed.

For example, a Title component displays a title that is saved in the application state, in the reducer:

```
// reducers/index.js

const initialState = {
  title: "Title from the initial Redux store",
}
```

This title needs to be displayed inside the component somehow. By connecting the component to the state via the connect function, we are able to display the state by using the component props like this:

```
<h1
  {this.props.title}
</h1>
```

The connect function first argument is a function that takes the state and returns an object that maps the state to the component props.

This function is often called mapStateToProps to indicate what it does (it maps
state to props).

Here's how we define it:

```
const mapStateToProps = state => {
  return {
    title: state.title
  }
}
```

The React system will just pass the application state to it and inside the function we return an object that maps properties in the state to properties in the component.

In our case, the state has a property called title that holds the component title. We map title to state.title so we can use this.props.title inside our component to display the title.

When we are done mapping all our properties to the state, we pass the mapStateToProp function to our connect function at the bottom of the Title component like this:

```
export default connect(
  mapStateToProps,
  { turnTitleGreen }
)(Title);
```

This way the component has full access to the state and the actions that modify the state.

---

Did you like this article?  Share it with your friends. 

I write daily about front-end and back-end web technologies. 
You can receive all my articles in your inbox by subscribing to my newsletter. Just click the button below. No spam, just good, useful content. Guaranteed!

Follow me on Twitter
https://twitter.com/CesareFerrari
