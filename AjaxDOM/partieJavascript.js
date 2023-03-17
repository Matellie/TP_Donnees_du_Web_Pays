//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function recupererPremierEnfantDeTypeElement(n) {
    var x = n.firstChild;
    while (x.nodeType != 1) { // Test if x is an element node (and not a text node or other)
        x = x.nextSibling;
    }
    return x;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//change le contenu de l'�lement avec l'id "nom" avec la chaine de caract�res en param�tre	  
function setNom(nom) {
    var elementHtmlARemplir = window.document.getElementById("id_nom_a_remplacer");
    elementHtmlARemplir.innerHTML = nom;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//charge le fichier XML se trouvant � l'URL relative donn� dans le param�treet le retourne
function chargerHttpXML(xmlDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    //chargement du fichier XML � l'aide de XMLHttpRequest synchrone (le 3� param�tre est d�fini � false)
    httpAjax.open('GET', xmlDocumentUrl, false);
    httpAjax.send();

    return httpAjax.responseXML;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
// Charge le fichier JSON se trouvant � l'URL donn�e en param�tre et le retourne
function chargerHttpJSON(jsonDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    // chargement du fichier JSON � l'aide de XMLHttpRequest synchrone (le 3� param�tre est d�fini � false)
    httpAjax.open('GET', jsonDocumentUrl, false);
    httpAjax.send();

    var responseData = eval("(" + httpAjax.responseText + ")");

    return responseData;
}

//-------------------------------------------------------------------------------------------------------------------------//
//global variable
var cca2Rand = "";


//question 1 and 2
function setBackgroundColor(color) {
    window.document.body.style.backgroundColor = color;
}

//question 1
function setButtonTextColor(color) {
    window.document.getElementById('myButton1').style.color = color;
}

//question 3
function displayOfficNameAndCap(xmlDocumentUrl, xslDocumentUrl, baliseElementARecuperer, countryCode) {

    // Chargement du fichier XSL a l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDocumentUrl);

	//creation d'un processeur XSL
    var xsltProcessor = new XSLTProcessor();

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);

    // Parametre
    xsltProcessor.setParameter(null, "param_ref_type", countryCode);

    // Chargement du fichier XML a l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    // Creation du document XML transforme par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'element a remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("question3");
    
	// inserer l'element transforme dans la page html
    elementHtmlParent.innerHTML = newXmlDocument.getElementsByTagName(baliseElementARecuperer)[0].innerHTML;
	
}

//question 4
function loadAndDisplaySVG() {
    var exempleSVG = chargerHttpXML("exemple.svg");

    var elementHtmlParent = window.document.getElementById("question4");

    var s = new XMLSerializer();
    elementHtmlParent.innerHTML = s.serializeToString(exempleSVG);

}

//question 5
function makeClickableSVG() {

    var cercle = window.document.getElementById("leCercle");
    var rectangle = window.document.getElementById("leRect");
    var courbe = window.document.getElementById("laCourbe");

    cercle.addEventListener("click", function(){
        window.document.getElementById("question5").innerHTML = cercle.getAttribute("title");
    });
    rectangle.addEventListener("click", function(){
        window.document.getElementById("question5").innerHTML = rectangle.getAttribute("title");
    });
    courbe.addEventListener("click", function(){
        window.document.getElementById("question5").innerHTML = courbe.getAttribute("title");
    });

}

//question 6
function displayWorldMapSVG() {
    var exempleSVG = chargerHttpXML("worldHigh.svg");

    var elementHtmlParent = window.document.getElementById("question6");

    var s = new XMLSerializer();
    elementHtmlParent.innerHTML = s.serializeToString(exempleSVG);

}

//question 7 and 12
function makeClickableCountries() {
    var countries = window.document.getElementsByTagName("path");
    
    for(let i = 0; i<countries.length; i++)
    {
        countries[i].addEventListener("click", function(){
			
			// question 7
            window.document.getElementById("question7").innerHTML = this.getAttribute("countryname");
			
			//question 12
			if(cca2Rand != ""){
				window.document.getElementById("question12").innerHTML = (this.getAttribute("id") == cca2Rand);
			}
        });
    }
    
}

//question 8
function captureMouse(baliseElementARecuperer) {
    var countries = window.document.getElementsByTagName("path");

    var xslDocument = chargerHttpXML("infosPays.xsl");

    for(let i = 0; i<countries.length; i++)
    {
        countries[i].addEventListener("mouseover", function(){
            this.style.fill = "red";

            var xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xslDocument);
            xsltProcessor.setParameter(null, "param_ref_type", this.getAttribute("id"));
            var xmlDocument = chargerHttpXML("countriesTP.xml");
            var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);
            var elementHtmlParent = window.document.getElementById("question8");
            elementHtmlParent.innerHTML = newXmlDocument.getElementsByTagName(baliseElementARecuperer)[0].innerHTML;

        });

        countries[i].addEventListener("mouseleave", function(){
            this.style.fill = "#CCCCCC";
        });
    }

}

