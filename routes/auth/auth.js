module.exports = {
    authInfo : function(req, res){
        if( req.user ){
          return true;
        }else{
          return false;
        }
    }
}
