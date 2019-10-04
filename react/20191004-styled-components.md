# How to use Styled Components in React
## Add custom, dynamic CSS styles inside your React Components

Yesterday we talked about ReactStrap and how that library makes it quick and easy to bootstrap a React application by importing components that are already styled.

This may not be a good solution in all cases, though. What if you really need to add custom styles to your application?

If you want to keep control on your CSS styling but at the same time want the flexibility and dynamicity of Javascript, you may want to consider Styled Components.


Styled components is a way to create your own styles inside a Javascript component.
This works differently from ReactStrap, in the way that it lets you define your own styles for components inside the Javascript files.

To use Styled Components we first need to install the library with this syntax:

```
npm install styled-components
```

Then we need to import it into the file where Styled Components are defined:

```
import styled from 'styled-components';
```

Now we are ready to used Styled Components.

In the example below, we create a StyledButton component. 
StyledButton is assigned the result of a function call styled.button

The call to styled.button is followed by backticks. In this context, backticks are a way to use a construct called tagged template literal which is a fancy way to pass arguments to a function.

Inside the backticks we define the css styles for this button:

```
const StyledButton = styled.button`
  background-color: gray;
  border: 1px solid black;
  padding: 4px 10px;
  color: white;
  border-radius: 6px;
`
```

When we render the StyledButton component it will have the styles we have defined above.

```
render(
  <div>
    <StyledButton>Styled component button</StyledButton>
  </div>
)
```

Inside the backticks we can also add Javascript code that performs dynamic actions.
Below we extend the CSS for StyledButton with some Javascript code that looks at the props we pass into the component and adds extra CSS based on some condition:
 
```
const StyledButton = styled.button`
  background-color: transparent;
  border: 1px solid palevioletred;
  padding: 4px 10px;
  border-radius: 6px;

  ${ props => 
      props.primary && 
      css`
        background: palevioletred;
        color: white;
      `
  }
`
```

This is saying: if we have props.primary passed into this component, then add that extra css.

To make this work, we need to pull in css, which is a function exported from styled-components, so we need to have this import directive at the top of our file:

```
import styled, { css } from 'styled-components';
```

With Styled Components you can also use SASS syntax and nest the elements:

```
&:hover {
  background-color: #9c274e;
  color: white;
}
```

We can extend those styled components by passing the original component to the styled function. The styled function is a high order function that takes a component and returns another component, adding to it the extended styles that we defined.

As a quick example of this feature, in the code below we are defining a TomatoButton component that takes the styles from StyledButton and extends them with extra styles. 
We then use TomatoButton in our code. Remember, we need to import styled from styled-components for this to work.

```
import styled from 'styled-components';

const TomatoButton = styled(StyledButton)`
  color: tomato;
  border-color: tomato;
`
```

You can read more about Styled Components on their homepage: https://www.styled-components.com
