# How to jumpstart a React application
## Quickly initialize a React app with create-react-app

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/create-react-app.jpeg

`create-react-app` is an `npm` module that sets up a skeleton React application from scratch. It will quickly and seamlessly create a scaffolding with all the directories, files, and libraries required to jumpstart an application.
You can find the project homepage [here](https://github.com/facebook/create-react-app).

`create-react-app` sets up the environment for developing and running a React application. It creates a project directory and initializes a `package.json` file with all the required dependencies, including Babel, and tools like react-script that do the transpiling automatically.

This is the command we run to create a React application. Replace `app-directory` with the name of the directory that contains the application.

```
npx create-react-app app-directory
```

Running this command creates the named directory and a `package.json` file inside of it.
It then downloads all the necessary `npm` modules and adds a `start` script that we can use to start the React application.

We can also run `create-react-app` from inside an existing directory, but we should make sure the directory is empty or we wouldn’t be able to run the command:

```
// run the command from inside a directory

npx create-react-app .
```

We can run the `start` script either with `npm` or `yarn`, from inside the project directory.

```
npm start

// or 

yarn start
```

The application will be started and automatically served on port `3000`.
We can open the base application in our browser by navigating to `http://localhost:3000`

`create-react-app` builds a directory structure with a `public` directory and a `src` directory.
Within the `public` directory there's an `index.html` file that is used as the entry point of our application.

`index.html` contains a `div` element with an `id` of `root` that functions as the mount point for the React application.
The whole React application will be contained within this root element, and as
we will see, it will be built up of many components.

Tomorrow we are going to see how to build React functional components.
