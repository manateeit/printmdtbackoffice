"use strict";

MDTCRMCtrls.controller('SampoutCtrl', ['$scope','$routeParams','dataSvc','dataShare','$timeout','$http', '$cookieStore',
                            function ($scope, $routeParams, dataSvc, dataShare, $timeout, $http, $cookieStore) {
   
    var SAMPLEOUT = "samplesout";
   if ($routeParams.sampoutId == null) {
       console.log($routeParams.sampoutId);
       return;
   }
    else {
     $scope.customerId = $routeParams.customerId;
     $scope.sampoutId = $routeParams.sampoutId;
     }
        dataSvc.childlookup($scope.customerId, $scope.sampoutId, function(result) {
            $timeout (function () {
                 $scope.data = result;
                 console.log($scope.data);
             // $scope.$watch('data', function () {
             //    var page = document.documentElement.outerHTML
             //        .replace(/<script src="bower_components\/angular\/angular.js"><\/script>/g, '')
             //        .replace(/(href="|src=")/g, '$1../');
             //    $.post("http://printdev.mdtbackoffice.com/cachestaticpage.php", { page: page, url: window.location.href } );
             //    $('button.dontprint').removeAttr('disabled');
             // });
            });
        }, SAMPLEOUT);

    }])

