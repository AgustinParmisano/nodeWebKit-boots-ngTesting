//Modeling Module
/*
* Este controlador maneja la pantanlla alumnoModelado.html 
*/
var modeling = angular.module("modelingModule", []);

modeling.controller('modelingCtrl', ['$scope', function($scope) {

	$scope.diagramar = function() {
		//Aca hay que repintar los graficos y cargar la prueba en el listado
	};
	
	$scope.finalizar= function(){
		
	};
}]);
