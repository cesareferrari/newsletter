# React

## JSX

JSX is the language used in React. It's similar to HTML or XML, which is a
superset of HTML.

We write our React components in JSX but the browser doesn't understand JSX
natively, so we need to have a way to translate JSX into Javascript.

When we translate one language into another one, we say that we transpile, the
language.

JSX gets transpiled to Javascript by a program (in our case written in
Javascript) that is called a transpiler. A transpiler is a program
that takes code in one language and translates it into another language.

A transpiler that is used often with React is Babel.
You can find detailed information about Babel at its home page here: https://babeljs.io/

So, to quickly summarize, we write our React components in a HTML-like language called JSX and the JSX is transpiled down to Javascript that the browser executes.

In order to write JSX we need support for it into our files, that's why we
import the React at the top of all our component files. Without this import,
the browser would have trouble understanding the JSX syntax in our Javascript
files.

The way we import React is to add this import statement at the top of the
component file:

```
import React from 'react';
```

This works, as long as we install the necessary Node modules to work with React.

One way to work with React and create and manage React application is throught
the create-react-app module.

Tomorrow we will learn more about create-react-app and how to use it to
jumpstart a React application.


---


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


[Video Functional components 2]
