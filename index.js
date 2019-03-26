const path = require('path');
const helmet = require('express');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');

const connectToMongoDB = require('./config/connectToMongo').connect;
const appRouter = require('./routes/appRouter').appRouter;

const port = process.env.PORT || 3000;

//Initializing app
const app = express();

//Middlewares
app.use(helmet());
app.use(express.static(path.join(__dirname,'./public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Setting Views
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'./views'));

//Routes
app.use(appRouter);

//connect to mongodb
connectToMongoDB()
.then(coonection => console.log('mongoDB connected'))
.catch( err => console.error('An error happened', err));


//starting server
app.listen(port, (req,res) => {
    console.log(`please visit http://localhost:${port}`);
});