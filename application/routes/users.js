var express = require('express');
var router = express.Router();
var db = require('../conf/database');
var bcrypt = require('bcrypt');

//localhost:3000/users/register
router.post('/register', async function(req, res, next) {
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
    return res.redirect('login');
  } else {
    var [rows, fields] = await db.execute(`select id, username,password,email from users where username=?;`, [username]);
    var user = rows[0];
    if(!user) {
      return res.redirect('/login');
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

router.get('/profile/:id(\\d+)', function(req, res){
  res.render('profile', { title: 'Profile'});
});

router.post('/logout', async function(req, res, next) {
  req.session.destroy(function(err) {
    if(err){
      next(error);
    }
    return res.redirect('/');
  })
});

module.exports = router;
