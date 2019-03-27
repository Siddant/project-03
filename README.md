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

## Process
We started the project by creating wireframes for our application and decided the core functionalities the application should have, as a group. We also discussed the RESTful routes, the structure of the database and models the application will required for the MVC methodology. The application contains 3 models user, project and package. To separate the work load efficiently we decided each member of the team would pick a model to work. Individually we would create the front-end side, back-end side and test the chosen model, we choose this approach to avoid any major conflict with git in the future. I feel it was an efficient approach as it gave each member of the team experience developing on the front-end and the back-end side of the application.

Each of the application functionalities was prioritised using the MoSCoW method. Trello was used to manage the project and assign task to an individual. We also had daily stand-up three time a day in the morning, before lunch and before we went home to keep track of the application progress. Each features were implemented by creating a separate git branches on our local computer before merging into the main development branch. We also establish few sets up rule for git such as:
* don't push broken code to the main git branch
* resolve git conflict as a group
* notify the team before starting the process to push the features.

The development process started by installing all the packages we required as a group and paired coded all the boilerplate code. We used Express to create the back-end side of the application, to store the data we used MongoDB. We also used Mongoose to interact with the MongoDB. Once the back-end side was up and running, we created the seed file to add some dummy data to the database. The purpose of the seed file was to see if the back-end would render data as expected and would be easier to test using Insomnia.

With the back-end side of the application working properly, we shifted our attention to the fron-end side. We used axios to make HTTP request to the back-end side of the application to retrieve data, these data were rendered using React. We also used Bulma which was customised using SCSS to make sure the styling across the application was consistent.

In this project I contribute towards the development features on the users side. The features I implemented was the authorisation system which included log-in, register, error handling on the user side, users indexRoute, users showRoute, users updateRoute and tested the users routes.


<!-- In order to carry out the authentication process, we used BCrypt to hash passwords in the backend and store it in the database so that BCrypt could compare it against the password given when logging in. We also used JSON Web Token to embed JSON into an encrypted token. This was incorporated in our login and register controller and is sent to the client when the users successfully authenticate. -->

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
