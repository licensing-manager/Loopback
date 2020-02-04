var LicenseManagerCustomer = angular.module("myCustomers", ['lbServices'])
LicenseManagerCustomer.controller("myCustomersController", function($scope, $http, Customer){
  $scope.Customers = Customer.find();

});
var LicenseManagerPurchase = angular.module("myPurchases", ['lbServices'])
LicenseManagerPurchase.controller("myPurchasesController", function($scope, $http, Purchase){
  $scope.Purchases = Purchase.find();

});