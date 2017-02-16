var proj5 = angular.module('proj5',[]);

proj5.controller("createOrJoinController", function ($scope) {

});

proj5.directive('directiveTest',function(){
    return {
        restrict : 'A',
        link : function(scope,element,attrs){
            $(element).select2({
                placeholder : '@username'
            });
        }
    };
});
