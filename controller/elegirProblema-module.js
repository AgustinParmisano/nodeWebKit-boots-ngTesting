//ElegirProblema Module
app.controller('elegirProblemaCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {

	$scope.generarProblema = function(){
		$destinationPath = "view/docenteProblema.html";
		window.location.href=$destinationPath;
	}
	
	$scope.cargarProblema= function(){
		$location.path('/cargarProblema');
	}

}]);