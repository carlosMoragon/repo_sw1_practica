const bcrypt = require('bcrypt');

users = {};

users.data = {};
users.email_user = {};


users.getUsernameByEmail = function(email){
    return users.email_user[email];
}

users.getEmailByUsername = function(username){
    return users.data[username].email;
}

users.generateHash = function(password, callback){
    bcrypt.hash(password, 10, callback);
}

users.comparePass = async function(password, hash){
    return await bcrypt.compare(password, hash);
}

users.register = function(username, email, password){
    if(users.data.hasOwnProperty(username)){
        throw new Error(`Ya existe el usuario ${username}.`);
    }
    if(users.data.hasOwnProperty(email)){
        throw new Error(`Ya existe el usuario ${email}.`);
    }
    users.generateHash(password, function(err, hash){
        if(err){
            throw new Error(`Error al generar el hash de ${username}.`);
        }
        users.data[username] = {username, email, hash, last_Login: new Date().toISOString};
        users.email_user[email] = username;
    });
}

users.isLoginRight = async function(email_user, type, password){
    if(type == 'email'){
        if(!users.email_user.hasOwnProperty(email_user)){
            return false;
        }
        return await users.comparePass(password, users.data[users.email_user[email_user]].hash);    
    }else{
        if(!users.data.hasOwnProperty(email_user)){
            return false;
        }
        return await users.comparePass(password, users.data[email_user].hash);
    }
    
}

module.exports = users;