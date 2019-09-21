# Class components in React
## How to use state with React class components

We have already seen functional components in React, which are simply Javascript functions. Class components, on the other hand, are Javascript classes.

We define them with this syntax:

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

Note that the class component extends (inherits from) the base class React.Component
React.Component gives our component all the functionalities needed by React to
work correctly.

In functional components we simply return JSX that is displayed by React.

Class components behave a little differently. To display the component, React will call a render() method on an instance of the class, so we need to define a render() method inside our class component. The render() method will return what needs to be displayed by the component.

The code above is the most basic class component. But the real purpose of class components in React is to hold state.
To have the class component deal with its own state, we need to make some extra
configuration.

In a Javascript class we can define a constructor() method that gets called when an instance of the class is initialized.
In React, we use the constructor() method to hold the initial state of the component.

So, if we have a students array, with student objects in it, we can define the initial state of our component inside the constructor method by assigning the students array to a property of the state object.
We can call this property myStudents

As you can see in the code below, we create the state object on the instance of the class, using the keyword this, which inside a class refers to the object being instantiated.

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

This code will create a state object and add a myStudents property that can be called with this.state.myStudents

This property holds the students array and the data in this array will be available to the component and its children through props.

So, when we display the data, we just call this.state.myStudents and do something with the data in it, like iterate on it and display a Student component for each student.

```
this.state.myStudents.map( student => {
    // ... do something with the data and return it
    return <Student student={student} />
  })
```

How do we update state in a class component? We will look at state updates tomorrow.


