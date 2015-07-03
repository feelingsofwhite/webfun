(function () {
    "use strict";

    var myCtrl = function myCtrl() {
        var vm = this;
        vm.message = "hello world";
    };

    angular.module('mainApp', [])
        .controller('mainCtrl', myCtrl);

}());
