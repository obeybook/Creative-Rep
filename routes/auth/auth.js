module.exports = {
    authInfo : function(req, res){
        if( req.session.is_logined ){
          return true;
        }else{
          return false;
        }
    }
}
