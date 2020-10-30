// ************
// TRANSLATIONS
// ************
var de = new Array();
de['surname'] = 'Nachnamen';
de['name'] = 'Name';

var fr = new Array();
fr['surname'] = 'Nom de famille';
fr['name'] = 'Nom';



// ****
// CODE
// ****

initLang();

var currentLanguage;
var currentLanguageDictionary;
var defaultLanguage="de";

function initLang(){
	var lang = readCookie("lang");
	if(lang==null){
		setLanguage(defaultLanguage);
	}else{
		setLanguage(lang);
	}


}

function setLanguage(lang,reload){
	currentLanguage=lang;
	if(lang=="de"){
		currentLanguageDictionary = de;
	}else if(lang=="fr"){
		currentLanguageDictionary = fr;
	}else{
		alert("Language "+lang+" failed to load.");
	}
	document.cookie = "lang="+lang+"; SameSite=Lax";
	if(reload!==undefined && reload){
 		location.reload();
	}
}

function getString(key){
	if(currentLanguageDictionary[key] !== undefined ){
		return currentLanguageDictionary[key];	
	}
	return "{missing translation}"
}

function fillString(key){
	if(currentLanguageDictionary[key] !== undefined ){
		document.write(currentLanguageDictionary[key]);	
	}else{
		document.write("{missing translation}");		
	}
}


// *******
// HELPERS
// *******
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
	var c = ca[i];
	while (c.charAt(0)==' ') c = c.substring(1,c.length);
	if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}