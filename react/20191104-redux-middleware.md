# Redux middleware
## How to insert functionality between action creator and reducer in React

Redux middleware allows us to insert some functionality in the action creator before an action is dispatched to the reducer.
This lets us do some extra operations like perform an API call and have the action creator dispatch different actions depending on the result of the call.

As you know, an API call can either succeed or resolve into an error and, depending on how the API call resolves, our application can take different paths to handle the situation.

In order to apply middleware we use a Redux method called applyMiddleware that is imported from Redux in index.js, along with the Provider and the reducer. In this example, we call the reducer rootReducer.

```
// index.js

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

As you can see from the example, we pass applyMiddleware as the second argument to the createStore function.

applyMiddleware is the function that lets us work with middleware, but to actually do something with it we need to pass it the actual middleware we want.

We call such an action a thunk and we pass it to applyMiddleware like this:

```
const store = createStore(rootReducer, applyMiddleware(thunk));
```

A thunk is a function that receives dispatch as an argument and calls it asynchronously. Since we want to call an API inside our middleware, thunk lets us dispatch different actions depending on the result of the API call.

We could pass multiple middleware functions to applyMiddleware and they will be called one by one in a sequence.

Before using thunk we need to install redux-thunk and import it into our file as thunk:

```
// Install redux-thunk:

npm i redux-thunk
```

```
// Import thunk into index.js

import thunk from 'redux-thunk';
```

This will send all the dispatch of our actions through thunk.
Now React is going to apply the thunk middleware and execute whatever is in thunk in between the action creators and the reducers.

To see how this works in practice, we are going to build a simple application that accesses the NASA API and fetches the photo of the day.

---

Did you like this article?  Share it with your friends. 

I write daily about front-end and back-end web technologies. 
You can receive all my articles in your inbox by subscribing to my newsletter. Just click the button below. No spam, just good, useful content. Guaranteed!

Follow me on Twitter
https://twitter.com/CesareFerrari