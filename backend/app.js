const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const AuthtRoutes = require('./routes/AuthRoutes');
const PollRoutes = require('./routes/PollRoutes')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json()); 
app.use(cors({
    origin: 'http://localhost:3001', // Replace with your frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/Auth', AuthtRoutes);
app.use('/api/polls', PollRoutes);

module.exports = app;
