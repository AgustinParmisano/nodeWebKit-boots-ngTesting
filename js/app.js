var graficadorApp = angular.module('graficadorApp', [
  'ngRoute', "loginModule"]);

graficadorApp.config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'index.html',
        controller: 'loginButtonCtrl'
      })
      .when('/docenteElegirProblema', {
        templateUrl: '/view/docenteElegirProblema.html',
        controller: 'elegirProblemaCtr'
      })
      .otherwise({
        redirectTo: '/'
      });
  });