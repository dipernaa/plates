angular.module('myApp', []).controller('PlateCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.plate = plate;
  $scope.messageSent = false;
  $scope.showSuccess = false;

  $scope.sendMessage = function() {
    var errors = $scope.plateForm.$error || {};

    if (Object.keys(errors).length < 1) {
      var data = {
        plateId: $scope.plate._id,
        message: $scope.plateMessage
      };

      $http.post(window.location.pathname, data)
        .success(function (data, status, headers, config) {
          $scope.plateMessage = '';
          $scope.showSuccess = true;
          $scope.messageSent = true;
          console.log('wee');
        })
        .error(function (data, status, headers, config) {
          console.log('boo');
          $scope.showSuccess = false;
          $scope.messageSent = true;
        });
    }
  };
}]);