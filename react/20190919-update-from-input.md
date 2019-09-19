# Updating component state in React
## How to update class component state from an input field


Sometimes we need to update the state of a component with the value entered into an input field. 

An use case would be this: 

We have a list of groceries displayed in a view and we need a way to add a new entry in the grocery list.

So, we have a form field where the user can type in the grocery name and when the user hits the enter key, the new grocery name is added to the existing list.

To do this operation in React we need to update the component state every single time the user enters something in the form field. In turn we need to update the input field at every keystroke to reflect what the content of the state is so far.

This article explains how to set up the component and the input field to achieve this result.

First, let's create the input field in our component:

```
<form>
  <input
    type="text"
    name="name"
    value={this.state.name}
    placeholder="Enter grocery"
  />
</form>
```

Note that we set the input type to text, so it will be displayed as a text field by the browser. We also add a name attribute with the value of name and a placeholder text. 

We set the value attribute to the value of the name property in the component state. Let's add the state to our component now:

```
class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      name: ''
    }
  }
}
```

As you can see, we set the component state to an object with one property, name, that is initialized to an empty string.
This value will be displayed inside the form field, which will start out as empty.

When the user starts typing inside the form field we want to update the state of our component so the letters typed inside the field are saved in the state.

In order to do this, we need to listen for changes in the input field and call a function that updates the state each time a key is pressed.

Input fields have an onChange event listener that gets triggered every time the field changes. We will use this event listener to update the state.

Let's add the event listener to the input field:

```
<input
  type="text"
  name="name"
  value={this.state.name}
  placeholder="Enter grocery"
  onChange={this.changeHandler}  // add event listener
/>
```

The onChange event listener calls the changeHandler() function (that we haven't defined yet) every time the form field changes.

Now we have to define changeHandler() in our component:

```
changeHandler = event => {
  this.setState({ name: event.target.value });
}
```

The changeHandler() function is defined inside the class component. It takes an event object as an argument.
The event object is passed to the function by our event listener.

The changeHandler() function then calls setState() to update the state name property to the current value of the form field.

The event object that is passed in the function has a target property that references the form field. The form field has a value, and the value is whatever the user typed in so far.

So, we use this value in event.target.value to update our name property in the state.

At this point, every time the user types something in the form field, the state is updated and the form field is also updated with the current value of the state name property.

We still need to update our grocery list with the name entered, though. I will show how to do this in tomorrow's article.

