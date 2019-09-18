# React







---

# Updating state in a class component

Add form:

```
          <input
            type="text"
            value=""
            placeholder="name"
            name="name"
            onChange={this.changeHandler}
          />
```
We add an onChange event handler and we set it to this.changeHandler.

changeHandler is a function that is defined in the class in this way:

onChange will pass the event to the changeHandler function, and we capture it in
the e argument.
onChange is a synthetic event used by React. It's not a regular Javascript event
handler.


```
  changeHandler = e => {
    console.log(e); // prints out the Syntetic event generated when input changes
    console.log(e.target); // prints out the event target, which is the input field.
    console.log(e.target.value);
  }
```

For now we only print out in the console the syntetic event that's generated
when something changes in the input field and the target.

If you type in a letter and look at the console, you can see the event being
printed out.
You also see that the target is the input field itself.

The input field has a value property and it's accessible by e.target.value
The value is what we type in.


```
changeHandler = e => {
  this.setState({ name: e.target.value });
}
```
The value is important because we want to capture the value and update the state
with it.
Our input field has a property on it named name and we need to capture the state
of this property, that is the data that is passed in.

In order to do that, we need to initialize the name value in our state in the
constructor function of out class component:


```
    this.state = {
      students,
      name: ''
    }
```

We also need to update the name property of our input field with the state.name
property. We just assign this.state.name to the value property like so:

```
  <input
    type="text"
    value={this.state.name}  // update the value from the state
    placeholder="name"
    name="name"
    onChange={this.changeHandler}
  />
```

When we call setState() we update the value of the state and also trigger a
re-render of the application.

Now if we look at the console while typing in the input field we can see that
our state is updated and the input field reflects those changes.
Each letter typed into the field is added to the state incrementally and the field gets updated because of the React re-render triggered by setState().


Now that we have the input field update itself, we need to submit the form and
add a new student. To submit the form we add a button:

```
  <button>Add Student</button>
```

If we press the button now, nothing happens. Actually something happens and it's
that the page gets refreshed. This is because the default behavior of a web
browser after clicking a button is to refresh the page.

We don't really want this to happen, though. We want to be able to add a student
without refreshing the whole page. So, what we need to do is capture the event
generated when the button is pressed, we want to avoid the default action to
happen, and we want to add a student with the name we have entered into the
input field.

To do this we need an event handler on the button, the same way we added an
event handler on the input field.

We call this event handler addStudentHandler and we add it to the onClick
property of the button, because we are capturing the click event.

```
<button onClick={this.addStudentHandler}>Add Student</button>
```
Now we need to add a new addStudentHandler() function to the class.
The first thing we want to do is prevent the default action of refreshing the
page. To do this we take the event that's generated on click and prevent its
default behavior by calling preventDefault on it.

```
addStudentHandler = event => {
  event.preventDefault();
}
```

The next thing we want to do is update the state of the application because we
are adding something to it.
We update the state with the setState() function and we pass into setState a new
state object that merges what is currently in the state and the new thing we are
adding.

So, we first define a newStudent and assign to its name the value of state.name.
This is the value that is updated by the changeHandler function that takes its
value from the input field.

We then call setState and add the new student to the state.

```
  let newStudent = {
    name: this.state.name
  }

  this.setState(
    {
      students: [...this.state.students, newStudent]
    }
  )
```

Notice that we need to keep the state object immutable, so instead of updating
the current state object we create a new array, add the current state to it and
add the new student.

We use the spread operator (...) to add all the elements in the current students
array to the new state object and we add the new student to the end of the
array.

So, the state gets a brand new array, populated with the current students and
the new student we are adding.

If we now add a new student name and submit the form, the new student object is
added to the end of the array and displayed in the page.

We need to add more input fields to update other properties of the student, like
age, bestIn, and so on.
Let's add the input for age:

```
  <input
    type="text"
    value={this.state.age}
    placeholder="age"
    name="age"
    onChange={this.changeHandler}
  />
```
At this point we encounter a couple of problems. 
One problem is that we don't have the age property on the state yet, so we add
it.

The second problem is that when we change the value in the age input field, we
are calling the same changeHandler function we call when we update the name
input field.

```
  changeHandler = event => {
    this.setState({ name: event.target.value });
  }

```

The changeHandler function changes the state, but the new state has the 
event target value update only the name property of the student.
But we need to update the age, so we need to find a different way to do it.

The way we do it is instead of hardcoding those properties we use the event
target property corresponding to what we want to update.

In our case, the input field has a property called name, that is unique for each
input. We can capture the value of this property in event.target.name and use
this to name our state property to update.

In order to evaluate the target name, we need to enclose the expression in
square brackets.


```
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
```

With this change, the changeHandler function is able to update the state
correctly by updating either state.name or state.age as appropriate.

At this point we can add the rest of the inputs. We also need to update the
addStudentHandler function to add the additional properties and the state of the
class with all the properties required.




## Break the component into its own StudentForm component

The Students components is doing too much at the moment. It keeps the state of
the application, it displays a list of students and it dispays a form to add a
student.

We want to remove the form from Students component and put it into its own
StudentForm component.

In place of the form, we add the new component in Students, after having
imported it..

```
import StudentForm from './StudentForm';

// ...

<StudentForm />
```

This will give an error, since we don't have state in StudentForm. The state is
in Students. So, we need to pass the state from Students to its child component
StudentForm.

Not only the state, we also need to pass the functions that we have defined to
handle the form updates.

```
<StudentForm
  addStudentHandler={this.addStudentHandler}
  changeHandler={this.changeHandler}
  name={this.state.name}
  age={this.state.age}
  photoUrl={this.state.photoUrl}
  bestIn={this.state.bestIn}
/>
```

This state and functions are passed to the StudentForm components as props, so
in the form component we have to reference them as prop.

```
<form>
  <input 
    type="text"
    name="name"
    placeholder="Name"
    value={props.name}
    onChange={props.changeHandler}
  />
```

Once all these changes are made, our application should work again like before,
we should be able to add a new student.






[ Video class components, min: 1:30:00 ]
