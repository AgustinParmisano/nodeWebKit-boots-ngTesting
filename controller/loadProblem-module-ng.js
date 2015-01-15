//Load Problem Module
var loadProblem = angular.module("loadProblemModule", []);

loadProblem.controller('loadProblemCtrl', ['$scope', function($scope) {

	$scope.cargarArchivo = function() {
		console.log("Aca hay que hacer que elija el archivo del problema a resolver");
	};
	$scope.cargarDefault = function() {
		/*Esto lo uso para probar y entrar a la vista del alumno pero se podria cargar un datos por defaut*/
		console.log("Cargar Problema por defecto");
		$currentPath = window.location;
		$currentString = String($currentPath);
		console.log("CURRENT STRING: " + $currentString);
		$localPath = $currentString;//.slice(0,-10); //PARA NODE WEB KIT
		//esto hay que arreglarlo
		$destinationPath = "http://localhost:8080/view/alumnoProblema";
		console.log("DESTINATION: " + $destinationPath);
		window.location.href=$destinationPath;
	};
}]);
