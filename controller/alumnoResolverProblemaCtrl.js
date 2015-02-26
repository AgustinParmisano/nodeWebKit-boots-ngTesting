
 app.controller('alumnoResolverProblemaCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {

	
	$scope.problema=$routeParams.problema.substring(9,$routeParams.problema.length);

	var parsed=JSON.parse($scope.problema);
	$scope.problema=parsed;
	$scope.enunciado=$scope.problema.enunciado;
	//var p=angular.fromJSON(problema);
	//alert(p);
		
}]);