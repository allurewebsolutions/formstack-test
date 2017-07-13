var myApp = angular.module("formstack-app", []);

myApp.controller("MainCtrl", function($scope) {
    $scope.percentage = "";
    $scope.error = "Error (Invalid Decimal): Enter value between 0 and 1";
});

myApp.directive("decimalFloat", function($filter) {
    return {
        require: "ngModel",
        link: function(scope, elm, attrs, ctrl) {
            // Control display and validation
            ctrl.$parsers.unshift(function(viewValue) {
                if (viewValue >= 0 && viewValue <= 1 && viewValue != "") {
                    ctrl.$setValidity("float", true);
                    return $filter("number")(parseFloat(viewValue) * 100, 0) + "%";
                } else {
                    ctrl.$setValidity("float", false);
                    return undefined;
                }
            });

            // Control display from user to input
            ctrl.$formatters.unshift(function(modelValue) {
                return $filter("number")(parseFloat(modelValue) * 100, 0);
            });
        }
    };
});
