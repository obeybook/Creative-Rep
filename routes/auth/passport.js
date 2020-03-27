module.exports = function (app) {
    const passport = require('passport'), 
    LocalStrategy = require('passport-local').Strategy;
    
    app.use(passport.initialize());
    app.use(passport.session());

    let userData = {
      id : 'test',
      pw : '1111'
    }
    
    passport.serializeUser(function(user, done){
        console.log('serializeUser',user);
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done){
        console.log('deserializeUser', id);
        done(null, userData)
    })
  
    passport.use(new LocalStrategy(
        {
            usernameField: 'id',
            passwordField: 'pw'
        },
        function(username, password, done){
            if(username === userData.id && password === userData.pw){
                return done(null, userData);
            } else { 
                return done(null, false, {
                    message: '정보가 올바르지 않음'
                });
            }
        }
    ))
    return passport;
}