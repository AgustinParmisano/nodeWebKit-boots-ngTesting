/* Funcion para que ingrese solo numeros */
var charData = null;

function onlyNumber(event)
{
    keyPress = event.keyCode ? event.keyCode: event.which ? event.which:event;
    if (keyPress == 8 || keyPress == 9) return true;
    patron = /[0-9.]/;
    test = String.fromCharCode(keyPress);
    return patron.test(test);
}

//Problem Module
/*
* Este controlador maneja la pantanlla docenteProblema.html la cual permite el ingreso de los datos de un problema y su posterior guardado
*/
var problem = angular.module("problemModule", ["highcharts-ng"]);
//Modulo de FileDialog para guardar/cargar archivos con angular y node web-kit https://github.com/DWand/nw-fileDialog
//Paint default canvas configuration
var c;
var ctx;

setupCanvas();

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
}

function setupCanvas(){

    var oldcanv = document.getElementById('graficoDocente');
    var canvDiv = document.getElementById('canvasDiv');
    canvDiv.removeChild(oldcanv);

    var canv = document.createElement('canvas');
    canv.id = 'graficoDocente';
    canv.width= "600";
    canv.height="300";
    canv.class = "center-block";

    canvDiv.appendChild(canv);

    c = document.getElementById("graficoDocente");
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

function resetErrors(){
        this.dmaxErrorMsg = "";
        this.z0ErrorMsg = "";
        this.r0ErrorMsg = "";
        this.x0ErrorMsg = "";
        this.deErrorMsg = "";
        this.diErrorMsg = "";
}

problem.controller('problemCtrl', ['$scope',  function($scope) {
	$isWritten = false;
	$isLong = false;
	$tooLong = false;
	$scope.showButton = true;

    initChart($scope);
    
    $scope.atras = function() {
        //BUSCAR LA MEJOR MANERA DE HACER ROUTING
        //$currentPath = window.location;
        //$currentString = String($currentPath);
        //console.log("CURRENT STRING: " + $currentString);
        //$localPath = $currentString;//.slice(0,-10); //PARA NODE WEB KIT
        //console.log($localpath);
        $destinationPath = "../#/elegirProblema"; 
        console.log("DESTINATION: " + $destinationPath);
        window.location.href=$destinationPath;
    };

	$scope.change = function() {
		//console.log(this.dmax);		

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
			ctx.fillText(this.dmax,520,80);
		}else{
			ctx.fillText(this.dmax,550,80);
		}

		if ($isWritten) {
			if($isLong){
				ctx.clearRect(520, 60, 520, 80);
				$isLong = false;
				$isWritten = false;
				ctx.fillText(this.dmax,520,80);
			}else{
				ctx.clearRect(520, 60, 520, 80);
				$isWritten = false;
				ctx.fillText(this.dmax,520,80);
			}
		};
	};
	
	/*
	* Esta funcion calcula automaticamente dd
	* Dd0: contraste de densidad. esta variable no se define sino que se calcula automáticamente como: Dd0=di0- de0
	*/
	$scope.changeD = function() {
		this.deErrorMsg = "";
		this.diErrorMsg = "";
		
		if (isNaN(this.di)) {
			this.diErrorMsg = "Ingrese Numeros";
		}else if(this.di > 999999){
			$bigNum = this.di;
			this.diErrorMsg = $bigNum + " muy grande"
			this.di = $bigNum;
		}
		if (isNaN(this.de)) {
			this.deErrorMsg = "Ingrese Numeros";
		}else if(this.de > 999999){
			$bigNum = this.de;
			this.deErrorMsg = $bigNum + " muy grande"
			this.de = $bigNum;
		}

		if(this.de != null && this.di != null){
			$scope.dd = this.di - this.de;
		}
	}
	
	/*
	*  funcion para verificar que costo sea numero
	*/
	$scope.validarCostoUnitario= function(){
		this.costoMedErrorMsg = "";
	
		if (isNaN(this.costoMed)) {
			this.costoMedErrorMsg = "Ingrese Numeros";
		}
		
	}

    $scope.validarCostoMaximo= function(){
        this.costoMaxErrorMsg = "";
    
        if (isNaN(this.costoMax)) {
            this.costoMaxErrorMsg = "Ingrese Numeros";
        }
        
    }
	
	/*
	*  Change esfera
	*/
	$scope.graficar= function(){
        var noGraficar = false;
        var zLimit = 0;
        var dmaxLimit = 0;

        console.log(noGraficar);
        setupCanvas();
        ctx.fillText(this.dmax,520,80);
        
        this.dmaxErrorMsg = "";
        this.z0ErrorMsg = "";
        this.r0ErrorMsg = "";
        this.x0ErrorMsg = "";
        this.deErrorMsg = "";
        this.diErrorMsg = "";

        if (isNaN(this.dmax) || this.dmax == null) {
            //alert("if (isNaN(this.dmax) || this.dmax == null) {");
            this.dmaxErrorMsg = "";
            this.dmaxErrorMsg = "Ingrese Numeros";
            setupCanvas();
            noGraficar = true;
        }else if (this.dmax > 1000) {
            //alert("}else if (this.dmax > 1000) {");
            this.dmaxErrorMsg = "";
            this.dmaxErrorMsg = "Debe ser menor a 1000";
            noGraficar = true;
        }else if (this.dmax === 1000) {
            dmaxLimit = 999;
        };
		if (isNaN(this.z)) {
            //alert("if (isNaN(this.z)) {");
            this.z0ErrorMsg = "";
			this.z0ErrorMsg = "Ingrese Numeros";
            noGraficar = true;
		}else if (this.z < 0) {
            //alert("}else if (this.z < 75) {");
            this.z0ErrorMsg = "";
            this.z0ErrorMsg = "Debe ser mayor a 0";
            noGraficar = true;
        };
		if (isNaN(this.r)) {
            //alert("if (isNaN(this.r)) {");
            this.r0ErrorMsg = "";
			this.r0ErrorMsg = "Ingrese Numeros";
            noGraficar = true;
		}
		if (isNaN(this.x)) {
            //alert("if (isNaN(this.x)) {");
            this.x0ErrorMsg = "";
			this.x0ErrorMsg = "Ingrese Numeros";
            noGraficar = true;
		}

        if (isNaN(this.di)) {
            //alert("if (isNaN(this.di)) {");
            this.diErrorMsg = "";
            this.diErrorMsg = "Ingrese Numeros";
            noGraficar = true;
        }else if (parseInt(this.di) > 15) {
            //alert("}else if (this.di > 15) {");
            this.diErrorMsg = "";
            this.diErrorMsg = "Debe ser menor a 15";
            noGraficar = true;
        };
        if (isNaN(this.de)) {
            //alert("if (isNaN(this.de)) {");
            this.deErrorMsg = "";
            this.deErrorMsg = "Ingrese Numeros";
            noGraficar = true;
        }else if (parseInt(this.de) > 15) {
            //alert("}else if (this.de > 15) {");
            this.deErrorMsg = "";
            this.deErrorMsg = "Debe ser menor a 15";
            noGraficar = true;
        };

        if ((parseInt(this.x) + parseInt(this.r)) > this.dmax) {
            //alert(this.x + " " + this.r + " " + this.dmax);
            this.x0ErrorMsg = "";
            this.r0ErrorMsg = "";
            this.dmaxErrorMsg = "";
            this.x0ErrorMsg = "X + R debe ser menor a L";
            this.r0ErrorMsg = "X + R debe ser menor a L";
            this.dmaxErrorMsg = "X + R debe ser menor a L";
            noGraficar = true;
        };

        if (parseInt(this.x) > parseInt(this.dmax)) {
            //alert("if (this.x > this.dmax) {");
            this.x0ErrorMsg = "";
            this.x0ErrorMsg = "X mas grande que dmax";
            noGraficar = true;
        }

        if(parseInt(this.z) > 300){
            //alert("if(this.z > 300){");
            //NO ANDA EL MENSAJE DE ERROR
            this.z0ErrorMsg = ""
            this.z0ErrorMsg = "Z debe ser menor a 300."
            noGraficar = true;
        }else if(parseInt(this.z) === 300){
            zLimit = 229;
        }

        if(parseInt(this.dmax) < 50){
            //alert("if(this.dmax < 50){");
            //NO ANDA EL MENSAJE DE ERROR
            this.dmaxErrorMsg = ""
            this.dmaxErrorMsg = "L debe ser mayor a 50."
            noGraficar = true;
        }

        if(parseInt(this.r) > parseInt(this.x)){
            //alert("if(this.r > this.x)");
            this.x0ErrorMsg = "";
            this.r0ErrorMsg = "";
            this.dmaxErrorMsg = "";
            this.r0ErrorMsg = "R debe ser menor a x0."
            noGraficar = true;
        }

        if(parseInt(this.r) > 150){
            //alert("if(this.r > this.x)");
            this.x0ErrorMsg = "";
            this.r0ErrorMsg = "";
            this.dmaxErrorMsg = "";
            this.r0ErrorMsg = "R debe ser menor a 150."
            noGraficar = true;
        }

		if(!noGraficar && !(isNaN(this.dmax)) && this.z != null && this.r != null && this.x != null  && this.di != null  && this.de != null && this.dmax > 50){
            var ejeX = this.x + 60;
            var ejeZ = 0;   
            var valorFormula1 = 0;
            var valorFormula2 = 0;
            var valorFormula3 = 0;
            
            if (dmaxLimit != 0) {
                ejeX = Math.round(490 / dmaxLimit * this.x + 60);
            }else{
                ejeX = Math.round(490 / this.dmax * this.x + 60);
            };

            if (zLimit != 0) {
                ejeZ = parseInt(zLimit) + 70;
            }else{
                ejeZ = parseInt(this.z) + 70;
            };
            
            //$scope.x = ejeX;

            console.log("X " + ejeX);
            console.log("Z " + ejeZ);
            console.log("R " + this.r);

            ctx.moveTo(ejeX,ejeZ);
			ctx.arc(ejeX,ejeZ,this.r,30,(Math.PI/180)*360,true);
			ctx.fillStyle="#000000";
			ctx.fill();
            drawChart($scope);

		}
	};

    $scope.aleatorio = function(){
        setupCanvas();

        this.enunErrorMsg = "";
        this.dmaxErrorMsg = "";
        this.z0ErrorMsg = "";
        this.r0ErrorMsg = "";
        this.x0ErrorMsg = "";
        this.deErrorMsg = "";
        this.diErrorMsg = "";

        this.dmax = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
        this.x = Math.floor(Math.random() * (this.dmax - 10 + 1)) + 10;
        this.z = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
        this.r = Math.floor(Math.random() * ((this.z - 100) - 2 + 10)) + 2;
        while((this.r > this.x) || ((this.r + this.x) > this.dmax)){
            console.log(this.r + " " + this.x);
            this.r = Math.floor(Math.random() * ((this.z - 100) - 2 + 1)) + 2;
        }
        this.de = Math.floor(Math.random() * ((15 - 1) - 2 + 1)) + 2;
        this.di = Math.floor(Math.random() * ((15 - 1) - 2 + 1)) + 2;
        $scope.dd = this.de - this.di;
    };

    $scope.borrar= function(){
        setupCanvas();
        this.dmax = null;
        this.r = null;
        this.z = null;
        this.x = null;
        this.di = null;
        this.de = null;
        $scope.dd = null;
        var seriesArray = $scope.highchartsNG.series;
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray.splice(rndIdx, 1);
    };

	$scope.guardar= function(){
        this.enunErrorMsg = "";
        this.dmaxErrorMsg = "";
        this.z0ErrorMsg = "";
        this.r0ErrorMsg = "";
        this.x0ErrorMsg = "";
        this.deErrorMsg = "";
        this.diErrorMsg = "";

		var texto= "Falta Completar";
		if (this.enun == null) {
			texto+=" Enunciado";
            this.enunErrorMsg = texto;
		}else if(this.r == null){
			texto+=" R0";
            this.r0ErrorMsg = texto;
		}else if(this.x == null){
			texto+=" X0";
            this.x0ErrorMsg = texto;
		}else if( this.z == null){
			texto+=" Z0";
            this.z0ErrorMsg = texto;
		}else if ( this.di == null){
			texto+=" Di0";
            this.diErrorMsg = texto;
		}else if(this.de == null){
			texto+=" De0";
            this.deErrorMsg = texto;
		}else if(this.dmax == ""){
			texto+=" L";//no entra
            this.dmaxErrorMsg = texto;
		}else if(this.costoMed == null || this.costoMax == null){
			texto+=" Costo";
            this.costoMaxErrorMsg = texto;
            this.costoMedErrorMsg = texto;
		}else{
			//Esto el json que se va a guardar
			var problema = {
				enunciado: this.enun,
				dmax: this.dmax,
				xo: this.x,
				ro: this.r,
				zo: this.z,
				de: this.de,
				di: this.di,
				dd: this.dd,
				costoMedicion: this.costoMed,
				costoMax: this.costoMax
				
			};
			downloadFile("problema", JSON.stringify(problema, null, 2));
			texto="El Archivo se Genero Correctamente"
			
		}
		//alert(texto);
	};

    $scope.$watch(function(scope){
            return scope.dmax;
        },

        function(){
            if($scope.dmax != null){
                ctx.clearRect(520, 60, 520, 80);
                ctx.fillText($scope.dmax,520,80);
            }
        }

    );

    /*$scope.$watch(function(scope){
            return scope.di;
        },

        function(scope){
            if($scope.de != null && $scope.di !=null){
                document.getElementById("dd").value = document.getElementById("di").value  - document.getElementById("de").value ;
                console.log(document.getElementById("dd").value);
            }
        }

    );*/

    
	
}]);

