var LicenseManagerCustomer = angular.module("myCustomers", ['lbServices'])
LicenseManagerCustomer.controller("myCustomersController", function($scope, $http, Customer){
  $scope.Customers = Customer.find();

});
