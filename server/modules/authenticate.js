const jtw = require('jsonwebtoken');

module.exports.verify = function(req, res){
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization || req.token;
  token = token.replace(/^Bearer\s*|^bearer\s*/, '');
  if(token){
    jwt.verify(token, req.app.get('token-key'))
      .then(function(){
        next()
      })
      .catch(function(req, res){
        console.log("Failed to authenticate token");
        res.json({success : false});
      })
  }
  else{
    console.log("No token");
    res.json({success : false})
  }
};

module.exports.sign = function(req, payload, options = {expiresIn : 100000}, callback){
  if(typeof options === "function"){
    callback = options;
    options = {expiresIn : 100000};
  }
  jtw.sign(payload, req.app.get('tokenSecret'), options, function(error, token){
    if(error){
      console.log("Error from tokenAuth.js .sign method",error);
    }
    callback(error, token);
  })
}
