angular.module('faces')
  .directive('copiable', ['$window', '$compile', 'Browser', function ($window, $compile, Browser) {
    return {
      link: function (scope, element, attrs) {

        element.on('click', function () {
          var notif;

          Browser.selectText(this);
          Browser.copy();
          Browser.deselectAll();
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
