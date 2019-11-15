# Add CSS styles to React components with ReactStrap
## Use ReactStrap to quickly style your React application

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191003-reactstrap.jpeg

React lets us create frontend applications quickly, but we still need to make those applications pretty to look at and efficient to use, and we all know that UI development takes a long time to get it right.

If you want to get up and running quickly, you may consider using a styling library to speed up your development.
*ReactStrap* is a way to quickly add *Bootstrap* styling to a React application.

It's a library of components already styled with Bootstrap, a popular frontend component library.
ReactStrap will make components available to you that are already styled, so all you have to do is include them into your project and tweak their appearance to make them fit into your application.
You can add buttons, alerts, navigation bars, modal windows and even carousels to your React project by simply including them.
The styling of your whole application will be consistent and professional.

### How do you add ReactStrap?

Before using ReactStrap you need to install it with the command below.
Note that ReactStrap itself does not include the Bootstrap library, so you need to install it as well in your project.

```
npm install reactstrap
npm install bootstrap
```

After the library is installed the next step is to import Bootstrap in `index.js` file so it's available everywhere in your application:

```
import 'bootstrap/dist/css/bootstrap.min.css';
```

At this point, ReactStrap is ready to use.
When we need to use a ReactStrap component we import it at the top of the file
where we want to include it by adding the import directive and specifying the
components to add:

```
import { Button, Alert } from 'reactstrap';
```

Then, we can use the components as usual:

```
<Button color="primary">Default button</Button>

<Alert>Text alert!</Alert>
```

As you can see, inside the component tags we add the text that will appear on the button and in the alert box.
We can also pass predefined props to control the styling.
In this case we pass the `color` prop to the `Button` component.
`color` controls the way the button is displayed on the page and takes a list of several predefined options.

To learn more about ReactStrap and find out all the components and all the options available check out [their website](https://reactstrap.github.io)

If you like this article and want to receive more in your inbox, just click the button below to sign up for a free subscription.