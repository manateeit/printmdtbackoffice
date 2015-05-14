"use strict";

MDTCRMCtrls.controller('CspecCtrl', ['$scope','$routeParams','cspecDataSvc','$timeout','$http',
                            function ($scope, $routeParams, cspecDataSvc, $timeout, $http) {
    var CSPEC = 'customerSpecification';

       if ($routeParams.cspecId == null) {
           console.log($routeParams);
           return;
       } else {
          var id = $routeParams.cspecId;
       }
       cspecDataSvc.queryCspec(id,function(result) {
           $timeout (function () {
               $scope.data = result;
               console.log("here");
        console.log(result);

               $scope.$watch('data', function () {
                   var page = document.documentElement.outerHTML
                       .replace(/<script src="bower_components\/angular\/angular.js"><\/script>/g, '')
                       .replace(/(href="|src=")/g, '$1../');
                   $.post("/cachestaticpage.php", { page: page, url: window.location.href } );
                   $('button.dontprint').removeAttr('disabled');
               });

           });
       }, CSPEC);

   }]);
