# How to display error messages in a React application
## API calls may return errors, learn how to deal with them

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191012-error-message.jpeg

In React we often have to work with external APIs. We typically grab data from a remote server and we display it in our application.

We saw that one very popular library for making `http` requests to remote servers is *Axios*. Axios lets us use methods like `get()`, `post()`, and others that call the corresponding `http` methods that deal with getting, posting, updating and deleting data from an API.

One good place where we want to put Axios calls is inside the `componentDidMount()` function of our class components.
`componentDidMount()` gets called by React automatically when the component mounts in our application. If we place the call to Axios in there, it will be called at the appropriate moment and the data retrieved will be available to the component state, ready to be displayed.

### Possible API errors

Not all calls to external APIs are successful, though. In fact, it's very possible that a remote server is down or some other blockage prevents the data we are looking for to be accessed.

In these cases, Axios will return an error. It's common practice to notify the user that an error has occurred by triggering some kind of notification like displaying an error message in our web page.

### How do we display error messages?

Let's say we want to display an error message at the top of our view when something bad happens. In order to display the message we need to have the message sitting ready in our component `state`.
Let's add an `errorMessage` property to our state object with the value of an empty string as the initial state.

```
state = {
  items: [],
  errorMessage: ''
}
```

We place our Axios call inside `componentDidMount()` and when the call is successful, we set the `state` to the value returned in the API response.

```
componentDidMount() {
  axios.get('http://localhost:3333/items')
    .then(response => this.setState({items: response.data}))
    .catch(err => { console.log(err) })
}
```

But when there is an *error*, the data won't be available inside `then()`, and the `catch()` method will be called instead. The error object returned by the API will be passed in there.
At this point, what we need to do is grab the error and update the `errorMessage` property in our state using `setState()`.

In the code below, I show this operation. In the catch branch I call `setState()` with an object that updates `errorMessage` with whatever error is returned by the API.

```
componentDidMount() {
  axios.get('http://localhost:3333/items')
    .then(response => this.setState({items: response.data}))
    .catch(err => { 
      this.setState({errorMessage: err.message});
    })
}
```

Now that we have the error in our state all we have to do is display it at the
top of our web page. How do we do that?

### Display the error

There are many ways to do it but we like to create a conditional statement to
display the error. The conditional statement basically needs to say:

"if we have an errorMessage on the state, display an `h3` element with the `errorMessage` value. However, if `errorMessage` is empty, don't display anything."

To translate this *if condition* into code we could use a plain old `if` statement, but we can also use a fancy way of doing it.

We use the shortcut operator `&&`.

The `&&` operator is placed in the middle of a statement.

- It first evaluates the left side of the statement.
- If the left side is true, then the right side of the statement is executed.
- If the left side is not true, `&&` will not do anything with the right side.

In the code below we use the `&&` operator to display the error message only if the `errorMessage` property on the state is not empty:

```
{ this.state.errorMessage &&
  <h3 className="error"> { this.state.errorMessage } </h3> }
```

This is saying: if `this.state.errorMessage` is `true`, display the error message.

Remember, we need to enclose this statement in *brackets* because we are writing Javascript code inside `JSX`.

### In summary

- API calls to external resources can get stuck and return errors instead of the expected data.
- In this case we catch the error and we display it in our application, so the user knows something went wrong.
- We display the error using a conditional statement that shows the error only if it exists.

As you can see, it's very easy to write code that display error messages inside our React application.

I write daily about web development. If you like this article, feel free to share it with your friends and colleagues.

You can receive articles like this in your inbox by subscribing to this newsletter. Just click the button below to sign up for a free subscription.