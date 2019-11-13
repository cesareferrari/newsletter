# Fetching data from an external API in React
## Using the Fetch API to retrieve data

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191001-fetch-from-api.jpeg


When we don't pass `props` to a React class component we can omit the class constructor. We can just set the state as a variable on the class in this way:

```
class Dogs extends React.Component {
  state = {
    dogs: []
  }
}
```

Typically, the `state` object is initialized to an empty value.
In the example above we set the dogs attribute of the `state` object to an empty array.
This is because we expect to receive the `state` data from an external `API` as an array.

We call the external `API` in `componentDidMount()`, like we saw in a previous article.
When we receive the data, we update the state with the array we receive.

In the example below, we fetch an array of dog images from the `dog.ceo` `API`. We use the Fetch `API` that is included in Javascript. The Fetch `API` provides an interface for retrieving resources on the internet. It's similar to `XMLHttpRequest` but with additional features.

```
componentDidMount() {
  fetch('https://dog.ceo/api/breed/husky/images')
    .then(response => res.json())
    .then(dogs => this.setState({dogs: dogs.message}))
    .catch(error => console.log('Error:', error));
}
```

`fetch()` returns a Javascript *Promise* that calls the `then()` method if it resolves correctly, or the `catch()` method if it encounters an error.

We will talk about Promises in future articles. For now let's just say that `fetch()` works asynchronously and retrieves data from an external `API`.
After we get the data successfully, `fetch` calls the first `then()` method above where we convert the response to `JSON` format with the call to `response.json(`).

The result of this method call is then sent to the next `then()` method.
In it we use `setState()` to update the initial component state (an empty array) with the array of dog images returned by the `API`.

At this point we have achieved our goal of updating the component state with data from an external `API`.

The `catch()` method handles any errors that may occur during the `API` call, like a page not found or a dropped connection and will not be called if the operation is successful.

There are other ways to fetch external data in React. One popular method is to use the Axios library, that is similar to the Fetch `API`.
We will learn how to use Axios to fetch data in a future article.

If you like this article and want to receive more in your inbox, just click the button below to sign up for a free subscription.