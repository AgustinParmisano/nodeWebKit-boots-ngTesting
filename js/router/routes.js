angular.module("taller", ["ngRoute"]).config(function($routeProvider){
		 $routeProvider
			 .when("/", {
			 controller: "loadProblem",
			 controllerAs: "vm",
			 templateUrl: "/view/vistaGeneral.html
		 })
	 });
	 .controller("loadProblem", function(){
		
	 )
 });