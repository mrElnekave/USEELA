require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');

const app = express();

const gameRoutes = require('./routes/game_info');
const dummyRoutes = require('./routes/dummy');
const imageRoutes = require('./routes/image');

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
app.use('/api/image', imageRoutes);
app.use('/api/dummy', dummyRoutes);


app.listen(process.env.PORT, () => {
    console.log('server is running on port', process.env.PORT); 
});


// connect to mongodb
if (process.env.BACKEND_PERSON == "true") {
    mongoose.connect(process.env.MONGO_URI)
        .then((result) => {
            console.log('connected to db');
        })
        .catch((err) => console.log(err));
}