//Experiment Module
/*
* Este modulo maneja la pantalla alumnoProblema 
*/
var experiment = angular.module("experimentModule", ["loadProblemModule"]);

//Paint default canvas configuration
var c = document.getElementById("graficoExperimento");
var ctx = c.getContext("2d");
ctx.moveTo(40,50);
ctx.lineTo(460,50);
ctx.moveTo(40,40);
ctx.lineTo(40,60);
ctx.font = "20px Arial";
ctx.fillText("0",35,80);
ctx.moveTo(460,40);
ctx.lineTo(460,60);
ctx.stroke();

experiment.controller('experimentCtrl', ['$scope', function($scope, json) {
	$isWritten = false;
	$isLong = false;
	$tooLong = false;
	
	$scope.enunciado="Esto es el enunciado";
	$scope.dmax=1000;
	$scope.costo=0;
	console.log(json);

	$scope.change = function() {
	
		console.log(this.xfin);	

		this.xfinErrorMsg = "";

		$isWritten = true;
		ctx.font = "20px Arial";

		if(this.xfin > 9999){
			$isLong = true;
		}

		if (this.xfin == null) {
			this.xfin = "";
		};

		if (isNaN(this.xfin)) {
			this.xfinErrorMsg = "Ingrese Numeros";
		}else if(this.xfin > 999999){
			$bigNum = this.xfin;
			this.xfinErrorMsg = $bigNum + " muy grande"
			this.xfin = $bigNum;
		}

		if($isLong){
			ctx.fillText(this.xfin,420,80);
		}else{
			ctx.fillText(this.xfin,440,80);
		}
		if (this.xini != "" && this.xini>this.xfin) {
			this.xiniErrorMsg = "X inicial debe ser menor a X final"
		}else{
			this.xiniErrorMsg = ""
		};

		if ($isWritten) {
			if($isLong){
				ctx.clearRect(400, 60, 420, 80);
				$isLong = false;
				$isWritten = false;
				ctx.fillText(this.xfin,420,80);
			}else{
				ctx.clearRect(420, 60, 440, 80);
				$isWritten = false;
				ctx.fillText(this.xfin,440,80);
			}
		};
	};
	$scope.changeIni = function() {
	
		console.log(this.xini);		

		this.xiniErrorMsg = "";

		$isWritten = true;
		ctx.font = "20px Arial";

		if(this.xini > 9999){
			$isLong = true;
		}

		if (this.xini == null) {
			this.xini = "0";
		};

		if (isNaN(this.xini)) {
			this.xiniErrorMsg = "Ingrese Numeros";
		}else if(this.xini > 999999){
			$bigNum = this.xini;
			this.xiniErrorMsg = $bigNum + " muy grande"
			this.xini = $bigNum;
		}
		if ($isWritten) {
			if($isLong){
				ctx.clearRect(20, 60, 440, 80);
				$isLong = false;
				$isWritten = false;
				ctx.fillText(this.xini,20,80);
			}else{
				ctx.clearRect(20, 60, 440, 80);
				$isWritten = false;
				ctx.fillText(this.xini,20,80);
			}
		
		};
		if (this.xfin != "" && this.xini>this.xfin) {
			this.xiniErrorMsg = "X inicial debe ser menor a X final"
		}else{
			this.xiniErrorMsg = ""
		};
	};
	
	$scope.calcularPasos = function(){
		console.log("calcularPasos tira error en el html");
	}
	
	/* Despues de establecer el experimento hay que pasar a la vista del problema, 
	habiendo validado previamente los datos correspondientes*/
	$scope.continuar= function(){
		/*Validar y enviar datos*/
	
		console.log("Pasar a experimento alumno");
		$currentPath = window.location;
		$currentString = String($currentPath);
		console.log("CURRENT STRING: " + $currentString);
		$localPath = $currentString;//.slice(0,-10); //PARA NODE WEB KIT
		//esto hay que arreglarlo
		$destinationPath = "http://localhost:8080/view/alumnoModelado";
		console.log("DESTINATION: " + $destinationPath);
		window.location.href=$destinationPath;
	};
	
	
}]);

