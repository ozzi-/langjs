// ************
// TRANSLATIONS
// ************

var langjs = {

	languages: {},


	// ****
	// CODE
	// ****

	currentLanguage : "",

	initLang: function (languagesToInit){
		for (var i = 0; i < languagesToInit.length; i++) {
			this.languages[languagesToInit[i]] = {};
		}

		var lang = this.readCookie("lang");
		if(lang==null || lang === undefined || lang == ""){
			this.setLanguage(Object.keys(this.languages)[0]);
		}else{
			this.setLanguage(lang);
		}
	},

	getCurrentLanguage: function (){
		return this.currentLanguage;
	},

	addTranslation: function (key,lang,val){
		this.languages[lang][key] = val;
	},

	setLanguage: function (lang,reload){
		this.currentLanguage=lang;
		if(this.languages[lang] == undefined){
			alert("Language "+lang+" failed to load.");
		}
		document.cookie = "lang="+lang+"; SameSite=Lax";
		if(reload!==undefined && reload){
	 		location.reload();
		}
	},

	getString: function (key){
		if(this.languages[this.currentLanguage][key] !== undefined ){
			return this.languages[this.currentLanguage][key];	
		}
		return "{missing translation}"
	},

	fillString: function (key){
		if(this.languages[this.currentLanguage][key] !== undefined ){
			document.write(this.languages[this.currentLanguage][key]);	
		}else{
			document.write("{missing translation}");		
		}
	},

	// *******
	// HELPERS
	// *******
	readCookie: function (name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
};