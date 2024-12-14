var express = require('express');
var router = express.Router();
const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/check_login', async function(req, res, next) {
  const email_user = req.body.username_email_login;
  const password = req.body.password_login;
  let type;
  
  if(email_user.includes('@')){
    type = 'email';
  }else{
    type = 'username';
  }

  if(await database.user.isLoginRight(email_user, type, password)){
    if(type == 'email'){
      req.session.user = {
        username: database.user.getUsernameByEmail(email_user),
        email: email_user
      };
    }else{
      req.session.user = {
        username: email_user,
        email: database.user.getEmailByUsername(email_user)
      };
      
    }

    res.redirect(`http://${req.get('host')}/chat`);
  } else {
    req.session.error = "Incorrect username or password.";
    res.redirect(`http://${req.get('host')}/login`);
  }

});

router.post('/check_register', async function(req, res, next) {
  const email = req.body.email;
  const username = req.body.username_register;
  const password = req.body.password_register;

  if(await database.user.register(username, email, password)){
    req.session.user = {
      email: email,
      username: username
    };
    app.locals.islog = true;
    
    res.redirect(`http://${req.get('host')}/chat`);
  } else {
    req.session.error = "Incorrect username or password.";
    res.redirect(`http://${req.get('host')}/login#register`);
  }
});

module.exports = router;