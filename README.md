# CS35L-Project: UCLA Geoguesser

Welcome to the UCLA Geoguesser, a game where given multiple photos of a location on campus you have to guess where it is.

## How to contribute

Go to the [Dev page](./dev.md) to learn how to contribute to this project.



## How to run

* In order to run our app, you must first copy the .env file into the root folder.
* This will give you all the keys to access our backend and google maps API.
* Next `make all`
  * This will do multiple things:
  * first, install all the packages
  * kill all previous node processes
  * start the frontend and then start the backend
    * before starting the frontend it will put our api key into the correct file, this is how we keep it secret
  * This is a make file, so if the packages are already up to date, it won't need to install them
* You will be prompted with a sign in screen if you don't already have a cookie for the game.
* Sign up if you don't have an account. Sign in if you do. The next time you will go in automatically with cookies.
* At the lobby, make a game, play a game, search for a game, look at the leaderboard, check your profile!
  * You can do anything.
* Cheers, and have fun!!


## Architecture

### Backend

* Our backend is on MongoDB, everything runs through the server.js file
* It routes all the backend requests to api/path/to/backend/feature
* our routes folder, describes all the patch, post, delete etc requests we have.
  * The controllers implement them
* Our models are the MongoDB backend models (schema) that are stored on MongoDB

#### Schema design

* Quiz
  * Quiz info
  * Lookup table for images
* Lookup
  * Holds image IDs for easy lookup
* Image
  * Holds image info
* User
  * User info
  * Holds all its quizzes
  * Also holds its current score

### Frontend

* The frontend is run through the index.js file, it routes everything correctly.
* The base of our app root is App.js, this will route you to the login page.
* The login page will bypass itself if you have a cookie.
* Otherwise you must login or sign up.

#### Frontend interaction with backend
* game.js
  * Fetches the quiz info from the backend
  * Sends score back to user (which is in local storage)
* imageUpload.js (quiz creation)
  * Uploads the image to the backend
  * Updates the user's quizzes with the added quiz
* leaderboard.js
  * Fetches all users sorted by score
* Login.js
  * //TODO
* Signup.js
  * //TODO
* lookForQuiz.js
  * will fetch all quizzes and filter them based on the user's search (regex)
* profile.js
  * fetches the user from the backend
