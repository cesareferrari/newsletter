# Update state from multiple input fields
## How to write a function that updates state from multiple fields in a React form

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20190923-multiple-input.jpeg


We have already seen how to update state from a form input field.
As a quick recap: we have a Student component with this initial state:

```
class Student extends React.Component {
  this.state = {
    name: ''
  }
}
```

And we have a text input field so we can enter the name:

```
<input
  type="text"
  name="name"  // the student name
  value={this.state.name}
  onChange={this.changeHandler}
/>
```

When we type in a name in our input, a `changeHandler()` function is called that updates state for this field:

```
changeHandler = event => {
  this.setState({ name: event.target.value });  // updates student name
}
```

So far, so good.
What if we want to add another field to set the student age?

First we need to initialize `age` in the state:

```
class Student extends React.Component {
  this.state = {
    name: '',
    age: ''
  }
}
```

And then we add a text field for `age`:

```
<input
  type="text"
  name="age"  // the student age
  value={this.state.age}
  onChange={this.changeHandler}
/>
```

If we try our form now, it won't update the state correctly because our `changeHandler()` function is hardcoded to only use the `name` input field and update the `name` property of the state.
We need to make our function more *generic* so it can handle an unlimited number of input fields with unique names.

Our input fields have a property called `name` that is set to *name* and *age* respectively for each field.
The value of this `name` property is captured in `event.target.name`. We can use this value to update the corresponding property in the state like so:

```
changeHandler = event => {
  this.setState({ [event.target.name]: event.target.value });
}
```

In order to evaluate the target name on the left side of the colon in the state object, we need to enclose the expression in square brackets.
This expression will evaluate to `name` or `age` depending on which field we are updating, and will in turn update the `state` object correctly.