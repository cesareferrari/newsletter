# Combine reducers in a React / Redux application
## How to organize individual reducers with combineReducers

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191031-combined-reducers.jpeg



We have seen how reducers in a React/Redux application take the existing state and an action and return a new, updated state object that can then be displayed by the application.

Reducers know how to update the state by looking at the type of action coming in. If the action is of type `UPDATE_TITLE`, for example, they run logic that updates the title. If the action is of type `TURN_TITLE_GREEN`, they run logic that makes the title green, and so on.
The way reducers implement this logic is by using conditional statements. One popular way is to use a *switch* statement. Here's an example:

```js
const titleReducer = (state = initialState, action) => {

  switch (action.type) {
    case TURN_TITLE_GREEN: 
      return {
        ...state,
        titleColor: 'green'
      }
    case UPDATE_TITLE: 
      return {
        ...state,
        title: action.payload
      }
    default: return state;
  }
}
```

In this case, our reducer manages changes to the application title, so it makes sense that one single reducer would handle all cases related to the title.
But what if we have unrelated aspects of our state to handle. What if our application had separate functionalities, like a user registration, and a login functionality?

Even though both these two functionalities deal with users, they have different responsibilities and, for the sake of making our application simpler and easier to maintain, it would be better to have *separate* reducers that handle these two functionalities separately.

We could name our reducers `loginReducer` and `registerReducer` and put them into separate files inside the `reducers` directory.
But when we create a new Redux store with the `createStore` function, we can only pass *one* reducer to it. How are we supposed to fit two or more reducers as an argument to our function?

It turns out that Redux lets us combine multiple reducers into one that can be passed into `createStore` by using a helper function named `combineReducers`.

The way we combine reducers is simple, we create one file per reducer in the `reducers` directory. We also create a file called `index.js` inside the `reducers` directory.
In the `index.js` file we import the `combineReducers` function from Redux and we also import all the individual reducer files.

We then invoke `combineReducers` and pass to it as an argument an object that contains all the individual reducers.
`combineReducers` will combine all the reducers passed to it into a single reducing function that can then be exported as default.
Here's what it looks like:

```js
import { combineReducers } from 'redux';
import { registerReducer } from './registerReducer';
import { loginReducer } from './loginReducer';

export default combineReducers({
  registerReducer,
  loginReducer
});
```

Remember that this syntax:

```js
{
  registerReducer,
  loginReducer
}
```

is equivalent to this:

```js
{
  registerReducer: registerReducer,
  loginReducer: loginReducer
}
```

Now we can simply import the default reducer as rootReducer in index.js and use it to create the Redux store:

```js
import rootReducer from './reducers';

const store = createStore(rootReducer);
```

That's how we can combine multiple reducers into one single reducer to be used to generate the Redux store.