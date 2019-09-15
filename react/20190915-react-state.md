https://unsplash.com/photos/vpR0oc4X8Mk


## React components and state
A quick discussion of state and components in React


React is a way to manage state in a complex application. Today's web applications tend to become very complex very fast.
React allows us to manage this complexity by displaying components depending on how the state of our application changes over time.  We update the state and React will take care of the rest.

But, what is state?

The web was originally built as a way to link documents together. These documents have state. For example, the text in a static html page is considered to be state. The links in the same page, are also state.

In a static document, state is not updated, though. If you want to change state, like the page content for example, you reload the whole page.
In static web sites there is no need to update the existing state, because when there are changes to state, you replace the whole document.

In dynamic web applications, however, state changes based on user interaction.

If a user clicks a button or moves the mouse in the application, an event is generated and this event may trigger a change of state. For example, a hidden component may be revealed on mouse over. 
The job of React is to manage all the state updates that occur in modern web applications.

React also helps create a separation between front end and back end of an application, so there is less dependency among these parts.


## React components

The basic structure of a React application is made up of components.
Components are Javascript functions or classes and they are defined in a series of files inside a components directory in our file structure.

Sometimes you see multiple components in one file, but for the purpose of keeping things organized it's better to create a file for each component.

create-react-app adds a src directory to our project and we save components inside this directory.

We name the file that define a component the same name as the component name.  So, if our component name is BasicButton, it will live in a file called BasicButton.js

In the component file, at the top, we need to import React or it won't recognize the JSX syntax.
Once we have created our component export it at the end of the file, so it's accessible to import in other components that need it.

Below is the basic structure of a component file, with the React import at the top, the component definition and the export line at the bottom

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

Below is how we import the BasicButton component into another file:

```
// /src/App.js

import BasicButton from './components/BasicButton';

```

Components pass state around between them through an object called props.
We will look at how this mechanism work in tomorrow's article.

