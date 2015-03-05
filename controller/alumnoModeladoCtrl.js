app.controller('alumnoModeladoCtrl', ['$scope', '$location', '$routeParams', '$rootScope', function($scope, $location, $routeParams, $rootScope) {
	
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
  	graficarPorcion2(parseInt($scope.experimento.xInicial), parseInt($scope.experimento.xFinal), $scope);
	//drawChart($scope);
	
	var pruebas=[];
	$scope.diagramar= function(){
		if(this.r1 != null){
			if(this.z1 != null){
				if(this.ag1 != null){
					pruebas.push({
								r: this.r1,
								z: this.z1,
								ag: this.ag1,
								error:7
						  });
				}else{
					alert("Ingrese Ag1");
				}
			}else{
				alert("Ingrese Z1");
			}
		}else{
			alert("Ingrese R1");
		}
		$scope.pruebas=pruebas;
		graficarModelo($scope);
	}
	
	$scope.finalizar= function(){
		$location.url('/finalizar/'+$routeParams.problema + '/experimento:'+$scope.experimento);
	}

}]);

function graficarModelo(scope){
		var meds = Math.round((scope.experimento.xFinal - scope.experimento.xInicial) / scope.experimento.nPasos);
		//alert(meds);

		scope.dmax=Math.min(scope.dmax, 999)
	    scope.highchartsNG = {
	        options: {
	            chart: {
	                type: 'scatter',
	                width: '600'
	            },

	            
	            xAxis: {
	            	floor: 0,
            		ceiling: parseInt(scope.problema.dmax)

	            },
	        },
	          series: [{
	            data:(function () {
	                //Fomula
	                var data = [],
	                            i,
								punto= 0 + scope.experimento.xInicial;
					data.push({
	                        x: 0,
	                        y: 0
	                    });
	                /*for (i = xini; i <= parseInt(scope.experimento.xFinal); i = i + meds) {
	                    var valorFormula1 = Math.pow(((Math.pow(i - scope.problema.xo,2)) +(Math.pow(scope.problema.zo,2))), 3/2);
	                    var valorFormula2 = scope.problema.zo / valorFormula1;
	                    var valorFormula3 = 0.027939 * scope.problema.dd * Math.pow(scope.problema.ro,3) * valorFormula2;
	                    if(isNaN(valorFormula3)){
	                      valorFormula3 = 0;  
	                    };
	   
	                    data.push({
	                        x: punto,
	                        y: valorFormula3
	                    });
						punto+=meds;
	                }*/
					data.push({
	                        x: 999,
	                        y: 0
	                    });
	                return data;
	            })()
	        }],	

	        title: {
	            text: 'Anomalía Resgistrada entre ' + scope.experimento.xInicial + " y " + scope.experimento.xFinal + " con " + scope.experimento.nPasos + " mediciones."
	        },
	        loading: false
	    }
}

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

function graficarPorcion2(ini, fin, scope){
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


