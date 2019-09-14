# React


## React components
## How to build functional components in React.

Components are the basic blocks of React. At their core, components are just Javascript functions or classes that have one thing in common, they all return JSX.

Of course there's more to that, and we will look at components in more detail later, but this is the main concept to remember at the moment.

As I said, components can be either Javascript function or classes. If a components is made out of a function it's called a functional component.

Let's see what a functional component looks like by creating one.

In the following code we create a button component. 
Note that the variable name used to initialize the component is capitalized. Component names need to be capitalized in React, or they won't work.

The variable is assigned a function, in this case an arrow function, that returns a <button> element with some text in it.

Note that we are using an arrow function but we could have used a regular function. The convention in React is to use arrow functions, though, so we will stick with the convention.

```
const BasicButton = () => {                  
  return(                                    
    <button>Click me, I'm a button</button>  
  )                                          
}                                            
```

Note that the <button> syntax resembles HTML, but it's actually JSX. We are writing JSX inside a Javascript file, and since we have imported React at the top of the file, the JSX is transpiled down to Javascript and HTML before it's passed to the browser, and it all works smoothly.

To use the component we have just created, we need to add it somewhere, but where?

If you remember, in a previous article I mentioned that create-react-app creates two directories inside our project, a public directory and a src directory.

The public directory has an index.html file that is the entry point of our application. The React application is mounted inside a div element inside this index.html file.

What is mounted inside the root element, is an App object, defined in the App.js file inside the src directory.
The App.js file looks like this:

```
function App() {
  return (
    <div className="App">
      <h1>Students</h1>
      <Students />
    </div>
  );
}
```

We can add our new BasicButton component inside the App component, and it will
be rendered in the page.

```
<div className="App">
  <h1>Students</h1>
  <Students />

  // Rendering the BasicButton component
  <BasicButton />

</div>
```
In this article we have seen how to create a functional component and how to
include it into our application.

There is another type of component, the class component, but before talking
about class components we need to talk about another important feature of React:
the way it manages state.


---



## React and state

React is a way to manage state in a complex application. Today's application
tend to become complex fast. In a React application we update the state and
React will update the display of the components, based on the updated state.

What is state?

The web was originally built as a way to link documents together. These
documents have state. For example, the text in a static html page is state. The
links in the same page, are also considered state.
In a static document, state is not updated, though. If you move to anohter
document you reload the whole page, so there is no need to update the existing
state.

In Web application, on the other hand, state changes based on user interaction.
If a user clicks a button or moves the mouse in the application, an event is
generated and this event may trigger a change of state. For example, a hidden
component may be revealed on mouse over. 
The job of React is to manage all these state updates that occur in modern web
applications.

React also helps create a separation between front end and back end of an
application, so these parts are more decoupled.


## Components in their own files

It's better to create a file for each component.
We put component files inside a component directory inside src directory that is
created by create-react-app.

The file name is the same as the component name.

In the component file, at the top we need to import React or it won't recognize
the JSX syntax.
Once we have created our component we need to export it at the end of the file,
and we need to import it in the component that needs it, that is, its parent
component.


```
// /src/components/BasicButton.js

import React from 'react';

const BasicButton = () => {
  return(
    <button>Click me, I'm a button</button>
  )
}

export default BasicButton;
```

```
// /src/App.js

import BasicButton from './components/BasicButton';

...

```




---

# Props

In React we pass state around between components.
State is the data that flows through our application.
The way we pass state around in React is through the use of a Javascript object named
props.

We already said that functional components are just functions, and like any
function they can take parameters.
React components take a props parameter that represents the state of the
application.
We pass props down from parent component to child component. This is the
mechanism that lets us pass data in our application.

For example, we can have a component that represents a list of students. The
component is names Students and is defined in a file called Students.js

For this example we have some data, which is a list of students. The list of
students is a Javascript array that contains a number of objects that represent
each student.

Here's an example of such an array:

```
 const students = [                   
   {                                  
     name: 'Carol',                   
     age: 20,                         
     bestIn: 'Math'                   
   },                                 
   {                                  
     name: 'Alan',                    
     age: 22,                         
     bestIn: 'English'                
   },                                 
   {                                  
     name: 'Mary',                    
     age: 19,                         
     bestIn: 'Math, Social studies'   
   }                                  
 ]                                    
```

The array is defined in our Student component file and we want to render one
child component for each student in our list.

We render child components with another component, called Student.

Student will render properties like name, age and bestIn. 

Let's stop here for a minute and exhamine the situation. We have defined a list
of students in the Students component and we want to render each student
properties in the Student component. How do we pass the data from Students to
Student?
We use props.

The props object is our vehicle to pass data from the parent component to the
child component. Here's how we do it.


Inside the Students component we include the Student component. We also pass an
attribute called student to each Student component. 
This attribute is set to one of the array elements that represents one student.

See the code:


