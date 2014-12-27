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
		//console.log($scope.name); Testing
		//console.log($scope.pass); Testing
		this.nameErrorMsg = "";
		this.passErrorMsg = "";
		this.loginError = "";

		if (($scope.name == " ") || ($scope.name == null)){
			this.nameErrorMsg = "Debe ingresar nombre."
		}else if (($scope.pass == " ") || ($scope.pass == null)) {
			this.passErrorMsg = "Debe ingresar clave."
		}else if (($scope.name == "docente") && ($scope.pass == "docente")){
			console.log("ENTRA EL DOCENTE");
			//BUSCAR LA MEJOR MANERA DE HACER ROUTING
			$currentPath = window.location;
			$currentString = String($currentPath);
			console.log("CURRENT STRING: " + $currentString);
			$localPath = $currentString;//.slice(0,-10); //PARA NODE WEB KIT
			$destinationPath = $localPath + "docenteProblema.html";
			console.log("DESTINATION: " + $destinationPath);
			window.location.href=$destinationPath;
		}else{
			this.loginError = "No existe ese usuario."
		};
	}

});