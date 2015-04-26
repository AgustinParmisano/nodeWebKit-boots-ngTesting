/* Funcion para que ingrese solo numeros y punto */
var charData = null;

function onlyNumber(event)
{
    keyPress = event.keyCode ? event.keyCode: event.which ? event.which:event;
    if (keyPress == 8 || keyPress == 9) return true;
    patron = /[0-9.]/;
    test = String.fromCharCode(keyPress);
    return patron.test(test);
}
/*Funcion para ramdom*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*aca empieza el controller*/

var chartData;

function setupCanvasResolver(dmax){

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
    crearLineaResolver(dmax);

}

function crearLineaResolver(dmax){
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
	var finPos = Math.round(490 / scope.dmax * fin + 60);
	var iniPos = Math.round(490 / scope.dmax * ini + 60);
	
	if(ini == 0){
		iniPos = 50;
		ini = "";
	}

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
		credits: {
			  enabled: false
		},
        title: {
            text: ''
        },
        loading: false
    }
};


function drawChartResolver(scope,xini,xfin,dmax){
		var meds = Math.round((xfin-xini) / (scope.nPasos-1));
		//alert(scope.nPasos);
		var cant=scope.nPasos;
		var paso=0;
		scope.dmax=Math.min(dmax, 999)
	    scope.highchartsNG = {
	        options: {
	            chart: {
	                type: 'scatter',
	                width: '600'
	            },
				credits: {
					  enabled: false
				},
	            yAxis: {
					title:{text:'dg[mGal]'}
	            },
	            xAxis: {
	            	floor: 0,
            		ceiling: parseInt(scope.problema.dmax),
					title:{text:'Anomalia de Gravedad'}
	            },
	        },
	          series: [{
				marker: {
					enabled: true,
					symbol: 'circle',
					radius: 2
				},
	          	color: '#0000FF',
				name: 'Mediciones',
	            data:(function () {
	                //Fomula
	                var data = [],
	                            i,
								punto= 0 + xini;
					data.push({
	                        x: -1,
	                        y: 0
	                    });
					scope.ruido[paso]= getRandomInt(-1,1);
					var errorj=(0.0013969/5)*Math.pow(parseFloat(scope.problema.ro),3)*(parseFloat(scope.problema.dd)/(Math.pow(parseFloat(scope.problema.zo),2)));
	                for (i = xini; i <= (parseInt(xfin)); i = i + meds) {
	                    var valorFormula1 = Math.pow(((Math.pow(i - parseFloat(scope.problema.xo),2)) +(Math.pow(parseFloat(scope.problema.zo),2))), 3/2);
	                    var valorFormula2 = parseFloat(scope.problema.zo) / valorFormula1;
						var valorFormula3 = parseFloat(0.027939) * parseFloat(scope.problema.dd) * Math.pow(parseFloat(scope.problema.ro),3) * valorFormula2;
	                    if(isNaN(valorFormula3)){
	                      valorFormula3 = 0;  
	                    };
	   
	                    data.push({
	                        x: punto,
	                        y: valorFormula3+(errorj*(parseFloat(scope.ruido[paso])))
	                    });
						paso=paso+1;
						scope.ruido[paso]= getRandomInt(-1,1);
						punto+=meds;
	                }
					data.push({
	                        x: 9999,
	                        y: 0
	                    });
	                chartData = data;
	                return data;
	            })()
	        }],	

	        title: {
	            text: 'Anomalía Resgistrada entre ' + xini + " y " + xfin + " con " + scope.nPasos + " mediciones."
	        },
	        loading: false
	    }
}

app.controller('alumnoResolverProblemaCtrl', ['$scope', '$location', '$routeParams', '$rootScope', function($scope, $location, $routeParams, $rootScope) {
	$scope.titulo='Medición de Campo';	
	$scope.problema=localStorage.getItem('problema');//$routeParams.problema.substring(9,$routeParams.problema.length);

	var parsed=JSON.parse($scope.problema);
	$scope.problema=parsed;
	$scope.enunciado=$scope.problema.enunciado;
	$scope.costoMaximo=parseInt($scope.problema.costoMax);

	$scope.dmax=parseInt($scope.problema.dmax);
	$scope.dd=parseInt($scope.problema.dd);




	this.contErrorMsg = "";
	//var p=angular.fromJSON(problema);
	//alert(p);


	 $scope.continuar = function(){
		if(($rootScope.xini >= 0) && $rootScope.xfin && $rootScope.nPasos && $rootScope.costoAcumulado){
			if ($rootScope.costoAcumulado < $scope.costoMaximo) {;		
				var experimento = {
						xInicial: $scope.xini,
						xFinal: $scope.xfin,
						nPasos: $scope.nPasos,
						costoAcumulado: $scope.costoAcumulado,
						ruido: $scope.ruido
				};
				$scope.experimento= JSON.stringify(experimento, null, 2);
				localStorage.setItem('experimento',$scope.experimento);
				$location.url('/alumnoModeladoAngular/'+$routeParams.problema + '/experimento:'+$scope.experimento);
			}else{
				this.contErrorMsg = "El costo acumulado superó al máximo."
			}
		}else{
			this.contErrorMsg = "Debe tomar mediciones."
		}
    };
		
}]);

