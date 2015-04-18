//ElegirProblema Module
app.controller('elegirProblemaCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {
	$scope.titulo='Bienvenido';
	$scope.generarProblema = function(){
		//$destinationPath = "view/docenteProblema.html";
		//window.location.href=$destinationPath;
		$location.path('/docenteCrearProblema');
	}
	
	$scope.cargarProblema= function(){
		$location.path('/cargarProblema');
	}

}]);