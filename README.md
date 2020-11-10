# langjs
langjs is a lightweight language framework with no dependencies. 
It enables to support multiple languages in your web frontend.

langjs will try to detect the users langauge and if supported use said language. If no preferred language can be detected, langjs defaults to the first declared language in your code. Furthmore, langjs will set a cookie to store the users language.

## Setup
langjs is setup in a breeze.
First, include langjs:
```html
<script src="lang.js"></script> 
```
Now initialize it and add your translations:
```js
langjs.initLang(["de","fr"]); 
langjs.addTranslation("surname","de","Nachnamen");
langjs.addTranslation("name","de","Name");
langjs.addTranslation("surname","fr","Nom de famille");
langjs.addTranslation("name","fr","Nom");
```

### Modes
When using initLang without a second parameter, the so called "fast mode" is used. This, as the name implies, will translate the DOM very fast, but will break states (i.E. autofocus won't work anymore). If this is a problem, do as following:
```js
langjs.initLang(["de","fr"],false); <-- false
```
This is less performant but is less obstrusive to the state / events.

### Quiet
If you add a thrid parameter to initLang, you can either surpress or explicitly enable log messages to console. In a productive environment, you probably want to set it to 'true' = quiet.

## Usage
```html
<!-- example on how to add translation into HTML -->
Surname = <script>langjs.fillString('surname')</script>
Name = <script>langjs.fillString('name')</script>

<!-- example of automatic injection using the {%TRANSLATION_KEY%} placeholder after onload -->
Name (injected) = {%name%}
```

### Event
A event "langjsDoneTranslating" is fired on window.document, once everything has been translated.

### Changing the language
Changing the language is as easy as:
```js
langjs.setLanguage('fr',true)
```
Note: the boolean 'true' will reload the page for you, in order to reflect the new language.

### Security
If your translation strings contain user input, please beware of XSS vulnerabilities (https://owasp.org/www-community/attacks/xss/).
In order to mitigate XSS when allowing user input in translations, use the optional boolean in addTranslation to escape the input properly.
Example:
```js
var thing = new URLSearchParams(window.location.search).get("thing"); <-- this is unsafe
langjs.addTranslation("some","de",thing,true); <--- set true, this will escape HTML
```
This will escape all HTML before any further use.

## Demo
The provided "language.html" serves as a demonstration and is hosted here:
https://oz-web.com/langjs/language.html
