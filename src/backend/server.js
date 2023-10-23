require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');

const app = express();

const gameRoutes = require('./routes/game_info');

// express.json() is a middleware that parses json data
app.use(express.json());

// middleware, this will run before any get request
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// request is what we get from the client
// response is what we send to the client
app.get('/', (req, res) => {
    res.json({mssg: 'Hello World'});

    // figure out if signed in and send to
    // /login


    // or /game/GAMEID


})

app.use('/api/game_info', gameRoutes);


app.listen(process.env.PORT, () => {
    console.log('server is running on port', process.env.PORT); 
});


// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then((result) => {
        console.log('connected to db');
    })
    .catch((err) => console.log(err));