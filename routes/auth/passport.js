module.exports = function (app) {
    const connection = require("../../lib/db.js");
    const sessionDB = require("../../lib/sessionDB.js");
    const bcrypt = require('bcrypt');
    const session = require('express-session');
    const MySQLStore = require('express-mysql-session')(session);
    const compression = require('compression');
    const passport = require('passport'), 
    LocalStrategy = require('passport-local').Strategy;
    const flash = require('connect-flash');

    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(compression());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        store : new MySQLStore(sessionDB),
        // store: new FileStore(),
        cookie:{
            secure: false
        }
    }))
    app.use(flash());

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
                    console.log(username)
                    if(username === '' || password === ''){
                        return done(null, false, {
                            message : '아이디와 비밀번호를 입력하세요.'
                        })
                    }else{
                        if(result.length === 0){
                            return done(null, false, {
                                message : '존재하지 않는 아이디 입니다.'
                            })
                        }else {
                            if( !bcrypt.compareSync(password, result[0].password) ){
                                return done(null, false, {
                                    message : '비밀번호가 일치하지 않습니다.'
                                })
                            }else{
                                return done(null, result[0]);
                            }
                        }
                    }
                }
            })
        }
    ))
    return passport;
}