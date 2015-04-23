"use strict";

MDTCRMCtrls.controller('RetainInCtrl', ['$scope','$routeParams','dataSvc','dataShare','$timeout','$http', '$cookieStore',
                            function ($scope, $routeParams, dataSvc, dataShare, $timeout, $http, $cookieStore) {

    var RETAININ = 'retainin';

   if ($routeParams.retaininId == null) {
       console.log($routeParams.retaininId);
       return;
   } else {
     $scope.supplierId = $routeParams.supplierId;
     $scope.retaininId = $routeParams.retaininId;
   }
        dataSvc.childlookup($scope.supplierId, $scope.retaininId, function(result) {
          $timeout (function () {
             $scope.data = result;

            
             console.log($scope.data);

             $scope.$watch('data', function () {
                var page = document.documentElement.outerHTML
                    .replace(/<script src="bower_components\/angular\/angular.js"><\/script>/g, '')
                    .replace(/(href="|src=")/g, '$1../');
                $.post("/cachestaticpage.php", { page: page, url: window.location.href } );
                $('button.dontprint').removeAttr('disabled');
             });
          });
        }, RETAININ);

    }])

