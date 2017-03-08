console.log("tokenService file has loaded");

angular.module('app')
  .service('tokenService', ['$window', function($window){
    console.log("tokenService initiated");
    this.parseJWT = function(token){
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    };

    this.saveToken = function(token){
      $window.localStorage.jwtToken = token;
    };

    this.getToken = function(){
      return $window.localStorage.jwtToken;
    };

    this.getUserFromToken = function(){
      const token = this.getToken();

      if(!token){
        return false;
      }

      const params = this.parseJWT(token)
      console.log("token params =", params);

      return params._doc;
    }

    this.deleteToken = function(){
      $window.localStorage.jwtToken = '';
    }

    this.isAuth = function(){
      const token = this.getToken();

      if(!token){
        return false;
      }

      const params = this.parseJWT(token)

      return Math.round( new Date().getTime() / 1000) <= params.exp;
    }



  }]);
