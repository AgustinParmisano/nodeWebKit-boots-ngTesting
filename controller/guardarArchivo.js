var fs = require('fs');
		fs.writeFile('./file2.txt', 'Hola Mundo', function(err) {
			if( err ){
				console.log( err );
			}
			else{
				console.log('Se ha escrito correctamente');
			}
		});