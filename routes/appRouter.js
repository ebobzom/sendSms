const express = require('express');
const cookieParser = require('cookie-parser');
const Nexmo = require('nexmo');

const appRouter = express.Router();
const appModel = require('../db/appModel').User;
const nexmo = require('../config/nexmo-config').nexmo;


//Sending message sing Nexmo

appRouter.post('/message',(req,res) => {
    if(req.body.phoneNumber && req.body.message){
        /**
         * 1. save details of who to send message to. for free account you must add number in dash board on nexmo website
         * 2. send your message.
         */
        const from = 'Elijah Bobzom';
        const to = req.body.phoneNumber;
        const messageToSend = req.body.message;

        //send message 
        
        nexmo.message.sendSms(from,to,messageToSend, (err,response) => {
            if(err){
                res.status(404).send({errMsg: 'please check your internet connection'});
            }else{
                res.render('welcome1');
            }
        });

    }else{
        res.send({msg: 'fields nust not be empty'});
    }

});

//Default route
appRouter.get('/', (req,res) => {
    res.render('mainLogin');
});

//Attempt to login
appRouter.post('/login', async (req,res) =>{
    try {
        /**
         * 1. check if user email and password match
         * 2. assign a cookie
         * 3. send user to welcome page
         * 4. if it fails send json render login page
         */

         //check if user email and password match
        const signedInUser  = await appModel.find({
            email: req.body.email,
            password: req.body.password
        }).lean().exec();

        if (signedInUser[0]){
            //assign a cookie
            res.cookie('id',req.body.email);
            res.render('welcome',{firstName: signedInUser[0].firstName})
        }else{
            res.render('login',{errMsg: 'Login failed please create an account'});
        }
        
    } catch (error) {
        console.error(error);
    }

});

//create account
appRouter.post('/signup', async (req,res) => {
/**
 * 1. check if request has all required input
 * 2. then store in database
 */
    try {
        //First check
        if(req.body.firstName && req.body.lastName && req.body.email && (req.body.password ===req.body.password1)){
            //Second step
            try {
            
                const newUser = await appModel.create(req.body);
                res.render('mainLogin');
                
            } catch (error) {
               //console.error(error);
               res.render('signup',{errMsg: "please change email or password"});
            }
        }else{
            res.render('signup',{errMsg: "please change email or password"});
        }
    
    } catch (error) {
        console.error("Error, please check your internet connection",error);
    }
   
});

appRouter.get('/logout', (req,res) => {
    res.clearCookie('id');
    res.render('mainLogin')
});

appRouter.get('/login', (req,res) => {
    res.render('mainLogin');
});
appRouter.get('/signup', (req,res) => {
    res.render('mainSignup');
});

appRouter.get('*', (req,res) => {
    res.render('mainLogin');
})

module.exports = {
    appRouter
}