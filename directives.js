angular.module('faces')
  .directive('copiable', ['$window', '$document', '$compile', function ($window, $document, $compile) {
    return {
      link: function (scope, element, attrs) {

        var selectText = function() {
          var doc       = $document[0],
              elem      = this,
              selection = $window.getSelection(),
              range     = doc.createRange();

          range.selectNodeContents(elem);
          selection.removeAllRanges();
          selection.addRange(range);
        };

        element.on('click', function () {
          var notif;

          selectText.apply(this);
          $document[0].execCommand("Copy");
          $window.getSelection().removeAllRanges();
          notif = angular.element('<notify>Copied to clipboard.</notify>');
          element.append(notif);
          $compile(notif)(scope);
        })
      }
    };
  }])
  .directive('notify', ['$timeout', '$interval', function ($timeout, $interval) {
    return {
      restrict: 'E',
      transclude: true,
      template: '<span class="notif" ng-transclude></span>',
      link: function (scope, element, attrs) {
        var opacity = 1;
        $timeout(function () {
          var timer = $interval(function () {
            if (opacity <= 0.1) {
              $interval.cancel(timer);
              element.remove();
            }
            element.css('opacity', opacity);
            opacity -= opacity * 0.1;
          }, 50);
        }, 1000);
      }
    }
  }]);
