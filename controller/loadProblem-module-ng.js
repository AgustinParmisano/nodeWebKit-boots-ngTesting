//Load Problem Module
/*
* Este controlador maneja la vista alumnoEjelirProblema.html que permite al alumno cargar el archivo de un problema provisto por el docente 
* o elegir un problema por default
*/
var loadProblem = angular.module("loadProblemModule", []);

loadProblem.controller('loadProblemCtrl', ['$scope', function($scope) {
	/*En esta variable seteo el contenido del json*/
	$archivo= null;	
	
	//Cargar el problema por default
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

	//Guarda el archivo cargado en una variable
    $scope.saveContent = function($fileContent){
        //$scope.content = $fileContent;
        this.problema = $fileContent;
        console.log("JSON: " + this.problema);
		$archivo=JSON.parse(this.problema);
		$scope.enunciado=$archivo.enunciado;
    };
	
	
}]);

//Cargar el archivo previsto por el docente
loadProblem.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();

				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});

loadProblem.service('problemaJson', function () {
	var problema = this.problema;
});