app.controller('inputsCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
	var nPasos = "";
	setupCanvasResolver($scope.dmax);
	initChart($scope);

	$scope.xini = "";
	$scope.xfin = "";
	$scope.nPasos = "";
	$scope.lx = "";
	$scope.ruido=[];
	$scope.costoAcumulado = "";

	$scope.changeIni = function(){
		this.xiniErrorMsg = "";
		if ($scope.xfin != "" && $scope.xfin < $scope.xini) {
			this.xiniErrorMsg = "Inicial debe ser menor a final"
		}else if ($scope.xini > $scope.dmax) {
			this.xiniErrorMsg = "Debe ser menor a la longitud"
		}else{
			this.xfinErrorMsg = "";
			this.xiniErrorMsg = "";
			$scope.actualizarResolver();
		};
		
	};

	$scope.changeFin = function(){
		this.xfinErrorMsg = "";
		if ($scope.xini != "" && $scope.xfin < $scope.xini) {
			this.xfinErrorMsg = "Final debe ser mayor a inicial"
		}else if ($scope.xfin> $scope.dmax) {
			this.xfinErrorMsg = "Debe ser menor a la longitud"
		}else{
			this.xfinErrorMsg = "";
			this.xiniErrorMsg = "";
			$scope.actualizarResolver();
		};
	};

	$scope.calcularPasos = function(){
		$scope.actualizarResolver();
	};
	$scope.actualizarResolver = function(){
		if( ($scope.xini != null) && ($scope.xfin != null) && ($scope.nPasos != null)){
			$scope.lx =$scope.xfin-$scope.xini;
			$scope.dx=parseFloat(($scope.lx/($scope.nPasos-1)).toFixed(2));
			$scope.costoTotal = $scope.nPasos * $scope.problema.costoMedicion;
		}else{
			$scope.lx ="";
			$scope.dx="";
			$scope.costoTotal="";
		}
	}

//}]);


//app.controller('canvasCtrl', ['$scope',  function($scope) {
	
	
	//drawChart($scope,100, 550);

	$scope.graficar = function() {
		
        var noGraficar = false;
        var acum = 0;

        setupCanvasResolver($scope.dmax);
        this.graficErrorMsg = "";
        this.contErrorMsg = "";

        if(this.xini == null || this.xini == ""){
        	this.graficErrorMsg = "Falta Xini";
        	noGraficar = true;
        	if(this.xini == "0"){
        		noGraficar = false;
        		this.graficErrorMsg = "";
        	}        	
        }

 		if(this.xfin == null || this.xfin == ""){
        	this.graficErrorMsg = "Falta Xfin";
        	noGraficar = true;
        }
        //alert(this.costoTotal);
        //alert(this.costoAcumulado);
        //alert(this.costoMaximo);
        if (this.nPasos < 2) {
        	this.graficErrorMsg = "Mínimo de mediciones debe ser 2.";
        	noGraficar = true;
        };

        if (this.costoAcumulado) {
        	acum = this.costoAcumulado;
        };


        if (this.costoTotal > this.costoMaximo) {
        	this.graficErrorMsg = "No debe superar el costo máximo.";
        	noGraficar = true;
        };
		
        if (this.costoTotal + acum > this.costoMaximo) {
        	this.graficErrorMsg = "No debe superar el costo máximo.";
        	noGraficar = true;
        };

        if(this.nPasos == null){
        	this.graficErrorMsg = "Indique mediciones";
        	noGraficar = true;
        };

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
        	$rootScope.xini = $scope.xini;
        	$rootScope.xfin = $scope.xfin;
        	$rootScope.nPasos = $scope.nPasos;
        	drawChartResolver($scope,parseInt(this.xini), parseInt(this.xfin),parseInt($scope.problema.dmax));
			$rootScope.ruido=$scope.ruido;
        	graficarPorcion(this.xini, this.xfin, $scope);
        	if (!$scope.costoAcumulado) {
        		$scope.costoAcumulado = 0;
        	};
        	$scope.costoAcumulado += $scope.costoTotal;
        	$rootScope.costoAcumulado = $scope.costoAcumulado;
        };

	};

}]);

