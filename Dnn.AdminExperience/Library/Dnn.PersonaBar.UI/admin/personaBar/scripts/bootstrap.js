(function () {
  function addCssToHead(css, version) {
    var head = document.getElementsByTagName("head")[0];
    for (var i = 0; i < css.length; i++) {
      var link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("href", css[i] + version);
      head.appendChild(link);
    }
  }

  function addJsToBody(js, version) {
    var body = document.getElementsByTagName("body")[0];
    var script = document.createElement("script");
    script.setAttribute("src", "scripts/contrib/require.js" + version);
    script.setAttribute("data-main", js + version);
    body.appendChild(script);
  }

  var personaBarSettings = window.parent["personaBarSettings"];
  var debugMode = personaBarSettings["debugMode"] === true;
  var cdv = personaBarSettings["buildNumber"];
  var version =
    (cdv ? "?cdv=" + cdv : "") + (debugMode ? "&t=" + Math.random() : "");
  var styles = [];
  var mainJs = "scripts/main.js";
  var themeCss = "css/theme.css";
  var mainCss = "css/main.css";

    /* START Persian-DnnSoftware */
    if (window.parent['personaBarSettings']['culture'] == 'fa-IR' || window.parent['personaBarSettings']['culture'].startsWith("ar-")) {
        mainJs = 'scripts/main.rtl.js';
        mainCss = 'css/main.rtl.css';
        themeCss = 'css/theme.rtl.css';
    }
    /* END Persian-DnnSoftware */

    var hasCustomPersonaBarTheme = personaBarSettings['personaBarTheme'];
    if (hasCustomPersonaBarTheme){
        /* START Persian-DnnSoftware */
        //styles.push('../../../../Portals/_default/PersonaBarTheme.css');
        if (window.parent["personaBarSettings"]["culture"] == "fa-IR" ||window.parent["personaBarSettings"]["culture"].startsWith("ar-")) {
            styles.push("../../../../Portals/_default/PersonaBarTheme.rtl.css");
        } else {
            styles.push("../../../../Portals/_default/PersonaBarTheme.css");
        }
        /* END Persian-DnnSoftware */
    }
    else{
        styles.push(themeCss);
    }

  styles.push(mainCss);
  styles.push("css/graph.css");

  addCssToHead(styles, version);
  addJsToBody(mainJs, version);
})();
