//Login Module
var login = angular.module("loginModule", []);

login.controller("loginButtonCtrl", function loginButton($scope) {
	$scope.showButton = true;
	$scope.showForm = false;

	$scope.click = function() {
		$scope.showButton = !$scope.showButton;
		$scope.showForm = !$scope.showForm;
	};

	$scope.login = function(){
		console.log($scope.name);
		console.log($scope.pass);
		if (($scope.name == "docente") && ($scope.pass == "docente")){
			console.log("ENTRA EL DOCENTE");
			window.location.href="/docenteProblema.html";
		};
	}

});