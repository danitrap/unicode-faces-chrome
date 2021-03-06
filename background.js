(function () {

  var getJSON = function(url, successHandler, errorHandler) {
    var xhr = typeof XMLHttpRequest != 'undefined'
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('get', url, true);
    xhr.onreadystatechange = function() {
      var status;
      var data;
      // http://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
      if (xhr.readyState == 4) { // `DONE`
        status = xhr.status;
        if (status == 200) {
          data = JSON.parse(xhr.responseText);
          successHandler && successHandler(data);
        } else {
          errorHandler && errorHandler(status);
        }
      }
    };
    xhr.send();
  };

  getJSON('http://commentizer.altervista.org/faces.json',
    function (data) {
      localStorage.setItem('faces', JSON.stringify(data));
    },
    function (status) {
      console.log("Error: ", status);
    });

})();
