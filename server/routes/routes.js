const path = require('path');
const verify = require(path.resolve('server', 'modules', 'authenticate')).verify;
const sign = require(path.resolve('server', 'modules', 'authenticate')).sign;
const userController = require(path.resolve('server', 'controllers', 'userController'));
const bucketController = require(path.resolve('server', 'controllers', 'bucketController'));

module.exports = function(router){

  //user routes
  router.get('/user', userController.getUsers)

  router.get('/user/:id', userController.getOneUser)

  router.post('/user', userController.addUser)

  router.post('/user/login', userController.login)

  //router.post('/user/:id', userController.updateUser)

  router.get('/user/delete/:id', userController.deleteUser)

  //bucket routes
  router.get('/bucket', bucketController.getBuckets)

  router.get('/bucket/:id', bucketController.getOneBucket)

  router.get('/bucket/check/:id', bucketController.checkBucket)

  router.post('/bucket', bucketController.addBucket)

  router.get('/bucket/delete/:id', bucketController.deleteBucket)

}
