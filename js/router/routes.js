var app= angular.module("taller", ['ngRoute', "highcharts-ng"]);
app.config(function($routeProvider){
		 $routeProvider.
			  when('/', {
				templateUrl: 'view/inicio.html',
				controller: 'inicioCtrl'
			}).
			 when('/elegirProblema', {
				templateUrl: 'view/vistaElegirProblema.html',
				controller: 'elegirProblemaCtrl'
			}).
			
			/* when('/docenteCrearProblema', {
				templateUrl: 'vistaDocenteProblema.html',
				controller: 'docenteCrearProblemaCtrl'
			}).*/
			when('/cargarProblema', {
				templateUrl: 'view/vistaCargarProblema.html',
				controller: 'loadProblemCtrl'
			}).
			  when('/alumnoProblemaAngular/:problema', {
				templateUrl: 'view/vistaAlumnoProblema.html',
				controller: 'alumnoResolverProblemaCtrl'
			  }).
			  when('/alumnoModeladoAngular', {
				templateUrl: 'view/vistaAlumnoModelado.html',
				controller: ''
			  }).
			  otherwise({
				redirectTo: '/'
		 });		 
 });
 
var archivoProblema;
app.controller('loadProblemCtrl', ['$scope', '$location', function($scope, $location) {
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
		/*$destinationPath = "http://localhost:8080/view/alumnoProblema";
		console.log("DESTINATION: " + $destinationPath);
		window.location.href=$destinationPath;*/
		
	};

	//Guarda el archivo cargado en una variable
    $scope.saveContent = function($fileContent){
        //$scope.content = $fileContent;
        this.problema = $fileContent;
        console.log("JSON: " + this.problema);
		$archivo=JSON.parse(this.problema);
		archivoProblema = $archivo;
		$scope.archivo=$archivo;
		$scope.enunciado=$archivo.enunciado;
		
    };

    $scope.continuar = function(){
		//hay que pasarle los parametros!!!
		alert($scope.problema);
		//$location.path('/alumnoProblemaAngular/problema:', $scope.problema);
		$location.url('/alumnoProblemaAngular/problema:'+ $scope.problema);

    };
	
	
}]);

//Cargar el archivo previsto por el docente
app.directive('onReadFile', function ($parse) {
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
var problema;
app.service('problemaJson', function () {
	this.getProblema = function(){
		alert(archivoProblema.enunciado);
		$scope.problema=archivoProblema;
		return archivoProblema.enunciado;
	};
});

function experimentCtrl($scope, problemaJson){
	$scope.enunciado = problemaJson.getProblema();
	alert($scope.enunciado);

}


