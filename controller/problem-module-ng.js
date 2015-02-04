//Problem Module
/*
* Este controlador maneja la pantanlla docenteProblema.html la cual permite el ingreso de los datos de un problema y su posterior guardado
*/
var problem = angular.module("problemModule", []);
//Modulo de FileDialog para guardar/cargar archivos con angular y node web-kit https://github.com/DWand/nw-fileDialog
var app = angular.module('app', ['DWand.nw-fileDialog']); 
//Paint default canvas configuration
var c = document.getElementById("graficoDocente");
var ctx = c.getContext("2d");

//ESferA
ctx.arc(200,150,70,30,(Math.PI/180)*360,true);
ctx.fillStyle="#f99";
ctx.fill();

ctx.moveTo(40,50);
ctx.lineTo(460,50);
ctx.moveTo(40,40);
ctx.lineTo(40,60);
ctx.font = "20px Arial";
ctx.fillText("0",35,80);
ctx.moveTo(460,40);
ctx.lineTo(460,60);
ctx.stroke();

problem.controller('problemCtrl', ['$scope', function($scope) {
	$isWritten = false;
	$isLong = false;
	$tooLong = false;
	$scope.showButton = true;

	$scope.change = function() {
		console.log(this.dmax);		

		this.dmaxErrorMsg = "";

		$isWritten = true;
		ctx.font = "20px Arial";

		if(this.dmax > 9999){
			$isLong = true;
		}

		if (this.dmax == null) {
			this.dmax = "";
		};

		if (isNaN(this.dmax)) {
			this.dmaxErrorMsg = "Ingrese Numeros";
		}else if(this.dmax > 999999){
			$bigNum = this.dmax;
			this.dmaxErrorMsg = $bigNum + " muy grande"
			this.dmax = $bigNum;
		}

		if($isLong){
			ctx.fillText(this.dmax,420,80);
		}else{
			ctx.fillText(this.dmax,440,80);
		}

		if ($isWritten) {
			if($isLong){
				ctx.clearRect(400, 60, 420, 80);
				$isLong = false;
				$isWritten = false;
				ctx.fillText(this.dmax,420,80);
			}else{
				ctx.clearRect(420, 60, 440, 80);
				$isWritten = false;
				ctx.fillText(this.dmax,440,80);
			}
		};
	};
	guardar= function($scope){
		console.log("Comienza el intento de guardado");
		$scope.get("../controller/guardarArchivo.js").success(function(){});
	};
	
}]);


