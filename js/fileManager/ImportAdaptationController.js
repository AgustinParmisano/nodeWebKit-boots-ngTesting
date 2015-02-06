function ImportAdaptationController(container) {
    GenericController.call(this);
    this.container = container;
    this.view = new ImportAdaptationView();
    this.model = new ConceptsStorage();

    this.load();
    this.addEvents();
    this.hideContent();
}

ImportAdaptationController.prototype = new GenericController();
ImportAdaptationController.prototype.constructor = ImportAdaptationController;

ImportAdaptationController.prototype.addEvents = function() {
    var self = this;
    this.addListeningEvent('clickNewConcept', function(){self.hideContent(); });
    this.addListeningEvent('clickReview', function(){self.hideContent(); });
    this.addListeningEvent('clickEditConcept', function(){self.hideContent(); });
    this.addListeningEvent('addNewConcept', function(){self.hideContent(); });
    this.addListeningEvent('clickExportAdaptation', function(){self.hideContent(); });
    this.addListeningEvent('clickImportAdaptation', function(){self.showContent(); });

    this.view.getImportButton().addEventListener(
            'change',
            function(e){
                self.view.emptyConceptList();
                self.handleFileSelect(e, self.view);
            },
            false);

};


//  Cómo leer archivos en JavaScript a través de las API de archivos
//
// http://www.html5rocks.com/es/tutorials/file/dndfiles/
ImportAdaptationController.prototype.handleFileSelect = function(evt, view) {

    var file = evt.target.files[0]; // File load
    var self = this;
    // Is .js?
    if(file.type == "text/javascript") {

        var reader = new FileReader(); // HTML5

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                try {
                    // Result of readAsText(file)
                    var data = JSON.parse(e.target.result);
                    var error = false;
                    for(var url in data){
                        try {
                            view.showLoadingImage();
                            // Valida la url con ajax
                            var response = GM_xmlhttpRequest({
                                method: "GET",
                                url: url,
                                synchronous: true
                            });

                            // If url is valid
                            if (response.status == 200) {
                                try {
                                    //console.log(data);
                                    self.model.createConceptsFromJSON(data[url], url);
                                    for(var concept in data[url]) {
                                        // Add concepts to view
                                        view.addConcept(concept, data[url][concept].xPath);
                                    }
                                    console.log("Carga exitosa de conceptos");
                                } catch(e) {
                                    console.warn("CONCEPT INVALID");
                                    error = true;
                                }

                            } else {
                                console.warn("URL INVALID: " + url);
                            }
                        } catch(e) {
                            console.info(e);
                            error = true;
                        }
                    }

                    view.showFileContent();
                    if(!error) {
                        // Enable button to persist concept's!
                        view.getAcceptConcepts().addEventListener('click', function(e){
                            console.info("SUCCESS");
                            this.disabled=true;
                        });
                    } else {
                        view.emptyConceptList();
                        view.hideFileContent();
                        // show error message!
                    }
                    view.removeLoadingImage();
                } catch(e) {
                    console.warn("FILE INVALID");
                    view.hideFileContent();
                    // Show error in view!
                }
            };
        })(file);

        // Read the file
        reader.readAsText(file);

    }

};
