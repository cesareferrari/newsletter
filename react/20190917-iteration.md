# Iterating through components
## How to use map() to create React components through iteration.

In the previous article we saw how we can render a React component inside a parent component, passing some data (also called state) to an object called props that is passed down to the child component from the parent component.

What we did was render each child component one by one, like this:

```
<Student student={students[0]} />
<Student student={students[1]} />
<Student student={students[2]} />

```

This works but with a long list of objects to iterate over it quickly becomes unwieldy.

A better way to display this data is to use one of the iterator methods offered by Javascript arrays.
The method we are going to use is map(), that is available on any array.

map() takes a function as an argument and each element of the array is passed to this  function one by one.
The function takes the array element, does something with it, and then places the result in a new array.

At the end of the iteration, the original array is left untouched, and  we are left with a new array that has the same number of elements as the original array, but modified by the function applied to them.

What does the argument function do with the elements?  It's up to us to decide what the function does.
In our case, we want the function to return a Student component and we want to pass the student object from the array to the new Student component created.

Here's how we do it:

```
{students.map(student => <Student student={student} />)}
```

- We take the students array and call map on it. 
- Map takes an arrow function as an argument .
- The arrow function takes as an argument each object in the student array in turn.
- In the body of the arrow function we create a new Student component, and we pass the student object to the student property so it can be displayed in the Student component itself.

Note that inside the Student component JSX syntax we must enclose the student variable inside curly brackets, because it's Javascript inside JSX.

This iteration will create a number of Student components equal to the number of student objects in the student array.

We can use a slightly different syntax to achieve the same result in a way that may be more clear.

Look at this code:


```
{students.map(student => (                            
  <Student student={student} />    
))}                                                   
```

In this code example we put the component on its own line, for more clarity.
In order to do this we need to enclose the component into parenthesis. These parenthesis mean that this is an implicit return. If we left out the parenthesis we would get an error from the Javascript compiler.

Tomorrow we'll take a look at Class components, another way to build components in React.




