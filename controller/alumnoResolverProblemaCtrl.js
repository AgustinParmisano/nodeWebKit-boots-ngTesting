
function setupCanvas(dmax){

    var oldcanv = document.getElementById('graficoAlumno');
    var canvDiv = document.getElementById('canvasDiv');

    canvDiv.removeChild(oldcanv);
 	
 	var canv = document.createElement('canvas');
	canv.id = 'graficoAlumno';

    canv.width= "600";
    canv.height="150";
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
	var finPos = Math.round(490 / scope.dmax * fin + 60)
	var iniPos = Math.round(490 / scope.dmax * ini + 60)

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

function initChart(scope){

        scope.highchartsNG = {
        options: {
            chart: {
                type: 'line',
                width: '600'
            }
        },

        title: {
            text: 'Anomalía'
        },
        loading: false
    }
};


function drawChart(scope,xini,xfin){

		scope.problema.dmax=Math.min(xfin, 999)
	    scope.highchartsNG = {
	        options: {
	            chart: {
	                type: 'line',
	                width: '600'
	            },

	            
	            xAxis: {
	            	floor: xini,
            		ceiling: xfin,

	            },
	        },
	          series: [{
	            data:(function () {
	                //Fomula
	                var data = [],
	                            i;
	                for (i = 0; i <= parseInt(scope.problema.dmax); i++) {
	                    var valorFormula1 = Math.pow(((Math.pow(i - scope.problema.xo,2)) +(Math.pow(scope.problema.zo,2))), 3/2);
	                    var valorFormula2 = scope.problema.zo / valorFormula1;
	                    var valorFormula3 = 0.027939 * scope.problema.dd * Math.pow(scope.problema.ro,3) * valorFormula2;
	                    if(isNaN(valorFormula3)){
	                      valorFormula3 = 0;  
	                    };
	   
	                    data.push({
	                        x: i,
	                        y: valorFormula3
	                    });
	                }
	                return data;
	            })()
	        }],	

	        title: {
	            text: 'Anomalía Resgistrada entre ' + xini + " y " + xfin
	        },
	        loading: false
	    }
}

app.controller('alumnoResolverProblemaCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {

	
	$scope.problema=$routeParams.problema.substring(9,$routeParams.problema.length);

	var parsed=JSON.parse($scope.problema);
	$scope.problema=parsed;
	$scope.enunciado=$scope.problema.enunciado;

	$scope.dmax=parseInt($scope.problema.dmax);
	$scope.dd=parseInt($scope.problema.dd);
	//var p=angular.fromJSON(problema);
	//alert(p);
	$scope.costoTotal=0;
	$scope.costoAcumulado=0;

	 $scope.continuar = function(){
		//if($scope.xini != "" && $scope.xfin != "" && $scope.nPasos != "" && $scope.costoAcumulado != ""){
			var experimento = {
					xInicial: $scope.xini,
					xFinal: $scope.xfin,
					nPasos: $scope.nPasos,
					costoAcumulado: $scope.costoAcumulado
			};
			$scope.experimento= JSON.stringify(experimento, null, 2);
			$location.url('/alumnoModeladoAngular/'+$routeParams.problema + '/experimento:'+$scope.experimento);
		/*}else{
			alert("Faltan Datos");
		}*/
    };
		
}]);

app.controller('inputsCtrl', ['$scope', function($scope){
	var xInicial = $scope.xini;
	var xFinal = $scope.xfin;
	var nPasos = "";
	setupCanvas($scope.dmax);
	initChart($scope);


	$scope.changeIni = function(){
		this.xiniErrorMsg = "";
		xInicial = $scope.xini;
		if (xFinal != "" && xFinal < xInicial) {
			this.xiniErrorMsg = "Inicial debe ser menor a final"
		}else if (xInicial > $scope.dmax) {
			this.xiniErrorMsg = "Debe ser menor a la longitud"
		}else{
			this.xfinErrorMsg = "";
			this.xiniErrorMsg = "";
		};
	};

	$scope.changeFin = function(){
		this.xfinErrorMsg = "";
		xFinal = $scope.xfin;
		if (xInicial != "" && xFinal < xInicial) {
			this.xiniErrorMsg = "Final debe ser mayor a inicial"
		}else if (xFinal > $scope.dmax) {
			this.xfinErrorMsg = "Debe ser menor a la longitud"
		}else{
			this.xfinErrorMsg = "";
			this.xiniErrorMsg = "";
		};
	};

	$scope.calcularPasos = function(){
		xInicial = $scope.xini;
		xFinal = $scope.xfin;
		//Falta la formula de los costos
		//console.log("Formula de costo INI: " + xInicial + " FIN: " + xFinal);

		if( xInicial != "" && xFinal != "" && $scope.nPasos != "" && $scope.lx != ""){
			$scope.dx=$scope.lx/$scope.nPasos;
		}

	};

//}]);


//app.controller('canvasCtrl', ['$scope',  function($scope) {
	
	
	//drawChart($scope,100, 550);

	$scope.graficar = function() {
		
        var noGraficar = false;
        setupCanvas($scope.dmax);
        this.graficErrorMsg = "";

        if(this.xfin == null){
        	this.graficErrorMsg = "Complete Fin";
        	noGraficar = true;
        };

        if(this.xini == null){
        	this.graficErrorMsg = "Complete Inicio";
        	noGraficar = true;
        };


        if(this.xfin > $scope.dmax){
        	this.graficErrorMsg = "Fin debe ser menor a la longitud";
        	noGraficar = true;
        };

        if(this.xfin < this.xini){
        	this.graficErrorMsg = "Inicio debe ser menor a fin";
        	noGraficar = true;
        };

        if(!noGraficar){
        	drawChart($scope,parseInt(this.xini), parseInt(this.xfin));
        	graficarPorcion(this.xini, this.xfin, $scope);

        };
		/* No conoce coosto total de la vista*/
		/*if($scope.nPasos != ""){
			$scope.costoTotal=$scope.nPasos * $scope.problema.costoMedicion;
			console.log($scope.costoTotal + "Hay q ponerlo en la variable");
		}*/

	};

}]);

