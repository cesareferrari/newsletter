# How to jumpstart a React application
## Quickly initialize a React app with create-react-app

create-react-app is a npm module that sets up a skeleton React application from scratch. It will quickly and seamlessly create a scaffolding with all the directories, files, and libraries required to jumpstart an application.

The homepage of the project is https://github.com/facebook/create-react-app

create-react-app sets up the environment for developing and running a React application. It creates a project directory and initializes a package.json file with all the required dependencies, including Babel, and tools like react-script that do the transpiling automatically.

This is the command we run to create a React application. Replace app-directory with the name of the directory that contains the application.

```
npx create-react-app app-directory
```

Running this command creates a directory, a package.json file inside of it.
It downloads all the necessary npm modules and adds a start script that we can use to start the React application.

We can run the start script either with npm or yarn, from inside the project directory.

```
npm start

// or 

yarn start
```

The application will be started and automatically served on port 3000. 
We can open the base application at in our browser by navigating to http://localhost:3000

Create-react-app builds a directory structure with a public directory and a src directory.

Within the public directory there's an index.html file that is used as the entry point of our application.

index.html contains a div element with an id of root that functions as the mount point for the React application.

The whole React application will be contained within this root element, and as
we will see, it will be built up of many components.

Tomorrow we are going to see how to build React functional components.

