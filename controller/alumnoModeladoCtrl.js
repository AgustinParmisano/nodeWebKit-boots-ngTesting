function initChartModel(scope){
		console.log();
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

app.controller('alumnoModeladoCtrl', ['$scope', '$location', '$routeParams', '$rootScope', function($scope, $location, $routeParams, $rootScope) {
	
	$scope.problema=JSON.parse(localStorage.getItem('problema'));//$routeParams.problema.substring(9,$routeParams.problema.length);
	//alert($scope.problema);
	var parsed=($scope.problema);
	$scope.problema=parsed;
	$scope.enunciado=$scope.problema.enunciado;
	$scope.experimento=JSON.parse(localStorage.getItem('experimento'));//$routeParams.experimento.substring(12,$routeParams.experimento.length);
	var exp=($scope.experimento);
	$scope.experimento=exp;
	console.log("EXPERIMENT: " + $scope.experimento);
	graficarCurva($scope);

	/*creo el canvas con los parametros del problema y del experimento*/
    setupCanvas($scope.problema.dmax);
    this.graficErrorMsg = "";
    alert($scope.experimento.xInicial);
  	graficarPorcionModel(parseInt($scope.experimento.xInicial), parseInt($scope.experimento.xFinal), $scope);
	
	var pruebas=[];
	$scope.diagramar= function(){
		var graficar = true;
		this.x1errorMsg = "";
		this.r1errorMsg = "";
		this.z1errorMsg = "";
		this.dim1errorMsg = "";
		this.dem1errorMsg = "";
		this.ag1errorMsg = "";

		if(this.x1 != null){
			if(this.z1 != null){
				if(this.r1 != null){
					if(this.dem1 != null){
						if(this.dim1 != null){
							if(this.ag1 != null){
								pruebas.push({
											x: this.x1,
											r: this.r1,
											z: this.z1,
											dem: this.dem1,
											dim: this.dim1,
											ddm: this.dem1 - this.dim1,
											ag: this.ag1,
											error:7
								  });
							}else{
								graficar = false;
								this.ag1errorMsg = "Ingrese Ag1."
							}
						}else{
							graficar = false;
							this.dim1errorMsg = "Ingrese Dim1."
						}
					}else{
						graficar = false;
						this.dem1errorMsg = "Ingrese Dem1."
					}
				}else{
					graficar = false;
					this.r1errorMsg = "Ingrese R1."
				}
			}else{
				graficar = false;
				this.z1errorMsg = "Ingrese Z1."
			}
		}else{
			graficar = false;
			this.x1errorMsg = "Ingrese X1."
		}
		if (graficar) {
			$scope.pruebas=pruebas;
			graficarPorcionModel(parseInt($scope.experimento.xInicial), parseInt($scope.experimento.xFinal), $scope);
			graficarModelo($scope);
		};
	}
	
	$scope.finalizar= function(){
		$location.url('/finalizar/'+$routeParams.problema + '/experimento:'+$scope.experimento);
	}

	$scope.changeDdm = function(){
		this.ddm1 = parseInt(this.dim1) - parseInt(this.dem1);
		$scope.ddm1 = this.ddm1;
	}

}]);

function graficarCurva(scope){
		var meds = Math.round((scope.experimento.xFinal - scope.experimento.xInicial+1) / (scope.experimento.nPasos -1) );
		//alert(meds);
		//console.log(scope.problema.dmax);
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
	                        x: -1,
	                        y: 0
	                    });
	                for (i = scope.experimento.xInicial; i <= parseInt(scope.experimento.xFinal)+meds; i = i + meds) {
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
	                }
					data.push({
	                        x: 9999,
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

function graficarPorcionModel(ini, fin, scope){
	var finPos = Math.round(490 / scope.problema.dmax * fin + 60)
	var iniPos = Math.round(490 / scope.problema.dmax * ini + 60)

	setupCanvas(scope.problema.dmax);
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

function graficarModelo(scope){
	var ejeX = Math.round(490 / scope.problema.dmax * scope.x1 + 60);
    ctx.moveTo(ejeX,scope.z1);
	ctx.arc(ejeX,scope.z1 + 100,scope.r1,30,(Math.PI/180)*360,true);
	ctx.fillStyle="#000000";
    //ctx.fillText(scope.problema.dmax,520,80);
	ctx.fill();
}