//question 9
function autocompleteQ3(baliseElementARecuperer, countryCode) {

    // Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML("dataList.xsl");

	//cr�ation d'un processuer XSL
    var xsltProcessor = new XSLTProcessor();

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);
	
	//passage du param�tre � la feuille de style
	xsltProcessor.setParameter("", "param_ref_type", countryCode);

    // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML("countriesTP.xml");

    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("question9");
    
	// ins�rer l'�lement transform� dans la page html
    elementHtmlParent.innerHTML = newXmlDocument.getElementsByTagName(baliseElementARecuperer)[0].innerHTML;
}

//question 10
function currencyInfoQ8() {
    var countries = window.document.getElementsByTagName("path");

    for(let i = 0; i<countries.length; i++)
    {
        countries[i].addEventListener("mouseover", displayCurrency);
    } 
    
}

//question 10
function displayCurrency() {
    var json = chargerHttpJSON("https://restcountries.com/v2/alpha/" + this.getAttribute("id"));

    var elementHtmlParent = window.document.getElementById("question10");

    elementHtmlParent.innerHTML = json.currencies[0].name;

    var monnaies = window.document.getElementsByClassName("monnaie");

    for(let i = 0; i<monnaies.length; i++) {
        monnaies[i].classList.remove("hidden");
    }
}

//question 11
function colorCountryGreen(baliseElementARecuperer) {
    var bouton3 = window.document.getElementById("myButton3");

    bouton3.addEventListener("click", displayLanguageSpeakers);

}

//question 11
function displayLanguageSpeakers() { 
    var countries = window.document.getElementsByTagName("path");

    for(let h = 0; h<countries.length; h++)
    {
        countries[h].style.fill = '#CCCCCC';
    }

    countryCode = window.document.getElementById('countryCodeInput').value;
    baliseElementARecuperer = 'element_a_recuperer';

    var xslDocument = chargerHttpXML("chercheLangue.xsl");
    var xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xslDocument);
    xsltProcessor.setParameter(null, "param_ref_type", countryCode);
    var xmlDocument = chargerHttpXML("countriesTP.xml");
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);
    var elementHtmlParent = window.document.getElementById("question11");

    elementHtmlParent.innerHTML = newXmlDocument.getElementsByTagName(baliseElementARecuperer)[0].innerHTML;

    var countriesGreen = window.document.getElementsByName("question11Codes");

    for(let i = 0; i<countriesGreen.length; i++)
    {
        for(let j = 0; j<countries.length; j++)
        {
            if(countries[j].id == countriesGreen[i].innerHTML)
            {
                countries[j].style.fill = 'green';
            }
        }
    }

}

//question 12
function randomCountry(){
	
	var rand = Math.floor(Math.random() * 256);
	
	//Assuming button 6 has already been pressed
	var country = window.document.getElementsByTagName("path")[rand];
	cca2Rand = country.getAttribute("id");
	console.log(country.getAttribute("countryname"));

	window.document.getElementById("question12").innerHTML = country.getAttribute("countryname");
	
}

//question 13
function displayTimezones() {
    window.document.getElementById("question13").classList.remove("hidden");

    var countries = window.document.getElementsByTagName("path");
    var nbTimezones = new Array();

    for(let i = 0; i<countries.length; i++)
    {
        try {
            var json = chargerHttpJSON("https://restcountries.com/v2/alpha/" + countries[i].getAttribute("id"));
            nbTimezones.push(json.timezones.length);
        } catch (error) {
            nbTimezones.push(0);
            console.error(error);
        }
    }
    countriesArray = Array.from(countries);

    countriesArray.sort(function(a, b) {
        return nbTimezones[countriesArray.indexOf(b)] - nbTimezones[countriesArray.indexOf(a)];
    });

    nbTimezones.sort(function(a,b){ 
        return a - b;
    }).reverse();

    // Countries est trie
    // nbTimezones est trie
    var elementHtmlParent = window.document.getElementById("question13bis");
    elementHtmlParent.innerHTML += "<tr><th style='width: 20%'>Name</th><th style='width: 20%'>NB of timezones</th><th style='width: 20%'>Flag</th></tr>";

    for(let i = 0; i<10; i++) {
        countryCode = countriesArray[i].id;
        baliseElementARecuperer = 'element_a_recuperer';
		
		console.log(countries[i].id);
		
		for(let j = 0; j<countries.length; j++){
			if(countryCode == countries[j].id) countries[j].style.fill = '#B8860B'
		}

        var xslDocument = chargerHttpXML("infosTimezones.xsl");
        var xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xslDocument);
        xsltProcessor.setParameter(null, "code", countryCode);
        xsltProcessor.setParameter(null, "nbTime", nbTimezones[i]);
        var xmlDocument = chargerHttpXML("countriesTP.xml");
        var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);
        
        elementHtmlParent.innerHTML += newXmlDocument.getElementsByTagName(baliseElementARecuperer)[0].innerHTML;
    }

}