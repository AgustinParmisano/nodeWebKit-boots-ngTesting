var app= angular.module("taller", ['ngRoute']);
app.config(function($routeProvider){
		 $routeProvider
			 .when("/", {
			 controller: "loadProblem",
			 templateUrl: "app.html"
		 })	 
 });
 app.controller("loadProblem", function($scope){
  $scope.model = {
    message: "This is my app!!!"
  }
});