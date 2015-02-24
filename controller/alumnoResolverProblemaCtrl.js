
 app.controller('alumnoResolverProblemaCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {

	
	$scope.problema=$routeParams.problema.substring(9,$routeParams.problema.length);
	alert($scope.problema);
	//$scope.problema=;
	$scope.enunciado=$scope.problema;
		
}]);