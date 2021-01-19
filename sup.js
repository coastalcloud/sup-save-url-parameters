/*
1. Add a hidden form field for each URL parameter you’d like to capture.
   The field’s name should match the key of the URL parameter.
2. Include the script on the page(s) where you’d like to use it.
   Change queryForm() to queryForm({reset: true}) to reset values upon form submisision.
*/

var queryForm = function(settings){
  var reset = settings && settings.reset ? settings.reset : false;
  var self = window.location.toString();
  var querystring = self.split("?");
  if (querystring.length > 1) {
    var pairs = querystring[1].split("&");
    for (i in pairs) {
      var keyval = pairs[i].split("=");
      if (reset || sessionStorage.getItem(keyval[0]) === null) {
        sessionStorage.setItem(keyval[0], decodeURIComponent(keyval[1]));
      }
    }
  }
  var hiddenFields = document.querySelectorAll("input[type=hidden], input[type=text]");
  for (var i=0; i<hiddenFields.length; i++) {
    var param = sessionStorage.getItem(hiddenFields[i].name);
    if (param) {
      const els = document.getElementsByName(hiddenFields[i].name)
      if(els && els.length){
        els[0].value = param;
      }
      //if no field with that name, then search by field title
      //example: document.querySelector('[title="utm_campaign"]')
      else {

        const els = document.querySelector(`input[title="${hiddenFields[i].name}"]`);
        
        if(els.length){
          els[0].value = param;
        }
      }
    }
    else {
    }
  }
}

setTimeout(function(){queryForm();}, 3000);
