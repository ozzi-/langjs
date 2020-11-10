# jslanguage
## Initialization
```js
langjs.initLang(["de","fr"]); // first language will be the default 
langjs.addTranslation("surname","de","Nachnamen");
langjs.addTranslation("name","de","Name");
langjs.addTranslation("surname","fr","Nom de famille");
langjs.addTranslation("name","fr","Nom");
```
If your translations contain user input, please beware of XSS (https://owasp.org/www-community/attacks/xss/).
In those cases, you probably want to set the third parameter to true as such:
```js
var thing = new URLSearchParams(window.location.search).get("thing");
langjs.addTranslation("some","de",thing,true); <---
```
This will escape all HTML before any further use.

## Usage
```html
<!-- example on how to add translation into HTML -->
Surname = <script>langjs.fillString('surname')</script>
Name = <script>langjs.fillString('name')</script>

<!-- example of automatic injection using the {%TRANSLATION_KEY%} placeholder after onload -->
Name (injected) = {%name%}
```

## Demo
https://oz-web.com/langjs/language.html
