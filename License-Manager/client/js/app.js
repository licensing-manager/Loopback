var LicenseManager = angular.module("myCustomers", ['lbServices'])
LicenseManager.controller("myCustomersController", function($scope, $http, Customer){
  $scope.Customers = Customer.find();

});
