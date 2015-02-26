
 app.controller('alumnoResolverProblemaCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {

	
	$scope.problema=$routeParams.problema.substring(9,$routeParams.problema.length);

	var parsed=JSON.parse($scope.problema);
	$scope.problema=parsed;
	$scope.enunciado=$scope.problema.enunciado;
	setupCanvas();
		
}]);

app.controller('inputsCtrl', ['$scope', function($scope){
	var xInicial = "";
	var xFinal = "";
	var nPasos = "";
	$scope.costoTotal=0;
	$scope.costoMedicion=0;

	$scope.changeIni = function(){
		this.xiniErrorMsg = "";
		xInicial = $scope.xini;
		if (xFinal != "" && xFinal < xInicial) {
			this.xiniErrorMsg = "Inicial debe ser menor a final"
		}else{
			if(xFinal != "" && xInicial != ""){
				$scope.lx=xFinal - xInicial;
			}
			this.xfinErrorMsg = "";
			this.xiniErrorMsg = "";
		};
	};

	$scope.changeFin = function(){
		console.log("AAAAAAA");
		this.xfinErrorMsg = "";
		xFinal = $scope.xfin;
		if (xInicial != "" && xFinal < xInicial) {
			this.xiniErrorMsg = "Final debe ser mayor a inicial"
		}else{
			if(xFinal != "" && xInicial != ""){
				$scope.lx=xFinal - xInicial;
			}
			this.xfinErrorMsg = "";
			this.xiniErrorMsg = "";
		};
	};

	$scope.calcularPasos = function(){
		if( xInicial != "" && xFinal != "" && $scope.nPasos != "" && $scope.lx != ""){
			$scope.dx=$scope.lx/$scope.nPasos;
		}
	};

}]);

function setupCanvas(){

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
    crearLinea();

}
function crearLinea(){
    /*Esto grafica la recta*/
    ctx.moveTo(50,50);
    ctx.lineTo(550,50);
    ctx.moveTo(50,40);
    ctx.lineTo(50,60);
    ctx.font = "20px Arial";
    ctx.fillText("0",35,80);
    ctx.moveTo(550,40);
    ctx.lineTo(550,60);
    ctx.stroke();
    ctx.fill();
    ctx.fillText("",520,80);
};

app.controller('canvasCtrl', ['$scope',  function($scope) {

		$scope.graficar= function(){
	        var noGraficar = false;
	        setupCanvas();
	        ctx.fillText(this.dmax,520,80);
	        
	        //inicializar mensajes de error en nada:
	        //this.dmaxErrorMsg = "";
	        
	        if (isNaN(this.dmax) || this.dmax == null) {
	            this.dmaxErrorMsg = "Ingrese Numeros";
	            setupCanvas();
	            noGraficar = true;
	        }else if (this.dmax > 1000) {
	            this.dmaxErrorMsg = "Debe ser menor a 1000";
	            noGraficar = true;
	        };
			if (isNaN(this.z)) {
				this.z0ErrorMsg = "Ingrese Numeros";
	            noGraficar = true;
			}else if (this.z < 75) {
	            this.z0ErrorMsg = "Debe ser mayor a 75";
	            noGraficar = true;
	        };
			if (isNaN(this.r)) {
				this.r0ErrorMsg = "Ingrese Numeros";
			}
			if (isNaN(this.x)) {
				this.x0ErrorMsg = "Ingrese Numeros";
			}

	        if (isNaN(this.di)) {
	            this.diErrorMsg = "Ingrese Numeros";
	        }else if (this.di > 15) {
	            this.diErrorMsg = "Debe ser menor a 15";
	            noGraficar = true;
	        };
	        if (isNaN(this.de)) {
	            this.deErrorMsg = "Ingrese Numeros";
	        }else if (this.de > 15) {
	            this.deErrorMsg = "Debe ser menor a 15";
	            noGraficar = true;
	        };

	        if ((this.x + this.r) > this.dmax) {
	            this.x0ErrorMsg = "X + R debe ser menor a L";
	            this.r0ErrorMsg = "X + R debe ser menor a L";
	            this.dmaxErrorMsg = "X + R debe ser menor a L";
	            noGraficar = true;
	        };

	        if (this.x > this.dmax) {
	            this.x0ErrorMsg = "X mas grande que dmax";
	            noGraficar = true;
	        }

	        if(this.z > 300){
	            //NO ANDA EL MENSAJE DE ERROR
	            this.z0ErrorMsg = "Z debe ser menor a 300."
	        }

	        if(this.dmax < 50){
	            //NO ANDA EL MENSAJE DE ERROR
	            this.dmaxErrorMsg = "L debe ser mayor a 50."
	        }


			if(!noGraficar && !(isNaN(this.dmax)) && this.z != null && this.r != null && this.x != null  && this.di != null  && this.de != null && this.x < this.dmax && this.z < 300 && this.dmax > 50){
	            var ejeX = this.x + 60;
	            var ejeZ = this.z;
	            var valorFormula1 = 0;
	            var valorFormula2 = 0;
	            var valorFormula3 = 0;

	            ejeX = Math.round(490 / this.dmax * this.x + 60);
	            //$scope.x = ejeX;

	            console.log("X " + ejeX);
	            console.log("Z " + ejeZ);

	            ctx.moveTo(ejeX,ejeZ);
				ctx.arc(ejeX,ejeZ,this.r,30,(Math.PI/180)*360,true);
				ctx.fillStyle="#000000";
				ctx.fill();
	            drawChart($scope);

			}
		};

}]);