//Guardar

var guardar = angular.module("guardarModule", []);

guardar.controller("guardarCtrl", function guardarButton($scope) {
$scope.showButton = true;

	$scope.guardar= function createFile() {
		console.log("Guardar Archivo");
		var fs = require('fs');
		fs.writeFile('./file2.txt', 'Hola Mundo', function(err) {
			if( err ){
				console.log( err );
			}
			else{
				console.log('Se ha escrito correctamente');
			}
		});
		/*var fso = new ActiveXObject("Scripting.FileSystemObject");
		var s = fso.CreateTextFile("C:\test.txt", True);
		s.writeline("HI");
		s.writeline("Bye");
		s.writeline("-----------------------------");
		s.Close();*/
	}

});
