console.log("app.js file has loaded");
const app = angular.module('app', ['ngRoute']);

app.config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider){
  console.log("app.js has loaded");
  $httpProvider.interceptors.push('tokenInterceptor');

  $routeProvider
    .when('/', {
      controller : 'loginController',
      templateUrl : 'partials/_login.html',
    })
    .when('/dashboard', {
      controller : 'mainController',
      templateUrl : 'partials/_dashboard.html',
    })
    .when('/others', {
      controller : 'mainController',
      templateUrl : 'partials/_others.html',
    })
    .otherwise('/')
}])
