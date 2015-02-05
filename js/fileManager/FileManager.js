function FileManager(mainModel) {
    if ( arguments.callee.instance )
        return arguments.callee.instance;
    arguments.callee.instance = this;

    // String que se va a agregar siempre en cada adaptación que se exporte (Representa el modelo genérico).
    this.mainModel = mainModel || GM_getResourceText("Model");
    this.persister = new ConceptsStorage();
};

// Exporta la adaptación recibida
FileManager.prototype.exportAdaptation = function(name, description, author, urlInclude) {
    urlInclude = urlInclude || '*';
    var metadata = this.generateMetadata(name, description, author, urlInclude);

    // construir el modelo a exportar, primero agrega el modelo genérico
    var adaptation = metadata + this.mainModel + this.generateConcepts(this.persister.getAllConceptsInSite()); // Luego cambiar getAllConcepts()

    // llama al downloader
    this.downloadFile(name, adaptation);
};

// Exporta el JSON en base a los conceptos creados
FileManager.prototype.exportJSON = function(url,scriptName) {
    var pageURL = url || location.href;
    var name = scriptName || "data";
    console.log(name);
    console.log(pageURL);
    var data = {};
    try {
        var all = this.persister.getAllConceptsInSite();

        var concepts = {};
        for (i = 0; i < all.length; i++) {

            attributes = [];
            for (var a in all[i].attr) {
                attributes.push(all[i].attr[a]);
            }

            concepts[all[i].name] = {xPath: all[i].xPath, container: "", attributes: attributes};
        }

        data[pageURL] = concepts;
    } catch(e) {
        console.info(e);
    }

    // llama al downloader
    this.downloadFile(name + "JSON", JSON.stringify(data, null, 4));
};

// Genera el bloque de metadata para el userscript
FileManager.prototype.generateMetadata = function(name, description, author, urlInclude) {
    return  '// ==UserScript==\n' +
            '// @name\t\t' + name + '\n' +
            '// @description\t\t' + description + '\n' +
            '// @author\t\t' + author + '\n' +
            '// @include\t' + urlInclude + '\n' +
            '// ==/UserScript==\n\n';
};

// genera todos los conceptos (abstract y concrete) definidos para la url
FileManager.prototype.generateConcepts = function(data) {
    var concepts = "";
    for (var i = data.length - 1; i >= 0; i--) {
        concepts += this.createConceptClass(data[i].name, data[i].xPath); // aca ver si pasarle el name y xpath solo o mas.
    };
    return concepts;
};

// devuelve las instancias en formato de string
FileManager.prototype.createConceptClass = function(conceptName, conceptXPath){

     // Reemplazo blancos por guiones bajos.
    conceptName = conceptName.replace(' ', '_');
    var abstractConcept = "Abstract" + conceptName;
    var concreteConcept = "Concrete" + conceptName;

    var concepts = 'function ' + abstractConcept + '(){\n'+
      '\tAbstractConceptDomain.call(this);\n'+
      '\tif ( arguments.callee.instance )\n'+
      '\t\treturn arguments.callee.instance;\n'+
      '\targuments.callee.instance = this;\n'+
      '\tthis.xPath = \'' +  conceptXPath + '\';\n'+
    '};\n\n'+

    abstractConcept + '.prototype = new AbstractConceptDomain();\n'+
    abstractConcept + '.prototype.constructor = ' + abstractConcept +';\n\n'+

    abstractConcept +'.prototype.createConcreteConceptDomain = function(aNode){\n'+
        '\treturn new ' + concreteConcept +'(aNode, this);\n'+
    '};\n\n';

    concepts += 'function ' + concreteConcept + '(aNode, abstractConceptDomain){\n'+
      '\tConcreteConceptDomain.call(this);\n'+
      '\tthis.node = aNode;\n'+
      '\tthis.abstractConceptDomain = abstractConceptDomain;\n'+
    '};\n\n'+

    concreteConcept + '.prototype = new ConcreteConceptDomain();\n' +
    concreteConcept + '.prototype.constructor = ' + concreteConcept + ';\n\n';

    console.info("Conceptos");
    console.info(concepts);
    return concepts;
};

FileManager.prototype.downloadFile = function(name, data) {
    name = name.replace(' ', '_');
    var blob = new Blob([data], {type: "text/javascript;charset=utf-8"});
    //saveAs(blob, name + '.user.js');
    saveAs(blob, name + '.js');
};




