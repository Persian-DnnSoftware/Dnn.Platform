(function () {
  var regex = /\.mobi\.html/;
  var mobi = regex.test(location.href);

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

  var editBarSettings = window.parent["editBarSettings"];
  var debugMode = editBarSettings["debugMode"] === true;
  var cdv = editBarSettings["buildNumber"];
  var version =
    (cdv ? "?cdv=" + cdv : "") + (debugMode ? "&t=" + Math.random() : "");
  var styles = [];
  var mainJs = mobi ? "scripts/main.mobi.js" : "scripts/main.js";
  var themeCss = "css/theme.css";
  var mainCss = mobi ? "css/main.mobi.css" : "css/main.css";

    var hasCustomEditBarTheme = editBarSettings['editBarTheme'];
    if (hasCustomEditBarTheme){
        /* START Persian-DnnSoftware */
        //styles.push('../../../../Portals/_default/EditBarTheme.css');
        if (window.parent['personaBarSettings']['culture'] == 'fa-IR' || window.parent['personaBarSettings']['culture'].startsWith("ar-")) {
            styles.push('../../../../Portals/_default/EditBarTheme.rtl.css');
        }else{
            styles.push('../../../../Portals/_default/EditBarTheme.css');
        }
        /* END Persian-DnnSoftware */
    }
    else{
        styles.push(themeCss);
    }

    /* START Persian-DnnSoftware */
    if (window.parent['personaBarSettings']['culture'] == 'fa-IR' || window.parent['personaBarSettings']['culture'].startsWith("ar-")) {
        mainCss = mobi ? 'css/main.mobi.rtl.css' : 'css/main.rtl.css';
    }
    /* END Persian-DnnSoftware */
    
    styles.push(mainCss);

  addCssToHead(styles, version);
  addJsToBody(mainJs, version);
})();
