# Adding a method to a class component
## How to pass class component method to child component in React

Sometimes we need to add a method to a class component and pass it down to its child component.

For example, we may have a GroceryList component that has a child component called  GroceryItem.

We define a toggleItem() method in GroceryList that we want to trigger from GroceryItem. How do we do that?

Let's first define the method in the parent component.

The way we add a method to a class component is to simply create an identifier inside the class definition and assign an arrow function to it.
The identifier will be the name of the method we call.

```
class GroceryList extends React.Component {

  toggleItem = itemId => {
    // perform a toggle action
  }

}
```

To use this method in the child component, we need to pass it down via props:

```
<GroceryItem item={item} toggleItem={this.toggleItem} />
```

Inside the child component we then use this method in an onClick event:

```
<div onClick={ () => {props.toggleItem(props.item.id)} } />
  Click me
</div>
```

When we click on the <div> element now we trigger the onClick event that will call toggleItem() in the parent component, passing the item id as an argument.



