angular.module('faces')
  .directive('copiable', ['$window', '$document', '$compile', function ($window, $document, $compile) {
    return {
      link: function (scope, element, attrs) {

        var selectText = function() {
          var doc = $document[0],
            element = this,
            range, selection;
          if (doc.body.createTextRange) {
            range = $document[0].body.createTextRange();
            range.moveToElementText(element);
            range.select();
          } else if ($window.getSelection) {
            selection = $window.getSelection();
            range = $document[0].createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        };

        element.on('click', function () {
          selectText.apply(this);
          $document[0].execCommand("Copy");
          $window.getSelection().removeAllRanges();
          var notif = angular.element('<notify>Copied to clipboard.</notify>');
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
  }])