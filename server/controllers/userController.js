const path = require('path');
const User = require(path.resolve('server', 'models', 'userModel'));
const Bucket = require(path.resolve('server', 'models', 'bucketModel'));
const sign = require(path.resolve('server', 'modules', 'authenticate')).sign;

module.exports = {

  getUsers : function(req, res){
    console.log("getUsers method");
    User.find({})
      .populate('buckets')
      .then(function(users){
        console.log("getUsers method success");
        res.json(users);
      })
      .catch(function(error){
        console.log("getUsers method error",error);
        res.json({success : false, error : error});
      })
  },

  getOneUser : function(req, res){
    console.log("//////////////////////// getOneUser method");
    const id = req.params.id
    User.findOne({_id : id})
      .populate('buckets')
      .then(function(user){
        console.log("/////////////// getOneUser method success");
        res.json(user)
      })
      .catch(function(error){
        console.log("getOneUser method error",error);
        res.json({success : false, error : error});
      })
  },

  addUser : function(req, res){
    console.log("addUser method");
    User.create(req.body)
      .then(function(user){
        console.log("addUser method user created: user =", user);
        sign(req, user, function(error, token){
          console.log("signing token");
          if(error){
            console.log("error with sign method in addUser method", error);
            res.json({success : false, error : error});
          }
          console.log("addUser method success");
          res.json({success : true, user : user, token : token});
        })
      })
      .catch(function(error){
        console.log("addUser error", error);
        res.json({success : false, error : error});
      })
  },

  login : function(req, res){
    console.log("login method");
    const name = req.body.name;
    User.findOne({name : name})
    .then(function(user){
      sign(req, user, function(error, token){
        if(error){
          console.log("error with sign method in login method", error);
          res.json({success : false, error : error});
        }
        console.log("Successfully logged in user");
        res.json({success : true, user : user, token : token});
      })
    })
    .catch(function(error){
      console.log("login error", error);
      res.json({success : false, error : error});
    })
  },

  deleteUser : function(req, res, id){
    console.log("deleteUser method");
    User.findOne({_id : id})
      .then(function(user){
        user.remove();
        console.log("deleteUser method success");
        res.json(user)
      })
      .catch(function(error){
        console.log("deleteUser method error",error);
        res.json({success : false, error : error});
      })
  },

}
