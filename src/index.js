require('../src/models/User');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('../src/routes/authRoutes');
const requireAuth = require('../src/middleware/requireAuth');

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = `mongodb+srv://admin:pass1234@trakmi-02-ficdr.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connection.on('connected', ()=>{
    console.log('This database is connected...')
});

mongoose.connection.on('error', ()=>{
    console.log('Error, database did not connect')
});

app.get('/', requireAuth, (req, res)=>{
    res.send(`Your email address is: ${req.email}.`)
});

app.listen(3001, ()=>{
    console.log('Its on and poppin in here!')
});

