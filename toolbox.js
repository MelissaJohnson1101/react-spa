var fs = require('fs');

var toolbox = {
logInUser: function(username, password, UserInfo){
        for (var i = 0; i<UserInfo.length; i++){
        if (username == UserInfo[i].userName && password == UserInfo[i].password){
            console.log("success");
            return true;
        }
    }
      return false;
    },
 signUp: function(username, UserInfo){
        for (var i = 0; i<UserInfo.length; i++){
        if (username == UserInfo[i].userName) {
            res.send("This username is already taken. Please choose another and continue.");
            return false;
        }
    }
            return true;
},
    
addNewUser: function(theUser, ourArray){
    ourArray.push(theUser);
}
};
   
    module.exports = toolbox;