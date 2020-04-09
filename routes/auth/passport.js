module.exports = function (app) {
    const connection = require("../../lib/db.js");
    const bcrypt = require('bcrypt');
    const session = require('express-session');
    const FileStore = require('session-file-store')(session)
    const compression = require('compression');
    const passport = require('passport'), 
    LocalStrategy = require('passport-local').Strategy;
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(compression());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        store: new FileStore(),
        cookie:{
            secure: false
        }
    }))

    passport.serializeUser(function(user, done){
        // console.log('serializeUser',user);
        done(null, user);
    });
    
    passport.deserializeUser(function(id, done){
        // console.log('deserializeUser', id);
        done(null, id)
    })
  
    passport.use(new LocalStrategy(
        {
            usernameField: 'id',
            passwordField: 'pw'
        },
        function(username, password, done){
            connection.query('SELECT * FROM user_info where _id = ?', [username] , function(err, result){
                if(err){
                    console.log(error);
                }else{
                    if(result.length === 0){
                        console.log('존재하지 않는 아이디입니다.');
                    }else {
                        if( !bcrypt.compareSync(password, result[0].password) ){
                            console.log('비밀번호가 일치하지 않습니다.');
                        }else{
                            return done(null, result[0]);
                        }
                    }
                }
            })
        }
    ))
    return passport;
}