var express = require('express');
const { isLoggedIn } = require('../middleware/auth');
var { getRecentPosts } = require('../middleware/posts');
var router = express.Router();

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Luca Morgan", js:["index.js"]});
});

router.get("/login", function(req, res){
  res.render('login',{ title: 'Login'});
});

router.get('/registration', function(req, res){
  res.render('registration', { title: 'Registration', js:["validation.js"]});
});

router.get('/postvideo', isLoggedIn, function(req, res){
  res.render('postvideo', { title: 'Post Video'});
});





module.exports = router;