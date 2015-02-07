//ElegirProblema Module
var elegirProblema = angular.module("elegirProblemaModule", []);

elegirProblema.controller("elegirProblemaCtr", ['$scope', function($scope) {

	$scope.generarProblema = function(){
		//BUSCAR LA MEJOR MANERA DE HACER ROUTING
		//$currentPath = window.location;
		//$currentString = String($currentPath);
		//$localPath = $currentString;// ir pero por ahora lo mando a las variables
		$destinationPath = /*$localPath +*/ "/view/docenteProblema.html";
		window.location.href=$destinationPath;
	}
	
	$scope.cargarProblema= function(){
		//BUSCAR LA MEJOR MANERA DE HACER ROUTING
		//$currentPath = window.location;
		//$currentString = String($currentPath);
		//$localPath = $currentString;// ir pero por ahora lo mando a las variables
		$destinationPath = /*$localPath +*/ "/view/docenteCargarProblema.html";
		window.location.href=$destinationPath;
	}

}]);