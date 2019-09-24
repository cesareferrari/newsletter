# Passing methods through props
## How to pass a React class component method to children components

To add a method to a class component we simply create an identifier inside the class definition and assign a function to this identifier.

We typically assign an arrow function to the identifier that represents the name of the method.

Here's an example. We add the toggleItem() method to the App class component:

```
class App extends React.Component {

  toggleItem = itemId => {
  }

}
```

But how do we pass this class method down the chain of components? 

Say we need to use this method in a child component. We use the props object for this purpose.

In this example we have a GroceryList component that is a child of App.
When we mount GroceryList inside App, we also pass the toggleItem prop to it, that is set to the class method in the parent component referenced with the keyword this:

```
<GroceryList
  groceries={this.state.groceries}
  toggleItem={this.toggleItem}
/>
```

If we have to pass toggleItem() down again to a child of GroceryList, we can reference the same identifier but in this case we need to reference it via props, because it was passed to GroceryList from App through props:

```
// Inside GroceryList:

{
  props.groceries.map(item => {
    return (
      <GroceryItem
        item={item}
        key={item.id}
        toggleItem={props.toggleItem}
      />
    )
  })
}
```

We have seen a way for a child component to call a method defined in a parent or grandparent component.

If you like this article and you want more, please support my work by clicking the button below to sign up for a free subscription.
