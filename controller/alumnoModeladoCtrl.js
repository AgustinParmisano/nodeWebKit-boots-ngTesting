app.controller('alumnoModeladoCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {
	
	$scope.problema=$routeParams.problema.substring(9,$routeParams.problema.length);
	//alert($scope.problema);
	var parsed=JSON.parse($scope.problema);
	$scope.problema=parsed;
	$scope.enunciado=$scope.problema.enunciado;
	$scope.experimento=$routeParams.experimento.substring(12,$routeParams.experimento.length);
	var exp=JSON.parse($scope.experimento);
	$scope.experimento=exp;
	console.log($scope.experimento);

	
	/*creo el canvas con los parametros del problema y del experimento*/
    setupCanvas($scope.problema.dmax);
    this.graficErrorMsg = "";
  	graficarPorcion(parseInt($scope.experimento.xInicial), parseInt($scope.experimento.xFinal), $scope);
	drawChart($scope);
	
	
	$scope.diagramar= function(){
		$scope.pruebas.r=$scope.r1;
	}

}]);

function setupCanvas(dmax){

    var oldcanv = document.getElementById('graficoAlumno');
    var canvDiv = document.getElementById('canvasDiv');

    canvDiv.removeChild(oldcanv);
 	
 	var canv = document.createElement('canvas');
	canv.id = 'graficoAlumno';

    canv.width= "600";
    canv.height="300";
    canv.class = "center-block";

    canvDiv.appendChild(canv);

    c = document.getElementById("graficoAlumno");
    ctx = c.getContext("2d");
    crearLinea(dmax);
}

function crearLinea(dmax){
    /*Esto grafica la recta*/
    ctx.moveTo(50,50);
    ctx.lineTo(550,50);
    ctx.moveTo(50,40);
    ctx.lineTo(50,60);
    ctx.font = "20px Arial";
    ctx.fillText("0",35,80);
    ctx.fillText(dmax,550,80);
    ctx.moveTo(550,40);
    ctx.lineTo(550,60);
    ctx.stroke();
    ctx.fill();
    ctx.fillText("",520,80);
};

function graficarPorcion(ini, fin, scope){
	var finPos = Math.round(490 / scope.problema.dmax * fin + 60)
	var iniPos = Math.round(490 / scope.problema.dmax * ini + 60)

    ctx.moveTo(50,50);
    ctx.lineTo(550,50);
    ctx.moveTo(iniPos,40);
    ctx.lineTo(iniPos,60);
    ctx.font = "20px Arial";
    ctx.fillText(ini,iniPos,80);
    ctx.moveTo(finPos,40);
    ctx.lineTo(finPos,60);
    ctx.fillText(fin,finPos,80);
    ctx.stroke();
    ctx.fill();
    ctx.fillText("",520,80);
};

