require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const Image = require('./models/Image'); 
const path = require('path'); // 

const app = express();

const gameRoutes = require('./routes/game_info');
const dummyRoutes = require('./routes/dummy');
const imageRoutes = require('./routes/image'); // router for image
const userRoutes = require('./routes/user_info');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get('/', (req, res) => {
    res.json({ mssg: 'Hello World' });
});

app.use('/api/game_info', gameRoutes);
app.use('/api/dummy', dummyRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/user_info', userRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
});

if (process.env.BACKEND_PERSON == "true") {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.log("ERROREED ON CONNECT", err));
}
