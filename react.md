# React

## JSX

JSX is the language used in react. It's similar to HTML.
JSX gets transpiled to Javascript by a transpiler. A transpiler is a program
that takes code in one language and translates into another language.
Babel is such a transpiler.

A module like create-react-app sets up the environment to develop and run a
React application, so it sets up Babel to be the transpiler.

This allows us to write JSX and it will be transpiled automatically and pushed
to the front end.

When we use create-react-app there are tools like react-script that do the
transpiling automatically.

create-react-app is an npm module that creates the whole scaffolding for a React application.

We create a React application by running this command, where app-directory is
the directory that will contain our application.

```
npx create-react-app app-directory
```

This creates a package.json file, download the necessary npm modules and add a
start script that we can use to start the React application.

When we run the start script with

```
yarn start
```

the application will be started on port 3000 and we can view the application
skeleton at localhost:3000

Create-react-app will create a public directory with a index.html file that is
the entry point of our application.

index.html has a div element with an id of root that is the mount point for the
react application.

## React components

Components are the basic blocks of React. Components are just functions or
classes that return JSX.
Of course there's more to that, and we will look at components in more details
later, but for now let's see what a functional component looks like.


In the following code we create a button component. 
Note that the variable name is capitalized. The variable is assigned a
arrow function that returns a <button> element with some text in it.

```
const BasicButton = () => {                  
  return(                                    
    <button>Click me, I'm a button</button>  
  )                                          
}                                            
```

To use this component we add it inside the main function of the React app, with
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


[Video 1:20:00]
