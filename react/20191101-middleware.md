# Redux middleware
## How to dispatch different actions to reducers in React

A state machine is a system that starts out in a specific state and changes from one specific state into another specific state based on the variables introduced into the system.

An example of state machine is traffic lights.

The initial state is stop (red light)
There is an input (a timer goes off) that changes the state from stop to go, and changes the light from red to green.
Then another input changes the state from go to slow down and changes the light to yellow.
Then another input changes the state from slow down to stop again, with red light.


Another example of a state machine is a login action on a web page.

The initial state is to display the LOGIN FORM.
When the user clicks the submit button, the application goes into a LOADING state.

The LOADING state can have two resolutions. If it's successful, the state is changed to show the user PROFILE page.

If it's not successful, because some error occurred, the state is changed to ERROR.

From ERROR we can try again with other credentials and go back to the PROFILE state or to another ERROR state.

See the table below that schematically explains this situation:

```
States          Input            Transition to other state
----------      -------------    --------------
LOGIN FORM      submit           LOADING

LOADING         success  ->      PROFILE
                failure  ->      ERROR

PROFILE         profile  ->      PROFILE
                log out  ->      LOG IN FORM

ERROR           try again ->     LOADING
---
```



Why are we talking about state?

In a React/Redux application, Redux is the holder of the application level state.

We keep our state inside the Redux store and the actions are the elements in the application that initiate the transition to another state.

The reducers have the job to take the application state and update the existing state machine, based on the actions.

So, you can look at Redux as a finite state machine with state that changes based on actions.

In this state machine analogy, we can see that actions are the inputs that prompt state changes within our application.  

So far, we have seen action creators that dispatched one action. By looking at the table above, we can see at a glance that in some cases action creators need to return, or dispatch, different actions depending on some condition.

When we submit a login form, we have to communicate with an external service or database and we don't know if we are going to get a successful response or a failure. The user we are trying to login may not be found in the system. In this case we need an action that initiates a transition to an ERROR state.

If the user is found we need an action that propts a transitions to a PROFILE state instead.

So, in our application we need to have a system that handles this logic and dispatches the appropriate action to the reducer.

Redux uses a concept called middleware to handle this kind of situations.

Middleware allows us to insert something between creation and dispatching of an action so we can do some extra operation like checking if an API call was successful or not.

Tomorrow we are going to look at Redux middleware and how we handle asynchronous API calls in our application.

---

Did you like this article?  Share it with your friends. 

I write daily about front-end and back-end web technologies. 
You can receive all my articles in your inbox by subscribing to my newsletter. Just click the button below. No spam, just good, useful content. Guaranteed!

Follow me on Twitter
https://twitter.com/CesareFerrari


