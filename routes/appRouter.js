const express = require('express');

const appRouter = express.Router();

appRouter.get('/', (req,res) => {
    res.render('login');
});

appRouter.post('/login', (req,res) =>{

});

appRouter.get('/signup', (req,res) => {
    res.render('signup.ejs');
})

module.exports = {
    appRouter
}