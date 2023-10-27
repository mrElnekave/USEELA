

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



## Connecting to DB
In the server code we connect to the DB with a password and username. This is stored in the .env file. You must copy over our private .env file from the discord server to the src/backend folder.

However the DB won't even attempt to connect if you IP isn't whitelisted. To get your IP whitelisted, you must send your IP to the discord server.
If you have UNIX:
```bash
nmcli device show
nmcli device show | grep IP4.ADDRESS
```

## Tutorial position
MongoDB not working yet: https://www.youtube.com/watch?v=s0anSjEeua8&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=4