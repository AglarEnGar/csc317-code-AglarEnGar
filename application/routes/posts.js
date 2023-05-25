var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = require('../conf/database');

const { isLoggedIn } = require("../middleware/auth");
const { makeThumbnail, getPostById, getCommentsForPostById } = require('../middleware/posts');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/videos/uploads')
    },
    filename: function (req, file, cb) {
        var fileExt = file.mimetype.split("/")[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
    }
  });
  
  const upload = multer({ storage: storage });
  

router.post("/create", isLoggedIn, upload.single("uploadVideo"), makeThumbnail, async function(req, res, next) {
    var { title, description } = req.body;
    var { path, thumbnail } = req.file;
    var { userId } = req.session.user;

    try{
        var [insertResult, _ ] = await db.execute(
            `INSERT INTO posts (title, description, video, thumbnail, fk_userId) VALUE (?,?,?,?,?);`,
            [title, description, path, thumbnail, userId]
        );

        if(insertResult && insertResult.affectedRows){
            req.flash('success', 'Your post was created!');
            return req.session.save(function(error){
                if(error) next(error);
                return res.redirect('/');
            });
        }else{
            next(new Error('Post could not be created'));
        }
    }catch(error){
        next(error);
    }
});

router.get('/:id(\\d+)', getPostById, getCommentsForPostById, function(req, res){
    res.render('viewpost', { title: `View Post ${req.params.id}`});
  });

router.get("/search", async function(req, res, next){
    var {searchValue}= req.query;
    try {
        var [rows, _] = await db.execute(
            `select id,title,thumbnail, concat_ws(' ', title, description) as haystack
            from posts
            having haystack like ?;`,
            [`%${searchValue}%`]
        );

        if(rows && rows.length == 0){
            req.flash('error', 'No results found');
            return res.redirect('/');
        }else{
            res.locals.posts = rows;
            return res.render('index');
        }
    }catch(error){
        next(error);
    }
});

router.get("/delete/:id", getPostById, getCommentsForPostById, async function(req, res, next){
    var { id } = req.params;
    console.log(id);
    try {

        let [posts, _ ] = await db.execute("SELECT * FROM posts WHERE id=?", [id]);

        let [comments, _1] = await db.execute("SELECT id FROM comments WHERE fk_postId=?", [id]);


              
        if (posts.length)
        {
            if (comments.length)
            {
                await  db.execute(`DELETE FROM csc317db.comments WHERE (fk_postId = ?);`, [id]);
                console.log(`Deleted comment ${id} yay1!`);
            }
            await db.execute(`DELETE FROM csc317db.posts WHERE id=?;`, [id]);
        }
        else {
            return res.send("NO NO NO, U NAUGHTY NO FUCKY WUCKY WITH THE PARAMY WAMMIES");
        }
        res.redirect("back"); 
            
    }catch(error) {
        next(error);
    } 
    
});



module.exports = router;