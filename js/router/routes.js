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
			  when('/alumnoModeladoAngular/:problema/:experimento', {
				templateUrl: 'view/vistaAlumnoModelado.html',
				controller: 'alumnoModeladoCtrl'
			  }).
			  when('/finalizar/:problema/:experimento', {
				templateUrl: 'view/vistaAlumnoFinal.html',
				controller: 'alumnoFinCtrl'
			  }).
			  otherwise({
				redirectTo: '/'
		 });		 
 });
 
var archivoProblema;
app.controller('loadProblemCtrl', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {
	/*En esta variable seteo el contenido del json*/
	$archivo= null;	
	$scope.loaded = ($rootScope.loaded);
	
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
		$scope.loaded = true;
		localStorage.setItem('problema',$fileContent);
    };

    $scope.continuar = function(){
		//$location.path('/alumnoProblemaAngular/problema:', $scope.problema);
		//alert($scope.problema);
		$location.url('/alumnoProblemaAngular/problema');//:'+ $scope.problema);
    };
    
	$scope.problemaA = function(){
		var problema = {
				enunciado: "Detrás de una vieja estación de servicio abandonada se encuentra una cancha de fútbol de 90 m de extensión. Debajo de ella (en la primera mitad del campo) se encuentra enterrado un tanque donde se almacenaba combustible, rodeado por arenas de baja densidad (1,7 g/cm3). El tanque tiene forma esférica, con un radio de 4 m, y está lleno de agua (1 g/cm3). Realizando un modelado gravimétrico, determinar con la mayor precisión posible la ubicación y la profundidad del tanque.",
				dmax: "90",
				xo: "25",
				ro: "4",
				zo: "8",
				de: "1.7",
				di: "1.0",
				dd: "-0.7",
				costoMedicion: "300",
				costoMax: "50000"
				
			};

			$scope.problema= JSON.stringify(problema, null, 2);
			$scope.enunciado=problema.enunciado;
			$scope.loaded = true;
			localStorage.setItem('problema',$scope.problema);
		//alert(problema);
		//$location.url('/alumnoProblemaAngular/problema:'+ problema);
		
    };

	$scope.problemaB = function(){
		var problema = {
				enunciado: "En algunos barrios de la ciudad se han producido enormes pozos en calles y veredas debido a la presencia de cavernas en el subsuelo que se desmoronan al vaciarse por completo del agua que las llenaba. Particularmente, en la calle Iraola al 2669 (a 20 m de la esquina de la cuadra) un vecino ha reportado que la vereda está cediendo, por lo que se sospecha que debajo de ella se ha formado una caverna. Se sabe que el suelo está formado por arcillas de 1,8 g/cm3 de densidad y que la caverna tendría forma esférica con un diámetro de 6 m, ubicándose el techo de la misma a 12 m de profundidad. El grado de riesgo de desmoronamiento de esta caverna puede evaluarse determinando si se encuentra llena o vacía. Realizar las mediciones necesarias y el modelado correspondiente para determinar si existe peligro inminente de derrumbe o no.",
				dmax: "100",
				xo: "80",
				ro: "15",
				zo: "3",
				de: "1.8",
				di: "0",
				dd: "-1.8",
				costoMedicion: "500",
				costoMax: "100000"
				
			};
			$scope.problema= JSON.stringify(problema, null, 2);
			$scope.enunciado=problema.enunciado;
			$scope.loaded = true;
			localStorage.setItem('problema',$scope.problema);
		//alert(problema);
		//$location.url('/alumnoProblemaAngular/problema:'+ problema);
		
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


