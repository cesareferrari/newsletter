# React



## create-react-app

create-react-app is a library that sets up a scaffolding for creating a React
application from scratch.

The homepage of the project is https://github.com/facebook/create-react-app

A module like create-react-app sets up the environment to develop and run a
React application. It creates a project directory and sets up a package.json
file with all the required dependencies, including Babel as the transpiler.

create-react-app sets up are tools like react-script that do the transpiling automatically.

create-react-app is an npm module that creates the whole scaffolding for a React application.

We create a React application by running this command, where app-directory is
the name of the directory that contains our application.

```
npx create-react-app app-directory
```

Running this command creates a directory, a package.json file inside of it, download all the necessary npm modules and add a start script that we can use to start the React application.

When can run the start script either with npm or yarn, from inside the project
directory.

```
npm start

// or 

yarn start
```

The application will be started and automatically served on port 3000, so we can view the application skeleton at the localhost:3000 address in our browser.

Tomorrow we will explore the skeleton application created by create-react-app.


---



## React components

Create-react-app creates a directory structure with a public directory  and a src directory.

Within the public directory there's an index.html file that is used as the entry point of our application.

index.html contains a div element with an id of root that functions as the mount point for the React application.

The whole React application will be contained within this html element, and as
we will see, it will be built up of many components.


Components

Components are the basic blocks of React. At their core, components are just Javascript functions or classes that have one thing in common, they all return JSX.

Of course there's more to that, and we will look at components in more detail
later, but this is the main concept to remember at the moment.

As I said, components can be either Javascript function or classes. If a
components is made out of a function it's called functional component.

Let's see what a functional component looks like by creating one.

In the following code we create a button component. 
Note that the variable name used to initialize the component is capitalized. Component names need to be capitalized in React, or they won't work.

The variable is assigned a function, in this case an arrow function, that returns a <button> element with some text in it.

Note that we are using an arrow function but we could have used a regular
function. The convention in React is to use arrow functions, though, so we will
stick with the convention.

```
const BasicButton = () => {                  
  return(                                    
    <button>Click me, I'm a button</button>  
  )                                          
}                                            
```

Note that the <button> syntax resembles HTML, but it's actually JSX. We are
writing JSX inside a Javascript file, and since we have imported React at the
top, the JSX is transpiled down to Javascript and HTML before it's passed to the
browser, and it all works smoothly.

To use the component we have just created, we need to add it somewhere, but where?

If you remember, previously I mentioned that create-react-app creates two
directories inside our project, a public directory and a src directory.

The public directory has an index.html file that is the entry point of our
application. The React application is mounted inside a div element inside this
index.html file.

What is mounted inside the root element, is an App object, defined in the App.js
file inside the src directory.
The App.js file looks like this:


[Continue here]


 we add it inside the main function of the React app, with
this syntax and React will render it appropriately:

```
<Button />
```


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








[Video Functional components 2 - 48:25]
