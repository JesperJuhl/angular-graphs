(function() { 
  function getScript(src) {
    document.write('<' + 'script src="' + src + '"' +
                   ' type="text/javascript"><' + '/script>');
  }
 
  getScript("https://www.google.com/jsapi");
})();