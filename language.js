// ************
// TRANSLATIONS
// ************
 "use strict";

window.addEventListener('load', (event) => {
	langjs.injectIntoBody();
});


var langjs = {

	languages: {},
	fast: false,

	// ****
	// CODE
	// ****

	currentLanguage : "",

	initLang: function (languagesToInit, fast){
		console.log("langjs init");
		this.fast = fast;

		for (var i = 0; i < languagesToInit.length; i++) {
			this.languages[languagesToInit[i]] = {};
		}

		var lang = this.readCookie("lang");
		if(lang==null || lang === undefined || lang == ""){
			console.log("langjs lang cookie is not set, defaulting");
			this.setLanguage(Object.keys(this.languages)[0]);
		}else{
			console.log("langjs using " +lang);
			this.setLanguage(lang);
		}
	},

	getCurrentLanguage: function (){
		return this.currentLanguage;
	},

	injectIntoBody: function(){
		var body = window.document.body.innerHTML;
		if(this.fast){
			window.document.body.innerHTML = this.injectIntoString(body);	
		}else{
			var childNodes = document.body.childNodes;
			this.translateInDom(childNodes);
		}
		var doneEvent = new CustomEvent("langjsDoneTranslating");
		window.document.dispatchEvent(doneEvent);
	},

	translateInDom: function(nodes){
		for (var i = 0; i < nodes.length; i++) { 
				var curNode = nodes[i];
				if(curNode.attributes !== undefined){
					var curNodeAttributes = curNode.attributes;
					for (var ii = 0; ii < curNodeAttributes.length; ii++) {
						curNodeAttributes[ii].nodeValue = this.injectIntoString(curNodeAttributes[ii].nodeValue);
					}	
				}
			
				if(curNode.nodeType == 3){
					curNode.data = this.injectIntoString(curNode.data);
				}
				if(curNode.nodeType == 1){
					this.translateInDom(curNode.childNodes);
				}
			}
	},

	injectIntoString: function(strng){
		var result = strng.replace(/{%(.*?)%}/g, function(match, token) {
			return langjs.getString(token);

		});
		return result;
	},

	addTranslation: function (key,lang,val,escapeHTML){
		escapeHTML = (typeof escapeHTML !== 'undefined')?escapeHTML:false;
		val = escapeHTML ? this.escapeHtml(val) : val;
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

	escapeHtml: function (inp){
		var text = document.createTextNode(inp);
		var p = document.createElement('p');
		p.appendChild(text);
		return p.innerHTML;
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
