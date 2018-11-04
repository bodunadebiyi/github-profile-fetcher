This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements
- node
- npm

## Installation
Run the following commands
- `npm install` 
- `npm start`
App would be running on localhost port `3000`

## Tests
To run the tests run the command
`npm test`

## Unfinished Tasks
A few tasks are unfinished and this is because I had very limited time considering I have a day job that takes much of my time.

- Site is not responsive 
- Tests are not comprehensive enough, just the components are tested.

## Notes
The three ES6 features used in this applications include:
- `spread operator`: I used this alot in my reducers to clone and update state, using spread operators is much easier than using `Object.assign`
- `arrow functions`: They have a shorter than syntax than normal functions and they don't have their own `this`, they are great as non-method functions and you won't need to bind the `this` context all that time like you would do with normal functions.
- `const keyword`: means that the identifier can't be reassigned.