angular.module('faces')
  .factory('Browser', ['$document', '$window', function ($document, $window) {
    return {
      selectText: function (element) {
        var doc       = $document[0],
            selection = $window.getSelection(),
            range     = doc.createRange();

          range.selectNodeContents(element);
          selection.removeAllRanges();
          selection.addRange(range);
      },
      deselectAll: function () {
        $window.getSelection().removeAllRanges();
      },
      copy: function () {
        $document[0].execCommand("Copy");
      }
    };
  }]);
