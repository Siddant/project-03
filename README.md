# General Assembly Project 3: Pepino - built for developers

A group project of 3 members [Begona Fernandez](https://github.com/aguairon), [Siddant Gurung](https://github.com/Siddant), [James Benson](https://github.com/jjbenson85)

## Goal

 To build a MERN stack application in a group and also have an automated tests for at least one RESTful resource on the back-end. The application uses the MVC methodology.

 A live version of this site can be found on Heroku ----> https://project-3-group.herokuapp.com/

### Timeframe
7 days

## Technologies used
* React
* Node.js
* JavaScript (ES6) / HTML5 / SCSS
* MongoDB & Mongoose
* BCrypt & Session Auth
* Bulma CSS Framework & SCSS
* Chai/Mocha/Supertest/NYC
* Bluebird
* request-promise/axio
* Webpack
* JWT (JSON Web Token)
* Git / GitHub / Heroku


## External APIs
* npms.io
* Filestack

## Installation
1. Clone or download the repo
2. Run ```yarn``` in Terminal
3. Start the database by running ```mongodb```in Terminal
4. Start the server by running ```nodemon``` in Terminal
5. Run the seed file with ```yarn run seed``` in Terminal
6. Run webpack dev server with ```yarn run serve``` in Terminal
7. To see test result use ```yarn run test``` in Terminal

## Overview
Pepino is a tool to help Node developers discover new node packages. Pepino also helps developers to keep track of their projects, helps them to manage packages they used to build the project. Pepino allows users to discover new users and discover project other users has created.

## Instruction
This is the registration form, which new user can use to create a new account to access the website.
![screenshot](https://user-images.githubusercontent.com/5802969/55153283-f5cfa780-5149-11e9-99e2-f982eab487da.png)

If the user has got an account then they can use the log in form to log-in to the website.
![screenshot](https://user-images.githubusercontent.com/5802969/55153284-f5cfa780-5149-11e9-8a09-21130dca2630.png)

Once they are logged-in, they will be directed to their profile page. The user profile will contains all the project the have created, they have the ability to edit their bio and also add new project.
![screenshot](https://user-images.githubusercontent.com/5802969/55153285-f5cfa780-5149-11e9-8305-be14942842c1.png)

User can add new project by clicking on the ```add project``` button, which will show a form where the users are required to enter the project name and the project description.
![screenshot](https://user-images.githubusercontent.com/5802969/55153286-f6683e00-5149-11e9-9422-867b7dc59be0.png)

After the user has created the project, they will be redirected to the project edit page. In this page the user can search for node packages and add them to the project. Added package are shown on the installed package section. The user also has the ability to keep the project as a private or public.
![screenshot](https://user-images.githubusercontent.com/5802969/55153288-f6683e00-5149-11e9-8ece-cb001063779a.png)

By clicking on the ```view detail``` button the user get to see more detail about the specific package. The user can also see comment about the package left by other users on the platform.
![screenshot](https://user-images.githubusercontent.com/5802969/55153289-f6683e00-5149-11e9-86b7-3cc2c00b3519.png)

The user also has the ability to search for projects other users has created.
![screenshot](https://user-images.githubusercontent.com/5802969/55355625-c52c9c80-54c0-11e9-9180-3a2c2c94cfce.png)

The user also has the ability to search for other users currently using this platform. They can also use the search function.
![screenshot](https://user-images.githubusercontent.com/5802969/55153281-f5cfa780-5149-11e9-8c63-a9d84f7d9d50.png)

The user can view other users profile.
![screenshot](https://user-images.githubusercontent.com/5802969/55355626-c52c9c80-54c0-11e9-9624-26dd9e0be2fc.png)

The user can Also view projects created by other users.
![screenshot](https://user-images.githubusercontent.com/5802969/55355624-c52c9c80-54c0-11e9-9846-f4d798e02748.png)
## Process
We started the project by creating wireframes for our application and decided the core functionalities the application should have, as a group. We also discussed the RESTful routes, the structure of the database and models the application will required for the MVC methodology. The application contains 3 models user, project and package. To separate the work load efficiently we decided each member of the team would pick a model to work. Individually we would create the front-end side, back-end side and test the chosen model, we choose this approach to avoid any major conflict with git in the future. I feel it was an efficient approach as it gave each member of the team experience developing on the front-end and the back-end side of the application.

Each of the application functionalities was prioritised using the MoSCoW method. Trello was used to manage the project and assign task to an individual. We also had daily stand-up three time a day in the morning, before lunch and before we went home to keep track of the application progress. Each features were implemented by creating a separate git branches on our local computer before merging into the main development branch. We also establish few sets up rule for git such as:
* don't push broken code to the main git branch
* resolve git conflict as a group
* notify the team before starting the process to push the features.

The development process started by installing all the packages we required as a group and paired coded all the boilerplate code. We used Express to create the back-end side of the application, to store the data we used MongoDB. We also used Mongoose to interact with the MongoDB. Once the back-end side was up and running, we created the seed file to add some dummy data to the database. The purpose of the seed file was to see if the back-end would render data as expected and would be easier to test using Insomnia.

With the back-end side of the application working properly, we shifted our attention to the fron-end side. We used axios to make HTTP request to the back-end side of the application to retrieve data, these data were rendered using React. We also used Bulma which was customised using SCSS to make sure the styling across the application was consistent.

In this project I contribute towards the development features on the users side. The features I implemented was the authorisation system which included log-in, register, error handling on the user side, users indexRoute, users showRoute, users updateRoute and tested the users routes.

## Challenges
This was my first time using Git in a group environment, therefore I had a lot of issues with merge conflict. I keep on forgetting few steps, such as forgetting to create different sub branches during implementation phase of features therefore in most case I was developing on the main development branch.

Also working with new technology brought new challenges and new concept. The embedded and reference concept of MongoDB was really challenging to understand properly.

## Wins
One of the feature I created for this project which allow users to search for other users was a bit tricky to implement. As the feature required to show all the users with similar username, I was able to overcome this issue by using a Regular Expression on the searchRoute. I also implemented debouncing approach to this feature to create an instance search.

```
function searchRoute(req, res, next ) {
  User
    .find({'username': new RegExp(req.params.search, 'i')})
    .populate('project')
    .then(users => res.json(users))
    .catch(next)
}
```

I really pleased with implementing the Authentication system to the application, as it allowed more featured to be implemented to this application. Overall from this project I have gained a lot of experience in both front-end and back-end development.

## Future Features
* Email validation and password reset.
* Users to follower other users.
* Users to like project created by other Users
* Rank the project depending on the number of like they received.
* Users to message each other.
* By using GitHub API allow use to add to add project they have on their GitHub
