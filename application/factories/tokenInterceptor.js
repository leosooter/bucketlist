console.log("tokenInterceptor file has loaded");

angular.module('app')
  .factory('tokenInterceptor', ['tokenService', function(tokenService){
    const factory = {
      request : function(config){
        console.log("tokenInterceptor request method");
        const token = tokenService.getToken();
        if(token){
          console.log("Token retrieved from localStorage");
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },

      requestError : function(config){
        console.log("tokenInterceptor requestError method");
        return config;
      },

      response : function(res){
        console.log("tokenInterceptor response method");
        console.log("Res.data.token", res.data.token);
        const token = res.data.token;
        if(token){
          console.log("Response token");
          tokenService.saveToken(token);
          console.log("Token saved to localStorage");
        }
        return res;
      },

      responseError : function(res){
        console.log("tokenInterceptor responseError method");
        return res;
      },
    }

    return factory;
}]);
