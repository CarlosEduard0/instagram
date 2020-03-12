const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const { Server } = require('http');
const socketio = require('socket.io');

const mongoConfig = require('./config/mongo');
const routes = require('./routes');

mongoose.connect(`mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express(); 
const server = Server(app);
const io = socketio(server);

app.use((request, response, next) => {
    request.io = io;
    next();
});

app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(routes);

server .listen(3333);