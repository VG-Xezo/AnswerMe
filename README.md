# Welcome to the Answerme official code

## Why?

Answerme is an anonymous forum like website where people can post and answer questions from others.

## Running on your own

Answerme is comprised of a frontend and backend like most apps. This means each individual folder or "end" must be hosted on a different server for example Netlify, and Heroku for frontend and backend respectively. You will need to edit the config.js file in each folder (answerme-frontend, answerme-backend) which exports an object with the info asked.

You can host the frontend with options like Netlify and Firebase. The backend can be hosted with Heroku or cloud providers. I suggest hosting the mongodb with Mongodb atlas.

Note: database must be compatible with **mongoose**.

### Tech Breakdown

Frontend

- HTML, JS, REACT

- Chakra ui

- Tailwind css


Backend 

- Node

- Express

- Mongoose

### Credits 

All code was written by me except for imported libraries

### Other

You can find a working online example hostend with Netlify, Heroku, and Mongodb Atlas [here](https://answerme.netlify.app/ "Live Example").