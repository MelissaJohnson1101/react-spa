

function logInUser(username, password){
        for (var i = 0; i < UserInfo.length; i++){
            if (username == UserInfo[i].userName && password == UserInfo[i].password){
            console.log("success");
            return true;
        } 
    }
            return false;
    }