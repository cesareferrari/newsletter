# Redux reducers in a React application
## What is a reducer and how to use it


In our previous article we added Redux to our React application.
We created a Redux store by passing a reducer to the createStore function imported from Redux.

We also installed React Redux, which is a library that connects React and Redux and facilitates them working together.

In order to work with Redux we need to make our React application aware of it.
The way we do it is to wrap our whole application with a component called Provider that is made available by the react-redux library.

We import a Provider component from react-redux, we pass the store that we have previously created to it via the store prop, and finally we wrap the App component with it.  

```
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
```

At this point we have the beginning of a React/Redux application but it's not working yet. 

We said that createStore takes a reducer as an argument. Here's the relevant code again:

```
const store = createStore(reducer);
```

What is a reducer?

A reducer is simply a function that changes the application state based on an action. We will look at actions later, but for now it's enough to say that a reducer takes a state object and an action as parameters and returns the state that was modified according to the action that was passed in.

Actions can be of different types and can modify the state in different ways. The reducer job is to look at the action type and modify the state accordingly.

We put reducers in a directory called reducers.
If we have many reducers we can break them down into several files, but for now let's assume that we have only one reducer in a file called index.js

At its most simple, a reducer takes the state, and returns the state unchanged.

Here's an example of what I mean. We have a reducer called titleReducer that takes two arguments: state and action.
This reducer does nothing with the action and returns the state unchanged.

```
// src/reducers/index.js

const state = {
  title: "Title from the initial Redux store",
}

// the reducer:

const titleReducer = (state, action) => {
  return state;
}
```

But this would be of little use. If we don't change the state, what's the purpose of a reducer?
A more useful reducer will take the state and an action and return the state changed based on the action type. So, let's modify our reducer to reflect this:

```
const initialState = {
  title: "Title from the initial Redux store",
}

const titleReducer = (state = initialState, action) => {

  if (action.type === 'UPDATE_TITLE') {
    return { title: "Updated title" }
  }

  return state;
}
```

We made a few changes here that are worthy of some explanation.

We changed the name of the state object to initialState to indicate that this is the initial state of the application, and it can be changed as our application runs.

We also modified how the titleReducer takes the first argument in. We took advantage of the default parameters syntax so the first argument is initialized to the initial state if there is no state object passed in. If the state object is passed in, then the reducer uses that object.

So, the first time the reducer runs, it will take the initial state.
Subsequently the reducer will be called with the current state of the application, that can be different than the initial state.

Inside the reducer we check the action type. As we will see, actions are just Javascript objects with a type property. The reducer checks the type property and if it matches the string UPDATE_TITLE it returns the state with a modified title.

If this string is not present, or doesn't match, our reducer returns the state unmodified.

This is a very simple example of a reducer meant to shows the basic functionality. Reducers in real life are more complex than this.

We are going to take a look at a real reducer tomorrow.

