app.controller('alumnoFinCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
	$scope.titulo='Comparación';	
	$scope.problema=JSON.parse(localStorage.getItem('problema'));//$routeParams.problema.substring(9,$routeParams.problema.length);
	//alert($scope.problema);
	var parsed=($scope.problema);
	$scope.problema=parsed;
	$scope.enunciado=$scope.problema.enunciado;
	$scope.experimento=JSON.parse(localStorage.getItem('experimento'));//$routeParams.experimento.substring(12,$routeParams.experimento.length);
	var exp=($scope.experimento);
	$scope.experimento=exp;
	console.log("EXPERIMENT: " + $scope.experimento);

	//$scope.graficar=false;
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
  	$scope.ddo = (parseFloat($scope.problema.dd)).toPrecision(2);
  	//variables alumno modelo final para la tabla
  	$scope.xm = $rootScope.modeloFinal.x;
  	$scope.zm = $rootScope.modeloFinal.z;
  	$scope.rm = $rootScope.modeloFinal.r;
  	$scope.dem = $rootScope.modeloFinal.dem;
  	$scope.dim = $rootScope.modeloFinal.dim;
  	$scope.ddm = (parseFloat($rootScope.modeloFinal.dim - $rootScope.modeloFinal.dem)).toPrecision(2);
	$scope.errorModelo=$rootScope.modeloFinal.error;
	$scope.costoAcumulado=$rootScope.costoAcumulado;
  	
  	//errores/diferencias en %
	//$scope.errorxo = (parseFloat((Math.abs((Math.floor((parseInt($scope.xo) - parseInt($scope.xm))))) / (parseInt($scope.xo))) * 100)).toPrecision(4) + "%";
  	//$scope.errorzo = (parseFloat((Math.abs((Math.floor((parseInt($scope.zo) - parseInt($scope.zm))))) / (parseInt($scope.zo))) * 100)).toPrecision(4) + "%";
  	//$scope.errorro = (parseFloat((Math.abs((Math.floor((parseInt($scope.ro) - parseInt($scope.rm))))) / (parseInt($scope.ro))) * 100)).toPrecision(4) + "%";
  	//$scope.errordeo = (parseFloat((Math.abs((Math.floor((parseInt($scope.deo) - parseInt($scope.dem))))) / (parseInt($scope.deo))) * 100)).toPrecision(4) + "%";
  	//$scope.errordio = (parseFloat((Math.abs((Math.floor((parseInt($scope.dio) - parseInt($scope.dim))))) / (parseInt($scope.dio))) * 100)).toPrecision(4) + "%";
  	//$scope.errorddo = (parseFloat((Math.abs((Math.floor((parseInt($scope.ddo) - parseInt($scope.ddm))))) / (parseInt($scope.ddo))) * 100)).toPrecision(4) + "%";
  	//$scope.errordio = ((parseFloat($scope.dio) - parseFloat($scope.dim))).toPrecision(4);;
  	//$scope.errordeo = ((parseFloat($scope.deo) - parseFloat($scope.dem))).toPrecision(4);;
  	//$scope.errorddo = ((parseFloat($scope.ddo) - parseFloat($scope.ddm))).toPrecision(4);;

  	//ERRORES SOLO RESTADOS
  	$scope.errorxo = ((parseFloat($scope.xo) - parseFloat($scope.xm))).toPrecision(2);;
  	$scope.errorzo = ((parseFloat($scope.zo) - parseFloat($scope.zm))).toPrecision(2);;
  	$scope.errorro = ((parseFloat($scope.ro) - parseFloat($scope.rm))).toPrecision(2);;
  	$scope.errordeo = ((parseFloat($scope.deo) - parseFloat($scope.dem))).toPrecision(2);;
  	$scope.errordio = ((parseFloat($scope.dio) - parseFloat($scope.dim))).toPrecision(2);;
  	$scope.errorddo = ((parseFloat($scope.ddo) - parseFloat($scope.ddm))).toPrecision(2);;

  	if ($scope.dio == 0) {
  		$scope.errordio = $scope.dim;
  	};
  	if ($scope.deo == 0) {
  		$scope.errordeo = $scope.dem;
  	};
  	if ($scope.ddo == 0) {
  		$scope.errorddo = $scope.ddm;
  	};

  	//Guardo el modelo final para graficar (pudo haber sido antes)
  	$scope.modeloFinal = $rootScope.modeloFina;
  	//Grafico esfera Real(Docente) Negra y Final(Alumno) Roja (graficarla Roja en la pantalla anterior tb)
	graficarCurvaFinal($scope);
	//graficarEsferaReal($scope);
	graficarEsferas($scope);
	
	$scope.finalizar=function(){
		$location.url('/');
	}

}]);

