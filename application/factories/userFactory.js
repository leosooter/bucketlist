console.log("User factory file has loaded");
angular.module('app')
  .factory('userFactory', ['$http', 'tokenService', function($http, tokenService){
    const factory = {};

    factory.viewUser = undefined;

    factory.getOneUser = function(id){
      console.log("///////////////// userFactory getOneUser method");
      return $http.get(`/user/${id}`)
    }

    factory.register = function(newUser){
      console.log("userFactory register method");
      return $http.post('/user', newUser)
    };

    factory.login = function(loginUser){
      console.log("userFactory login method", loginUser);
      return $http.post('/user/login', loginUser)
    }

    factory.logout = function(){
      console.log("userFactory logout method");
      tokenService.deleteToken();
    }

    // factory.getUserFromToken = function(){
    //   const user = tokenService.getUserFromToken();
    //   console.log("user retrieved from token = ", user);
    //   return user;
    // }


    factory.getUsers = function(){
      console.log("userFactory getUsers method");
      return $http.get('/user')
    }

    factory.updateCurrentUser = function(){
      factory.currentUser = tokenService.getUserFromToken();
    }

    return factory;
  }])