function drawChart(scope){
    //Para el gráfico de HC
    scope.dmax=Math.min(scope.dmax, 999);
    console.log(scope.dmax);
    scope.highchartsNG = {
        options: {
            chart: {
                type: 'line',
                width: '600'
            },

            
            yAxis: { 
                plotLines: [{value: 0}],
                height: '100%',
                startOnTick: false,

            }
        },
          series: [{
			name: 'Curva Modelada',
            data: (function () {
                //Fomula
                var data = [],
                            i;
                for (i = 0; i <= scope.dmax; i++) {
                    var valorFormula1 = Math.pow(((Math.pow(i - scope.x,2)) +(Math.pow(scope.z,2))), 3/2);
                    var valorFormula2 = scope.z / valorFormula1;
                    var valorFormula3 = 0.027939 * scope.dd * Math.pow(scope.r,3) * valorFormula2;
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
            text: 'Anomalía'
        },
        loading: false
    }
}

//FileManager y FileSaver que mando Tom
downloadFile = function(name, data) {
    name = name.replace(' ', '_');
    var blob = new Blob([data], {type: "text/javascript;charset=utf-8"});
    saveAs(blob, name + '.txt');
};

/*! FileSaver.js
 *  A saveAs() FileSaver implementation.
 *  2014-01-24
 *
 *  By Eli Grey, http://eligrey.com
 *  License: X11/MIT
 *    See LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs
  // IE 10+ (native saveAs)
  || (typeof navigator !== "undefined" &&
      navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
  // Everyone else
  || (function(view) {
    "use strict";
    // IE <10 is explicitly unsupported
    if (typeof navigator !== "undefined" &&
        /MSIE [1-9]\./.test(navigator.userAgent)) {
        return;
    }
    var
          doc = view.document
          // only get URL when necessary in case BlobBuilder.js hasn't overridden it yet
        , get_URL = function() {
            return view.URL || view.webkitURL || view;
        }
        , URL = view.URL || view.webkitURL || view
        , save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
        , can_use_save_link = !view.externalHost && "download" in save_link
        , click = function(node) {
            var event = doc.createEvent("MouseEvents");
            event.initMouseEvent(
                "click", true, false, view, 0, 0, 0, 0, 0
                , false, false, false, false, 0, null
            );
            node.dispatchEvent(event);
        }
        , webkit_req_fs = view.webkitRequestFileSystem
        , req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
        , throw_outside = function(ex) {
            (view.setImmediate || view.setTimeout)(function() {
                throw ex;
            }, 0);
        }
        , force_saveable_type = "application/octet-stream"
        , fs_min_size = 0
        , deletion_queue = []
        , process_deletion_queue = function() {
            var i = deletion_queue.length;
            while (i--) {
                var file = deletion_queue[i];
                if (typeof file === "string") { // file is an object URL
                    URL.revokeObjectURL(file);
                } else { // file is a File
                    file.remove();
                }
            }
            deletion_queue.length = 0; // clear queue
        }
        , dispatch = function(filesaver, event_types, event) {
            event_types = [].concat(event_types);
            var i = event_types.length;
            while (i--) {
                var listener = filesaver["on" + event_types[i]];
                if (typeof listener === "function") {
                    try {
                        listener.call(filesaver, event || filesaver);
                    } catch (ex) {
                        throw_outside(ex);
                    }
                }
            }
        }
        , FileSaver = function(blob, name) {
            // First try a.download, then web filesystem, then object URLs
            var
                  filesaver = this
                , type = blob.type
                , blob_changed = false
                , object_url
                , target_view
                , get_object_url = function() {
                    var object_url = get_URL().createObjectURL(blob);
                    deletion_queue.push(object_url);
                    return object_url;
                }
                , dispatch_all = function() {
                    dispatch(filesaver, "writestart progress write writeend".split(" "));
                }
                // on any filesys errors revert to saving with object URLs
                , fs_error = function() {
                    // don't create more object URLs than needed
                    if (blob_changed || !object_url) {
                        object_url = get_object_url(blob);
                    }
                    if (target_view) {
                        target_view.location.href = object_url;
                    } else {
                        window.open(object_url, "_blank");
                    }
                    filesaver.readyState = filesaver.DONE;
                    dispatch_all();
                }
                , abortable = function(func) {
                    return function() {
                        if (filesaver.readyState !== filesaver.DONE) {
                            return func.apply(this, arguments);
                        }
                    };
                }
                , create_if_not_found = {create: true, exclusive: false}
                , slice
            ;
            filesaver.readyState = filesaver.INIT;
            if (!name) {
                name = "download";
            }
            if (can_use_save_link) {
                object_url = get_object_url(blob);
                // FF for Android has a nasty garbage collection mechanism
                // that turns all objects that are not pure javascript into 'deadObject'
                // this means `doc` and `save_link` are unusable and need to be recreated
                // `view` is usable though:
                doc = view.document;
                save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a");
                save_link.href = object_url;
                save_link.download = name;
                var event = doc.createEvent("MouseEvents");
                event.initMouseEvent(
                    "click", true, false, view, 0, 0, 0, 0, 0
                    , false, false, false, false, 0, null
                );
                save_link.dispatchEvent(event);
                filesaver.readyState = filesaver.DONE;
                dispatch_all();
                return;
            }
            // Object and web filesystem URLs have a problem saving in Google Chrome when
            // viewed in a tab, so I force save with application/octet-stream
            // http://code.google.com/p/chromium/issues/detail?id=91158
            if (view.chrome && type && type !== force_saveable_type) {
                slice = blob.slice || blob.webkitSlice;
                blob = slice.call(blob, 0, blob.size, force_saveable_type);
                blob_changed = true;
            }
            // Since I can't be sure that the guessed media type will trigger a download
            // in WebKit, I append .download to the filename.
            // https://bugs.webkit.org/show_bug.cgi?id=65440
            if (webkit_req_fs && name !== "download") {
                name += ".download";
            }
            if (type === force_saveable_type || webkit_req_fs) {
                target_view = view;
            }
            if (!req_fs) {
                fs_error();
                return;
            }
            fs_min_size += blob.size;
            req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
                fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
                    var save = function() {
                        dir.getFile(name, create_if_not_found, abortable(function(file) {
                            file.createWriter(abortable(function(writer) {
                                writer.onwriteend = function(event) {
                                    target_view.location.href = file.toURL();
                                    deletion_queue.push(file);
                                    filesaver.readyState = filesaver.DONE;
                                    dispatch(filesaver, "writeend", event);
                                };
                                writer.onerror = function() {
                                    var error = writer.error;
                                    if (error.code !== error.ABORT_ERR) {
                                        fs_error();
                                    }
                                };
                                "writestart progress write abort".split(" ").forEach(function(event) {
                                    writer["on" + event] = filesaver["on" + event];
                                });
                                writer.write(blob);
                                filesaver.abort = function() {
                                    writer.abort();
                                    filesaver.readyState = filesaver.DONE;
                                };
                                filesaver.readyState = filesaver.WRITING;
                            }), fs_error);
                        }), fs_error);
                    };
                    dir.getFile(name, {create: false}, abortable(function(file) {
                        // delete file if it already exists
                        file.remove();
                        save();
                    }), abortable(function(ex) {
                        if (ex.code === ex.NOT_FOUND_ERR) {
                            save();
                        } else {
                            fs_error();
                        }
                    }));
                }), fs_error);
            }), fs_error);
        }
        , FS_proto = FileSaver.prototype
        , saveAs = function(blob, name) {
            return new FileSaver(blob, name);
        }
    ;
    FS_proto.abort = function() {
        var filesaver = this;
        filesaver.readyState = filesaver.DONE;
        dispatch(filesaver, "abort");
    };
    FS_proto.readyState = FS_proto.INIT = 0;
    FS_proto.WRITING = 1;
    FS_proto.DONE = 2;

    FS_proto.error =
    FS_proto.onwritestart =
    FS_proto.onprogress =
    FS_proto.onwrite =
    FS_proto.onabort =
    FS_proto.onerror =
    FS_proto.onwriteend =
        null;

    view.addEventListener("unload", process_deletion_queue, false);
    saveAs.unload = function() {
        process_deletion_queue();
        view.removeEventListener("unload", process_deletion_queue, false);
    };
    return saveAs;
}(
       typeof self !== "undefined" && self
    || typeof window !== "undefined" && window
    || this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module !== null) {
  module.exports = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd != null)) {
  define([], function() {
    return saveAs;
  });
}