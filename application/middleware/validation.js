var validator = require('validator');
var db = require('../conf/database')
module.exports = {
    usernameCheck: function(req, res, next){
        var {username} = req.body;
        username = username.trim();
        if(!validator.isLength(username, {min:3, max:20})){
            req.flash("error", "username must be 3 or more characters");
        }

        if(!/[a-zA-Z]/.test(username.charAt(0))){
            req.flash("error", "username must begin with a character");
        }

        if(req.session.flash.error){
            res.redirect('/register');
        }else{
            next();
        }
    },
    passwordCheck: function(req, res, next){
        next();
    },
    emailCheck: function(req, res, next){
        next();
    },
    tosCheck: function(req, res, next){
        next();
    },
    ageCheck: function(req, res, next){
        next();
    },
    isUsernameUnique: async function (req, res, next) {
        var { username } = req.body;
        var { email } = req.body;
        try{
            var [rows, fields] = await db.execute(`select id from users where username=?;`, [username]);
            if(rows && rows.length > 0){
                req.flash('error', 'Username Already Taken');
                return res.redirect('/registration');
            }
            var [rows, fields] = await db.execute(`select id from users where email=?;`, [email]);
            if(rows && rows.length > 0){
                req.flash('error', 'An account with that email already exists');
                return res.redirect('/registration');
            }else{
                next();
            }    
        }catch(error){
            next(error);
        }
    },
    isEmailUnique: function (req, res, next) {
        next();
    },
};
