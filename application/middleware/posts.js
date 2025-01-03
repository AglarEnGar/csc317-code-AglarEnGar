var pathToFFMPEG = require('ffmpeg-static');
var exec = require('child_process').exec;
var db = require('../conf/database');

module.exports = {
    makeThumbnail: function (req, res, next) {
        if (!req.file) {
            next(new Error("File upload failed"));
        } else {
            try {
                var destinationOfThumbnail = `public/images/uploads/thumbnail-${
                    req.file.filename.split(".")[0]
                }.png`;
                var thumbnailCommand = `${pathToFFMPEG} -ss 00:00:01 -i ${req.file.path} -y -s 200x200 -vframes 1 -f image2 ${destinationOfThumbnail}`;
                exec(thumbnailCommand);
                req.file.thumbnail = destinationOfThumbnail;
                next();
            } catch (error) {
                next(error);
            }
        }
    },
    getPostsForUserById: async function(req, res, next){
        var {id} = req.params;
        console.log("getPostsForUserById ID: ", id);
        try {
            let [ rows, _ ] = await db.execute(
                `select u.username, p.thumbnail, p.title, p.id, p.createdAt
                from posts p 
                join users u 
                on p.fk_userId=u.id
                where u.id=?;`,
                [id]
            );

            console.log("POSTO:", rows);
            res.locals.posts = rows;
            next();

        } catch(error) {
            next(error);
        }
    },
    getPostById: async function(req, res, next){
        var {id} = req.params;
        console.log("getPostById ID: ", req.params);
        try{
            let [rows, _ ] = await db.execute(
                `select u.username, p.video, p.title, p.description, p.id, p.createdAt
                from posts p 
                join users u 
                on p.fk_userId=u.id
                where p.id=?`,
                [id]
            );

            const post = rows[0];
            if(!post){
                res.locals.posts = rows;
                next();
            }else{
                res.locals.currentPost = post;

                next();
            }
        }catch(error){
            next(error);
        }
    },
    getCommentsForPostById: async function(req, res, next){
        var {id} = req.params;
        console.log("getCommentsForPostById ID: ", id);
        try{
            let [rows, _ ] = await db.execute(
                `select u.username, c.text, c.createdAt
                from comments c 
                join users u 
                on c.fk_authorId=u.id
                where c.fk_postId=?;`,
                [id]
            );
            res.locals.currentPost.comments = rows;
            next();
            
        }catch(error){
            next(error);
        }
    },
    getRecentPosts: async function(req, res, next){
        try{
            let [rows, _ ] = await db.execute(
                `SELECT * FROM csc317db.posts;`
            );

            res.locals.posts = rows;
            next();
            
        }catch(error){
            next(error);
        }
        
    }
}