```
import Student from './Student';


const students = [
  {
    name: 'Carol',
    age: 20,
    photo: '',
    bestIn: 'Math'
  },
  {
    name: 'Alan',
    age: 22,
    photo: '',
    bestIn: 'English'
  },
  {
    name: 'Mary',
    age: 19,
    photo: '',
    bestIn: 'Math, Social studies'
  }
]

const Students = () => {
  return (
    <div className="student-list">
      <h2>Students</h2>

      <Student student={students[0]} />
      <Student student={students[1]} />
      <Student student={students[2]} />
    </div>
  )
}

```

Note that we must include the students value in brackets. This is because we are
inside JSX syntax and students[0] is Javascript syntax. 
Inside JSX, brackets are recognized as an escape character and whatever is
inside the brackets is interpreted as Javascript.
Effectively, what we are doing now is assign the value of each element of the
students array to a student property of the props object.

This student object is passed down to the Student component and can be
displayed. 

Here's how we display the student data inside the Student component:


```
const Student = props => {
  return (
    <div>
      <h3>{props.student.name}</h3>
      <p>Best in: {props.student.bestIn}</p>
    </div>
  )
}

```

As you can see, we pass the props object to the Student component as an
argument.

Inside the function, we have access to the props.student property and this
property is set to a student object from the students array.
The student object is an object with properties like name, bestIn that we can
display just by calling them.
Note also that here too we need to enclose Javascript code inside brackets,
because inside JSX brackets are escape character so the interpreter knows that
inside brackets is Javascript code.



---

## Iterating through components

In the previous article we saw how we can render a React component inside a
parent component, passing some data (also called state) to an object called
props that is passed down to the child component from the parent component.

What we did was render each child component one by one, like this:

```
<Student student={students[0]} />
<Student student={students[1]} />
<Student student={students[2]} />

```

This works but with a long list of object to iterate over it quickly becomes
unwieldy.

A better way to display this data is to use one of the iterator methods offered
by Javascript arrays.
The method we use is map(), that is available on any array.

map() takes a function as an argument and each element of the array is passed to
this  function one by one.
The function takes the array element, does something with it, and then places
the result in a new array.

At the end of the iteration, we are left with a new array that has all the
elements modified by the function.

What does the function do with the elements? We decide what the function does.
In our case, we want the function to return a Student component and we want to
pass the student object from the array to the new Student component created.

Here's how we do it:

```
{students.map(student => <Student student={student} />)}
```

We take the students array and call map on it. 
Map takes as an argument an arrow function.
The arrow function takes as an argument each object in the student array in turn.
In the body of the arrow function we create a new Student component, and we pass
the student object to the properties so it can be displayed in the Student
component itself.

Since this is Javascript code embedded into JSX, we need to enclose this code inside curly braces,
so it will be interpreted correctly inside the JSX code.
Inside the Student component syntax we also have to interpolate the student
variable, because it's Javascript inside JSX.

This iteration will create a number of Student components equal to the number of
student objects in the student array.

We can use a slightly different syntax to achieve the same result in a way
that may be more clear.
Look at this code:


```
{students.map(student => (                            
  <Student student={student} />    
))}                                                   
```

In this code example we put the component on its own line, for more clarity.
In order to do this we need to enclose the component into parenthesis. These
parenthesis mean that this is an implicit return. If we left out the parenthesis
we would get an error from the Javascript compiler.




---

## Class components

We have seen functional components, which are simply Javascript functions. Class
components are Javascript classes.

We define them in their own file with this syntax:

```
class Student extends React.Component {
  render() {
    return (
      <div>
        <p>This is a class component</p>
      </div>
    )
  }
}
```

Note that the class component extends a base class React.Component
React.Component gives our component all the functionalities needed by React to
function correctly.

Also, we need to define a render() method inside our class component. The
render() method will return what needs to be displayed by the component.

When the React system encounters a class component, it creates an instance of
that class and calls its render() method on it.

The code above is the most basic class component. But the real purpose of class components in React is to hold state.
To have the class component deal with its own state, we need to make some extra
configuration.

In a Javascript class we can define a constructor() method that gets called when
an instance of the class is initialized.
In React, we use the constructor() method to hold the initial state of the
component.
So, if we have a students array, with student objects in it, we can define the
initial state of our component inside the constructor method by assigning the
students array to a property of the state object.
We call this property myStudents

As you can see in the code below, we create the state object on the instance of
the class, using the keyword this, which inside a class refers to the object
being instantiated.

```
class Students extends React.Component {
  constructor() { 
    super();
    this.state = {                  
      myStudents: students          
    }                               
  }                                 
}
```
This code will create a state object and add a myStudents property that can be
called with this.state.myStudents

This property holds the students array and the data in this array will be available to the component.

So, when we display the data, we just call this.state.myStudents and do
something with the data in it, like iterate on it and display a
Student component for each student.

```
this.state.myStudents.map( student => {
    // ... do something with the data and return it
    return <Student student={student} />
  })
```







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








[ Video class components, min: 44:17 ]