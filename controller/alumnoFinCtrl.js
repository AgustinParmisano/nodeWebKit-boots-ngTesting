app.controller('alumnoFinCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	
	$scope.problema=JSON.parse(localStorage.getItem('problema'));//$routeParams.problema.substring(9,$routeParams.problema.length);
	//alert($scope.problema);
	var parsed=($scope.problema);
	$scope.problema=parsed;
	$scope.enunciado=$scope.problema.enunciado;
	$scope.experimento=JSON.parse(localStorage.getItem('experimento'));//$routeParams.experimento.substring(12,$routeParams.experimento.length);
	var exp=($scope.experimento);
	$scope.experimento=exp;
	console.log("EXPERIMENT: " + $scope.experimento);
	graficarCurvaFinal($scope);
	$scope.graficar=false;
	/*creo el canvas con los parametros del problema y del experimento*/
    setupCanvas($scope.problema.dmax);
    this.graficErrorMsg = "";
    //alert($scope.experimento.xInicial);
  	graficarPorcionModel(parseInt($scope.experimento.xInicial), parseInt($scope.experimento.xFinal), $scope);
	//variables docente para la tabla 
	console.log(($scope.problema));
  	$scope.xo = $scope.problema.xo;
  	$scope.zo = $scope.problema.zo;
  	$scope.ro = $scope.problema.ro;
  	$scope.deo = $scope.problema.de;
  	$scope.dio = $scope.problema.di;
  	$scope.ddo = $scope.problema.dd;
  	//variables alumno modelo final para la tabla
  	$scope.xm = $rootScope.modeloFinal.x;
  	$scope.zm = $rootScope.modeloFinal.z;
  	$scope.rm = $rootScope.modeloFinal.r;
  	$scope.dem = $rootScope.modeloFinal.dem;
  	$scope.dim = $rootScope.modeloFinal.dim;
  	$scope.ddm = $rootScope.modeloFinal.ddm;
  	//Guardo el modelo final para graficar (pudo haber sido antes)
  	$scope.modeloFinal = $rootScope.modeloFina;
  	//Grafico esfera Real(Docente) Negra y Final(Alumno) Roja (graficarla Roja en la pantalla anterior tb)
	
	graficarEsferaFinal($scope);
	graficarEsferaReal($scope);
}]);

function graficarEsferaFinal(scope){
	var ejeX = Math.round(490 / scope.problema.dmax * scope.xm + 60);
    ctx.moveTo(ejeX,scope.zm);
	ctx.arc(ejeX,scope.zm + 100,scope.rm,30,(Math.PI/180)*360,true);
	ctx.fillStyle="#FF0000";
    //ctx.fillText(scope.problema.dmax,520,80);
	ctx.fill();
}
function graficarEsferaReal(scope){
	/*ctx2 = c.getContext("2d");
	var ejeX = Math.round(490 / scope.problema.dmax * scope.xo + 60);
    ctx2.moveTo(ejeX,scope.zo);
	ctx2.arc(ejeX,scope.zo + 100,scope.ro,30,(Math.PI/180)*360,true);
	ctx2.fillStyle="#000000";
    //ctx.fillText(scope.problema.dmax,520,80);
	ctx2.fill();*/
}

function graficarCurvaFinal(scope){
		var meds = Math.round((scope.experimento.xFinal - scope.experimento.xInicial+1) / (scope.experimento.nPasos -1) );
		//alert(meds);
		//console.log(scope.problema.dmax);
		scope.dmax=Math.min(scope.problema.dmax, 999)
	    scope.highchartsNG = {
	        options: {
	            chart: {
	                type: 'line',
	                width: '600'
	            },

	            
	            xAxis: {
	            	floor: 0,
            		ceiling: parseInt(scope.problema.dmax)

	            },
	        },
	          series: [{
				name: 'Curva Real',
				 data: (function () {
                //Fomula
                var data = [],
                            i;
					for (i = 0; i <= scope.problema.dmax; i++) {
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
					})(),
					type: "scatter",
					dashStyle: "Solid"
				},
				{
					name:'Curva Resuelta',
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
						 })(),
					type: "scatter",
					dashStyle: "Solid"
				}],	

	        title: {
	            text: 'Anomalía Resgistrada entre ' + scope.experimento.xInicial + " y " + scope.experimento.xFinal + " con " + scope.experimento.nPasos + " mediciones."
	        },
	        loading: false
	    }
}
