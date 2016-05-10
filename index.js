;(function(){
	"use strict";
	
	var PORT = 3000;
	
	var fs = require('fs');
	
	var express = require('express');
	var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');
    var config = require('./config.js');
    var UserInfo = require ("./UserInfo.js");
    var expressSession= require('express-session');
    var toolbox = require('./toolbox.js');
    var messages = require('./messages.js')
	var app = express();
    
    var userArray = [];
    
    UserInfo.readInfo(function(data){
        data = JSON.parse(data);
        userArray = data;
    });
    
    var messageArray = [];
        
    messages.readInfo('messages.txt', function(data){
        data = JSON.parse(data);
        messageArray = data;
        console.log(data, "I'm here");
    });
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(expressSession({
        secret: config.secret,
        resave: true,
        saveUninitialized: true
    }));

//    functions
    function CreateNewUser(username, password){
    this.userName= username;
    this.password= password;
};
    
//routes
   app.get("/", function(req, res){
   if (!req.session.username){
       res.redirect("/login");
        return;
    }
    res.sendFile(__dirname + '/public/index.html');
   })
    
    app.get("/messages", function(req, res){
        if (!req.session.username){
            res.send("[]");
            return;
        }
         res.send(JSON.stringify(messageArray));
    });
        
    app.post("/messages", function(req, res){
         if (!req.session.username){
            res.send("error");
            return;
        }
        
        if(!req.body.newMessage){
            res.send("error");
            return;
            
        }
        messagesArray.push(req.session.username + ": " + req.body.newMessage);
        res.send("success");
        
        message.write('messages.txt', JSON.stringify(messageArray));
                      
        res.send('success');
    });
       
    app.get("/signUp", function(req, res){
        res.sendFile(__dirname + '/public/signUp.html');
    });
    
     app.post("/signUp", function(req, res){
             if(toolbox.signUp(req.body.username, userArray)){
                var ourUser = new CreateNewUser(req.body.username, req.body.password);
                 toolbox.addNewUser(ourUser, userArray);
                 UserInfo.writeInfo("UserInfo.txt", JSON.stringify(userArray));
                 
                 req.session.username = req.body.username;
                 res.redirect("/");
                 return;
             }
         res.redirect("/login");
     });
    

     app.get("/login", function(req, res){
        res.sendFile(__dirname + '/public/login.html');
    });
    
//     app.get("/login", function(req, res){
//         if(req.body.username && req.body.password){
//             if(logInUser(req.body.username, req.body.password)){
//                 req.session.username = req.body.username;
//                 res.redirect("/");
//                 return;
//             }
//         }
//         res.redirect("/login");
//     });
    
     app.post("/login", function(req, res){
         if(req.body.username && req.body.password){
             if(toolbox.logInUser(req.body.username, req.body.password, userArray)){
                 req.session.username = req.body.username;
                 res.redirect("/");
                 return;
             }
         }
         res.redirect("/login");
     });
    
    
    app.use(express.static('public'));
    
	app.use(function(req, res, next) {
		res.status(404);
		res.send("File not found");
	});
	
	app.listen(PORT, function() {
		console.log("server started on port " + PORT);
	});
	
}());









