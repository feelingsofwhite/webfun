(function () {
    "use strict";

    function myCtrl() {
        var vm = this;
        vm.message = "hello world";
    }

    angular.module('mainApp', [])
        .controller('mainCtrl', myCtrl);

}());
