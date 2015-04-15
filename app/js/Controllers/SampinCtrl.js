"use strict";

MDTCRMCtrls.controller('SampinCtrl', ['$scope','$routeParams','dataSvc','dataShare','$timeout','$http', '$cookieStore',
                            function ($scope, $routeParams, dataSvc, dataShare, $timeout, $http, $cookieStore) {

    var SAMPLESIN = 'samplesin';
    var COLOR = "Color";

   if ($routeParams.sampinId == null) {
       console.log($routeParams.sampinId);
       return;
   } else {
     $scope.customerId = $routeParams.customerId;
     $scope.sampinId = $routeParams.sampinId;
   }
        dataSvc.childlookup($scope.customerId, $scope.sampinId, function(result) {
          $timeout (function () {
             $scope.data = result;

              dataSvc.getColor(function(result) {
                  $.each(result, function(key, val) {
                      console.log(val);
                      if(val == $scope.dataSamplein.color) {
                          $scope.color = key;
                      }
                  });
                  $scope.$digest($scope.color);
              },COLOR);

             $scope.$watch('data', function () {
                var page = document.documentElement.outerHTML
                    .replace(/<script src="bower_components\/angular\/angular.js"><\/script>/g, '')
                    .replace(/(href="|src=")/g, '$1../');
                $.post("/cachestaticpage.php", { page: page, url: window.location.href } );
                $('button.dontprint').removeAttr('disabled');
             });
          });
        }, SAMPLESIN);

    }])

