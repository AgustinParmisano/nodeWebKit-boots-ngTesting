//Login Module
var login = angular.module("loginModule", []);

login.controller("loginButtonCtrl", function loginButton($scope) {
	$scope.showButton = true;
	$scope.showForm = false;

	$scope.click = function() {
		$scope.showButton = !$scope.showButton;
		$scope.showForm = !$scope.showForm;
	};

});