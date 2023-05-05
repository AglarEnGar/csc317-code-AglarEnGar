var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Luca Morgan", js:["index.js"]});
});

router.get("/login", function(req, res){
  res.render('login',{ title: 'Login'});
});

router.get('/registration', function(req, res){
  res.render('registration', { title: 'Registration', js:["validation.js"]});
});

router.get('/postvideo', function(req, res){
  res.render('postvideo', { title: 'Post Video'});
});



router.get('/viewpost/:id(\\d+)', function(req, res){
  res.render('viewpost', { title: 'View Post'});
});

module.exports = router;