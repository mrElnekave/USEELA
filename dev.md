

## Getting started

Download node.js from [here](https://nodejs.org/en/download/)

Install the dependencies:

*In the src/backend folder*

```bash
npm install express
sudo npm install -g nodemon # you might need to run this as sudo
npm install dotenv
npm install mongodb
npm install mongoose
npm install exifreader --save 
npm install multer
npm install sharp # convert pictures to .jpeg
npm install heic-convert # extra converter for .heic
```

*In the src/frontend folder*

```bash
npm install axios
npm install react-router-dom
npm install react-dropzone
npm install rsuite
npm install @react-google-maps/api
npm install @mui/material
npm install @emotion/styled
```


## Backend

### Running the server

*In the src/backend folder*

You must copy over our private .env file from the discord server to the src/backend folder

From src/backend folder:

```bash
npm run dev
```

Or from the proj folder:

```bash
./back.sh
```


### Simulating a client

Use postman to send a request to http://localhost:{.env.PORT}/api/game_info/{functionality u want to test}

Check out this tutorial: [here](https://www.youtube.com/watch?v=Ll6knx7sFis&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=4)



### Connecting to DB
In the server code we connect to the DB with a password and username. This is stored in the .env file. You must copy over our private .env file from the discord server to the src/backend folder.

However the DB won't even attempt to connect if you IP isn't whitelisted. To get your IP whitelisted, you must send your IP to the discord server.
If you have UNIX:
```bash
nmcli device show
nmcli device show | grep IP4.ADDRESS
```

## Frontend

> You make the frontend by `npx create-react-app frontend`
> This is what our chorus-lapilli looked like

### Running the frontend

*In the src/frontend folder*
*Note: you must have the backend running for the frontend to function, right now the backend connection is using dummy stuff.*

```bash
npm start
```

Or from the proj folder:

```bash
./front.sh
```



## Tutorial position
MongoDB not working yet: https://www.youtube.com/watch?v=s0anSjEeua8&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=4


