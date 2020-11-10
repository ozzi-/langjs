# jslanguage
Initialization:
```js
langjs.initLang(["de","fr"]); // first language will be the default 
langjs.addTranslation("surname","de","Nachnamen");
langjs.addTranslation("name","de","Name");
langjs.addTranslation("surname","fr","Nom de famille");
langjs.addTranslation("name","fr","Nom");
```

Initialization:
```html
<!-- example on how to add translation into HTML -->
Surname = <script>langjs.fillString('surname')</script>
Name = <script>langjs.fillString('name')</script>

<!-- example of automatic injection using the {%TRANSLATION_KEY%} placeholder after onload -->
Name (injected) = {%name%}
```

# Demo
https://oz-web.com/langjs/language.html
