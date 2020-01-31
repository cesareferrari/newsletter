# Deploying a Node application to Heroku, part 3
## How to set up continuous deployment from GitHub

tagged_headline: Set up continuous deployment to Heroku from GitHub #heroku #webdev

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191204-heroku3-deploy.jpeg


Now that our application is ready to be deployed to Heroku we can make things easy for us by setting up a system of continuous deployment from GitHub.

This means that, after a simple set up, we can just push our code to our Git repository on GitHub and have Heroku automatically detect code changes, grab the latest version of our app, and deploy it to production, without us having to take care of this process manually.

After we update our app, all we have to do is commit our changes, push the code to GitHub, and Heroku will take care of the rest.
As soon as our code is received by GitHub, it will trigger a new automatic deploy, and the production server will be restarted immediately, without our involvement.

### Setting up continuous deployment on Heroku

We first need to sign up for an Heroku account and log in.
In our Heroku dashboard, at the top, we click the button to create a new app.

![New app](https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191204-heroku3-deploy2.jpeg)

Next we give our app a unique name (names need to be unique across the Heroku platform), and when the application is created we go to the Deploy tab.

Under `Deployment method`, we select GitHub. If it's the first time we select this option it will prompt prompt us for permission to connect to our GitHub account.

![New app](https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191204-heroku3-deploy3.jpeg)


Once the GitHub account is connected, we need to pick the repository for the application.

Since our repository may have different branches, Heroku will also ask which branch to connect, under `Automatic Deploy`.

It's convenient to be able to choose the branch to deploy since often we may have different different versions of our application, like development, staging, or production, on different branches.

Once we have chosen the branch, we select `Enable Automatic Deploys`.
From now on, when we push to GitHub, Heroku will perform an automatic deploy.

These steps set up the automatic deploy for us, but automatic deploy will be triggered only when we push new code to GitHub.
So, the very first time we set up a new application, we should make a manual deploy, which can be done in the `Manual Deploy `section in the Heroku dashboard.