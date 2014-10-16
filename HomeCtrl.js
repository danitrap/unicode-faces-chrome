angular.module('faces')
  .controller('HomeCtrl', ['$scope', function ($scope) {
    $scope.faces = JSON.parse(localStorage.getItem('faces'));
  }]);