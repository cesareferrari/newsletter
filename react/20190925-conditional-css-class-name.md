# Conditionally assign a CSS class to a React component
## How to assign a CSS class based on an object property

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20190925-conditional-css-class-name.jpeg

Let's say we need to display some data that has this structure:

```
const groceries = [
  {
    id: 1,
    name: "bananas",
    purchased: false
  },
  {
    id: 2,
    name: "apples",
    purchased: true
  }
]
```

One of the properties of these grocery objects is `purchased`.
`purchased` is a `boolean` property and can be `true` or `false`.
When we display these items, we want to style them differently depending on their `purchased` property.
If the item is purchased, we want to add the CSS class of `purchased` to the `className` property of the component.
If the item is not purchased (`purchased: false`) we want to display the item normally.

For this purpose, we can use a *ternary* operator to check if the item has a property of `purchased` set to `true`. If it does, we add the class `purchased` to the element.
We can then style the `purchased` class differently, for example adding a line-through style.

```
<div className={props.item.purchased ? 'purchased' : ''}>
```

The example above assumes we don't already have any other class on the div.
What if we already have a class name and need to add an *additional* `purchased` class?

In this case we can take advantage of the Javascript string interpolation syntax that uses a dollar sign and braces inside back-ticks to interpolate Javascript in a string, like this:

```
<div className={`item${props.item.purchased ? ' purchased' : ''}`} >
```

This example is a little tricky to understand, let's look at it in detail.
We first add the `item` CSS class in the backticks. We then start the interpolation syntax with the dollar sign and inside the brackets we place a ternary operator that checks the value of the purchased property of the item.

If the property is `true` we then add a string that starts with a *space* (to separate it from the existing class) and then the `purchased` string.
The result will be an `html` element that looks like this:

```
// when purchased is false:
<div class="item">

// when purchased is true:
<div class="item purchased">
```

That's how we use ternary operators to conditionally specify `CSS` classes on React components.

If you like this article and want to receive more in your inbox, just click the button below to sign up for a free subscription.