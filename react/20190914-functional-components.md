# React components
## How to build functional components in React.

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/react-functional-components.jpeg

Components are the basic blocks of React. At their core, components are just Javascript functions or classes that have one thing in common, they all return `JSX`.
Of course there's more to that, and we will look at components in more detail later, but this is the main concept to remember at the moment.

As I said, components can be either Javascript function or classes. If a components is made out of a function it's called a functional component.
Let's see what a functional component looks like by creating one.

In the following code we create a `BasicButton` component.
Note that the variable name used to initialize the component is capitalized. Component names need to be *capitalized* in React, or they won't work.
The variable is assigned a function, in this case an arrow function, that returns a `<button>` element with some text in it.
Note also that we are using an arrow function to define the component. We could have used a regular `function` definition with the function keyword, but the convention in React is to use arrow functions so we will stick with the convention.

```
const BasicButton = () => {                  
  return(                                    
    <button>Click me, I'm a button</button>  
  )                                          
}  
```

Note that the `<button>` syntax resembles HTML, but it's actually `JSX`. We are writing JSX inside a Javascript file, and since we have imported React at the top of the file, the JSX is transpiled down to Javascript and HTML before it's passed to the browser, and it all works smoothly.

To use the component we have just created, we need to add it somewhere, but where?

If you remember, in a previous article I mentioned that `create-react-app` creates two directories inside our project, a `public` directory and a `src` directory.
The public directory has an `index.html` file that is the entry point of our application. The React application is mounted inside a `div` element inside this `index.html` file.
What is mounted inside the root element, is an `App` component, defined in the `App.js` file inside the src directory.
The App.js file looks like this:

```
function App() {
  return (
    <div className="App">
      <h1>Students</h1>
      <Students />
    </div>
  );
}
```

We can add our new `BasicButton` component inside the `App` component, and it will be rendered in the page.

```
<div className="App">
  <h1>Students</h1>
  <Students />

  // Rendering the BasicButton component
  <BasicButton />

</div>
```

In this article we have seen how to create a functional component and how to include it into our application.

There is another type of component, the class component, but before talking about class components we need to talk about another important feature of React: the way it manages state.