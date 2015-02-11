//Load Problem Module
/*
* Este controlador maneja la vista alumnoEjelirProblema.html que permite al alumno cargar el archivo de un problema provisto por el docente 
* o elegir un problema por default
*/
var loadProblem = angular.module("loadProblemModule", []);

loadProblem.controller('loadProblemCtrl', ['$scope', function($scope) {
	
	//Cargar el archivo previsto por el docente
	$scope.cargarArchivo = function() {
		console.log("Aca hay que hacer que elija el archivo del problema a resolver");

		// Check for the various File API support.
		if (window.File && window.FileReader && window.FileList && window.Blob) {
		  alert('The APIs fully respond');
		} else {
		  alert('The File APIs are not fully supported in this browser.');
		}

	};
	
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

    $scope.saveContent = function($fileContent){
        //$scope.content = $fileContent;
        $problema = $fileContent;
        console.log("JSON: " + $problema);
        
    };

}]);

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
