

## Getting started

Download node.js from [here](https://nodejs.org/en/download/)

Install the dependencies:

*In the src/backend folder*

```bash
npm init
npm install express
npm install -g nodemon # you might need to run this as sudo
npm install dotenv
npm install mongodb
npm install mongoose
```


## Running the server

*In the src/backend folder*

You must copy over our private .env file from the discord server to the src/backend folder

From src/backend folder:

```bash
npm run dev
```


### Simulating a client

Use postman to send a request to http://localhost:{.env.PORT}/api/game_info/{functionality u want to test}

Check out this tutorial: [here](https://www.youtube.com/watch?v=Ll6knx7sFis&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=4)



## Tutorial position
MongoDB not working yet: https://www.youtube.com/watch?v=s0anSjEeua8&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=4