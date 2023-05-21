var express = require('express');
var router = express.Router();
var db = require('../conf/database');
var bcrypt = require('bcrypt');
var { getPostsForUserById } = require("../middleware/posts");
var { isLoggedIn, isMyProfile } = require("../middleware/auth");
const { isUsernameUnique, usernameCheck, emailCheck, isEmailUnique, passwordCheck, ageCheck, tosCheck } = require("../middleware/validation");

//localhost:3000/users/register
router.post('/register',
  isUsernameUnique,
  usernameCheck,
  emailCheck,
  isEmailUnique,
  passwordCheck,
  ageCheck,
  tosCheck,
  async function(req, res, next) 
{
  var {username, email, password} = req.body;

  //check username uniqueness
  try {
    
    var [rows, fields] = await db.execute(`select id from users where username=?;`, [username]);
    if(rows && rows.length > 0){
      return res.redirect('/registration');
    }
    var [rows, fields] = await db.execute(`select id from users where email=?;`, [email]);
    if(rows && rows.length > 0){
      return res.redirect('/registration');
    }

    var hashedPassword = await bcrypt.hash(password, 3);

    var[resultObject, fields] = await db.execute(`INSERT INTO users
    (username, email, password)
    value
    (?,?,?);`, [username, email, hashedPassword]);
    
    if(resultObject && resultObject.affectedRows == 1){
      return res.redirect('/login');
    }else{
      return res.redirect('/registration');
    }
    
  } catch (error) {
    next(error);
  }
});

router.post('/login', async function(req, res, next) {
  
  const { username, password } = req.body;
  if (!username || !password) {
    req.flash("error", 'Log in Failed: Invalid username/password');
    return res.redirect('/login');
  } else {
    var [rows, fields] = await db.execute(`select id, username,password,email from users where username=?;`, [username]);
    var user = rows[0];
    if(!user) {
      req.session.save(function(err){
        req.flash("error", 'Log in Failed: Invalid username/password');
        return res.redirect('/login');
      });
    } else {
      var passwordMatch = await bcrypt.compare(password, user.password);
      if(passwordMatch) {
        req.session.user = {
          userId: user.id,
          email: user.email,
          username: user.email 
        };
        return res.redirect('/');
      } else {
        return res.redirect('/login');
      }
    }
  }
});

router.get('/profile/:id(\\d+)', isLoggedIn, isMyProfile, getPostsForUserById, async function(req, res){
  res.render('profile', { title: 'Profile'});
});

router.post('/logout', isLoggedIn, async function(req, res, next) {
  req.session.destroy(function(err) {
    if(err){
      next(error);
    }
    return res.redirect('/');
  })
});

module.exports = router;
