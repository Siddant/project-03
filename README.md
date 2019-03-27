# General Assembly Project 3: Pepino - built for developers

A group project of 3 members [Begona Fernandez](https://github.com/aguairon), [Siddant Gurung](https://github.com/Siddant), [James Benson](https://github.com/jjbenson85)

## Goal

 To build a MERN stack application in a group and also have an automated tests for at least one RESTful resource on the back-end. The application uses the MVC methodology.

 A live version of this site can be found on Heroku ----> https://project-3-group.herokuapp.com/

<!-- Pepino is a tool to help Node developers discover new node packages.

With integrated search of the NPM library using keywords, users are able to see the description and usage statistics of node packages. Users can create representations of their node projects, add their current node packages to it and comment on the packages or other projects.

The project had three models and we were each able to experience the backend, testing and front end for our own model. I was responsible for creating the Packages model and schema for the database, and their RESTful routes. I also created the packages Index and Show pages on the website, and am responsible for the colour choice and overall styling -->


### Timeframe
7 days

## Technologies used
* React
* Node.js
* JavaScript (ES6) / HTML5 / SCSS
* Git / GitHub
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

### Development process
The development process started by installing all the packages we required as a group and paired coded all the boilerplate code. We used Express to create the back-end side of the application, to store the data we used MongoDB. We also used Mongoose to connect to the MongoDB in a ORM environment. Once the back-end side was up and running, we created the seed file to add some dummy data to the database. The purpose of the seed file was to see if the back-end would render data as expected and would be easier to test using Insomnia.

With the back-end side of the application working properly, we shifted our attention to the fron-end side. We used axios to make HTTP request to the back-end side of the application to retrieve data, these data were rendered using React. We also used Bulma which was customised using Scss to make sure the styling across the application was consistent.

#### Contribution
In this project I contribute by focusing on the users side features. The features I implemented were log-in, register, error handling on the user side, authorisation system, users indexRoute, users showRoute, users updateRout and tested the users routes.



<!-- We used Filestacka API to allow users to uploade images,



RESTful routes -->




## Challenges
uisng git in team enviorment
the concept of mongodb with virtual, embedded and reference

## Wins

## Future Features
