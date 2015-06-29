var myapp = angular.module('MainApp', [])
myapp.controller('MainCtrl', function() {
    var vm = this;
    vm.message = "hello world";
});