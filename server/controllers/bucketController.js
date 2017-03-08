const path = require('path');
const Bucket = require(path.resolve('server', 'models', 'bucketModel'));
const User = require(path.resolve('server', 'models', 'userModel'));

module.exports = {

  getBuckets : function(req, res){
    console.log("getBuckets method");
    Bucket.find({})
      .then(function(buckets){
        console.log("getBuckets method success");
        res.json(buckets);
      })
      .catch(function(error){
        console.log("getBuckets method error",error);
        res.json({success : false, error : error});
      })
  },

  checkBucket : function(req, res){

    Bucket.findOne({_id : req.params.id})
      .then(function(bucket){
        bucket.done = !bucket.done;
        bucket.save();
        res.json(bucket)
      })
      .catch(function(error){
        console.log("getOneBucket method error",error);
        res.json({success : false, error : error});
      })
  },

  getOneBucket : function(req, res, id){
    console.log("getOneBucket method");
    Bucket.findOne({_id : id})
      .then(function(bucket){
        console.log("getOneBucket method success");
        res.json(bucket)
      })
      .catch(function(error){
        console.log("getOneBucket method error",error);
        res.json({success : false, error : error});
      })
  },

  addBucket : function(req, res){
    console.log("addBucket method");
    const userId = req.body.bucket._user;
    const otherUserId = req.body.otherUserId;
    const bucketData = req.body.bucket;
    console.log("userId ", userId);
    console.log("otherUserId ", otherUserId);
    console.log("bucketData ", bucketData);

    User.findOne({_id : userId})
      .then(function(user){

        Bucket.create(bucketData)
          .then(function(bucket){
            console.log(`Adding bucket to ${user.name}'s list'`);
            user.buckets.push(bucket._id);
            user.save();
            if(otherUserId){
              User.findOne({_id : otherUserId})
                .then(function(otherUser){
                  console.log(`Adding bucket to ${otherUser.name}'s list'`);
                  otherUser.buckets.push(bucket._id);
                  otherUser.save();
                  console.log("addBucket method success- with additional user");
                  res.json(bucket)
                })
                .catch(function(error){
                  console.log("addBucket find otherUser error",error);
                  res.json({success : false, error : error});
                })
              }
              else{
                console.log("addBucket method success- no additional users");
                res.json(bucket)
              }
            })// End of Bucket create- .then
            .catch(function(error){
              console.log("addBucket method error",error);
              res.json({success : false, error : error});
            })

          })// End of userFind- .then
        .catch(function(error){
          console.log("addBucket method error",error);
          res.json({success : false, error : error});
        })

  },

  updateBucket : function(req, res, id){
    console.log("updateBucket method");
    Bucket.findOne({_id : id})
      .then(function(bucket){
        /////Stuff here
        console.log("updateBucket method success");
        res.json(bucket)
      })
      .catch(function(error){
        console.log("updateBucket method error",error);
        res.json({success : false, error : error});
      })
  },

  deleteBucket : function(req, res, id){
    console.log("deleteBucket method");
    Bucket.findOne({_id : id})
      .then(function(bucket){
        bucket.remove();
        console.log("deleteBucket method success");
        res.json(bucket)
      })
      .catch(function(error){
        console.log("deleteBucket method error",error);
        res.json({success : false, error : error});
      })
  },


}
