console.log("User Controller file has loaded");
angular.module('app')
  .controller('loginController', ['$scope', '$location', 'userFactory', 'tokenService', function($scope, $location, userFactory, tokenService){
    console.log("User Controller has initiated");

    //$scope.currentUser = userFactory.currentUser;
    //console.log("Current User is", $scope.currentUser);

    // if($scope.currentUser){
    //   $location.path("dashboard");
    // }

    $scope.register = function(){
      console.log("userFactory register method");
      userFactory.register($scope.newUser)
        .then(function(response){
          console.log("User registered", response.data);
          $location.path("dashboard");
          
        })
        .catch(function(error){
          console.log("error");
        })
    }

    $scope.login = function(){
      userFactory.login($scope.loginUser)
      .then(function(response){
        console.log("User logged in", response.data);
        $location.path("dashboard");

      })
      .catch(function(error){
        console.log("login error", error);
      })
    }

  }])
