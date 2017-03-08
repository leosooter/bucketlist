console.log("bucketController file has loaded");

angular.module('app')
  .controller('mainController', ['$scope', '$location', 'bucketFactory', 'tokenService', 'userFactory', function($scope, $location, bucketFactory, tokenService, userFactory){

    //User methods


    console.log("userFactory.currentUser =", userFactory.currentUser);



    userFactory.getUsers()
      .then(function(response){
        $scope.users = response.data;
        console.log("$scope.users =", $scope.users);
        for(let user of $scope.users){
          const userId = tokenService.getUserFromToken()._id;
          console.log("userFromToken = ", userId , "user._id = ", user._id);
          if(user._id === userId){
            $scope.currentUser = user;
          }
        }
        if($scope.currentUser){
          console.log("$scope.currentUser =", $scope.currentUser);
        }
        else{
          console.log("No logged in user");
        }
      })
      .catch(function(error){
        console.log("getUsers error", error);
      })
    $scope.viewUser = userFactory.viewUser;

    $scope.viewOther = function(id){
      userFactory.getOneUser(id)
        .then(function(response){
          userFactory.viewUser = response.data;
        })
      $location.path("others");

    }

    $scope.logout = function(){
      console.log("mainController logout method");
      userFactory.logout();
      $scope.currentUser = undefined;
      $location.path("login");
    }

    // bucket methods
    $scope.refreshBuckets = function(){
      bucketFactory.getBuckets()
        .then(function(response){
          $scope.buckets = response.data;
        })
        .catch(function(error){
          console.log("refreshBuckets error", error);
        })
    }

    $scope.checkBucket = function(id){
      bucketFactory.checkBucket(id)
        .then(function(response){
          $scope.refreshBuckets;
        })
    }

    $scope.addBucket = function(){
      if(!$scope.newBucket.otherUserId){
        $scope.newBucket.otherUserId = undefined;
      }
      $scope.newBucket.bucket.done = false;
      $scope.newBucket.bucket._user = $scope.currentUser._id;
      bucketFactory.addBucket($scope.newBucket);
      $scope.newBucket = {};
    };

    $scope.getOneBucket = function(id){
      bucketFactory.getOneBucket(id)
      .then(function(response){
        console.log("response from getOneBucket", response);
        $scope.oneBucket = response.data;
      })
      .catch(function(error){
        console.log("error from getOneBucket", error);
      })
    }

    $scope.deleteBucket = function(){
      bucketFactory.deleteBucket(bucketId);
    };


    $scope.refreshBuckets();

  }])