function graficarEsferas(scope){
	var ejeY=false;
	var y;
	var zo = parseInt(scope.zo);
	var ro = parseInt(scope.ro);
	var zm= parseInt(scope.zm);
	if(zm > 210){ 
		y=zm;
		zm=210;
		ejeY=true;
	}else{
		if( zo > 210){
			y=zo;
			zo=210;
			ejeY=true;
		}
	}
	if(ejeY){
		ctx.moveTo(50,50);
		ctx.lineTo(50,260);
		ctx.moveTo(40,260);
		ctx.lineTo(60,260);
		ctx.font = "20px Arial";
		ctx.fillText(y,10,260);
		ctx.stroke();
	}
	
	//Graficar Esfera Final
	var ejeX = Math.round(490 / scope.problema.dmax * scope.xm + 60);
    ctx.beginPath();
    ctx.moveTo(ejeX,zm+50);
	ctx.arc(ejeX,zm + 50,scope.rm,30,(Math.PI/180)*360,true);
	ctx.fillStyle="#FF0000";
	ctx.fill();
	ctx.closePath();

	//Graficar Esfera Real
	ejeX = Math.round(490 / parseInt(scope.problema.dmax) * parseInt(scope.xo) + 60);
	ctx.beginPath();
    ctx.moveTo(ejeX,zo+50);
	ctx.arc(ejeX,zo + 50,ro,30,(Math.PI/180)*360,true);
	ctx.fillStyle="#000000";
	ctx.fill();
	ctx.closePath();
}
/*function graficarEsferaReal(scope){
	//Sólo grafica si se hardcodean los números directamente, raro
	var ejeX = Math.round(490 / parseInt(scope.problema.dmax) * parseInt(scope.xo) + 110);
	var zo = parseInt(scope.zo);
	var ro = parseInt(scope.ro);
	alert(ejeX + " " + zo + " " + ro);
	ctx.beginPath();
    ctx.moveTo(ejeX,zo);
	ctx.arc(ejeX,zo + 100,ro,30,(Math.PI/180)*360,true);
	ctx.fillStyle="#000000";
    //ctx.fillText(scope.problema.dmax,520,80);
	ctx.fill();
	ctx.closePath();
}*/

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
				credits: {
					  enabled: false
				},
	            yAxis: {
					title:{text:'Anomalia de Gravedad'}
	            },
	            xAxis: {
	            	floor: 0,
            		ceiling: parseInt(scope.problema.dmax),
					title:{text:'dg[mGal]'}

	            },
	        },
	          series: [{
	          	color: '#000000',
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
					type: "line",
					dashStyle: "Solid"
				},
				{	
					marker: {
						enabled: true,
						symbol: 'circle',
						radius: 0
					},
					color: '#FF0000',
					name:'Curva Resuelta',
					data:(function () {
						//Fomula
						var data = [],
									i;
						for (i = 0; i <= scope.problema.dmax; i++) {
							var valorFormula1 = Math.pow(((Math.pow(i - scope.xm,2)) +(Math.pow(scope.zm,2))), 3/2);
							var valorFormula2 = scope.zm / valorFormula1;
							var valorFormula3 = 0.027939 * scope.ddm * Math.pow(scope.rm,3) * valorFormula2;
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
					type: "line"
				}],	

	        title: {
	            text: 'Anomalía Resgistrada entre ' + scope.experimento.xInicial + " y " + scope.experimento.xFinal + " con " + scope.experimento.nPasos + " mediciones."
	        },
	        loading: false
	    }
}
