# myFlix-client

Frontend client for the myFlix movie app.

## Features
All features are still in implementation
### Main view
- Returns ALL movies to the user (each movie item with an image, title, and description)
- Filtering the list of movies with a “search” feature
- Ability to select a movie for more details
- Ability to log out
- Ability to navigate to Profile view
### Single Movie view
- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites
### Login view
- Allows users to log in with a username and password
Signup view
- Allows new users to register (username, password, email, date of birth)
### Profile view
- Displays user registration details
- Allows users to update their info (username, password, email, date of birth)
- Displays favorite movies
- Allows users to remove a movie from their list of favorites
- Allows existing users to deregister

## Prerequisites
- Node.js >= 14
- npm or yarn

## TechStack
### Main Stack
- React (with React-DOM)
- JavaScript ES6
- SCSS
- HTML5
### Additional tools and packages
- Parcel for build creation and deployment
- 

The app will typically be available at http://localhost:1234

## Build (development)
- npm (in project's root location):
  ```
  parcel src/index.html
  ```

## Environment
To be updated along development. e.g.
- Create a `.env` and example of it