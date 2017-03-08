console.log("bucketFactory file has loaded");

angular.module('app')
  .factory('bucketFactory', ['$http', function($http){

    const factory = {};

    factory.getBuckets = function(){
      console.log("bucketFactory getBuckets method");
      return $http.get('/bucket')
    };

    factory.getOneBucket = function(id){
      console.log("bucketFactory getOneBucket method");
      return $http.get(`/bucket/${id}`)
    };

    factory.addBucket = function(data){
      console.log("bucketFactory addBucket method");
      $http.post('/bucket', data)
        .then(function(response){
          console.log("response from addBucket", response);
          return true;
        })
        .catch(function(error){
          console.log("error from addBucket", error);
          return false;
        })
    };

    factory.checkBucket = function(id){
      return $http.get(`/bucket/check${id}`)
    }

    factory.deleteBucket = function(id){
      console.log("bucketFactory deleteBucket method");
      $http.get(`/bucket/${id}`)
      .then(function(response){
        console.log("response from deleteBucket", response);
        return true;
      })
      .catch(function(error){
        console.log("error from deleteBucket", error);
        return false;
      })
    };

    return factory;

  }])
