# Using Redux in React
## How to use application level state in React

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191024-redux-store.jpeg


A React application is essentially a display mechanism for data. In React, data is saved and manipulated in what is called the `state` of the application.

React is built up of a series of components that can store, access, modify and display state. This works fine for smaller applications but when the application becomes larger and complex, handling state at the component level may become unwieldy and prone to bugs.

Redux is a library that can simplify handling of state in a React application. With Redux we create a store that handles application level state in one single place.
All changes to the state are sent to the store, and the React system takes care of updating all components that use that state.

Even though Redux handles application level state, component level state can still be useful inside a React/Redux application.
We use component level state when it affects only one particular component and has no repercussions on the whole application.

Before we start working with Redux, we need to install the library in our project. We need both `redux` and `react-redux`.
React Redux is a library that binds together React and Redux, so they work well together.

```
npm install react-redux redux
```

In this article we assume we are working inside a React application bootstrapped with `create-react-app`.

### Create Redux store

As a first step we create a new Redux store inside `index.js`. We need to import the `createStore` function from Redux.

```
// src/index.js

import { createStore } from 'redux';

const store = createStore(reducer);
```

`createStore` takes one argument, a function called `reducer`.
A `reducer` is just a function that returns a state tree. A state tree is a Javascript object that describes the whole application state.

For example, this following object is a state tree because it describes the application state (a very small application state):

```
initialState = {
  title: "Title from the initial Redux store",
  titleColor: 'palevioletred'
}
```

This is a simplified example, but that's basically what an application state tree is: an object with properties and values related to our application data.

We are going to see what a reducer function actually looks like later, but for now just know that it returns a state tree.
For organization purposes, we put the reducers inside a directory called `reducers`, inside `src`.

In our example, the file that contains the actual reducer function is called `index.js`.
We need to pass the reducer to `createStore` in order to set up the Redux store, so we import the reducer above the call to `createStore` and then we pass it to the function:

```
// src/index.js

import reducer from './reducers';

const store = createStore(reducer);
```

Note that since we have named the reducer file `index.js` we don't have to specify it in the import statement, we can just reference the reducers directory and the `index.js` file will be imported by default.

### Let's recap what we did so far

- we added redux and react-redux libraries to our project
- we imported the createStore function provided by Redux inside our main index.js file
- we created a Redux store by calling createStore and passing a reducer as an argument after we imported the reducer.
- we created a reducer file, called reducers/index.js (this file is empty for now because we haven't create the actual reducer yet).

We have completed the first steps to set up a Redux store in a React application. We will continue working on our application tomorrow.