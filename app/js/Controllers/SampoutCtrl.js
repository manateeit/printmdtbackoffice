"use strict";

MDTCRMCtrls.controller('SampoutCtrl', ['$scope','$routeParams','dataSvc','dataShare','$timeout','$http', '$cookieStore',
                            function ($scope, $routeParams, dataSvc, dataShare, $timeout, $http, $cookieStore) {
   
    var SAMPLEOUT = "samplesout";
    var SAMPLEIN = "samplesin";
    var ADDRESS = "MDTAddress";
    var COLOR = "Color";
   
    if ($routeParams.sampoutId == null) {
       console.log($routeParams.sampoutId);
       return;
    }
    else {
        $scope.customerId = $routeParams.customerId;
        $scope.sampoutId = $routeParams.sampoutId;
    }

     dataSvc.getAddress(function(resultAddress) {
        $scope.address = resultAddress;
         console.log("Address:")
         console.log(resultsAddress);
        $scope.$digest($scope.address);
     },ADDRESS);


        dataSvc.childlookup($scope.customerId, $scope.sampoutId, function(result) {
             $scope.data = result;

             $scope.$digest($scope.data);        

             dataSvc.getsamplein($scope.data.materialID.supplierID, $scope.data.materialID.samplesinID, function(resultSamplein) {
                $timeout (function () {
                    $scope.dataSamplein = resultSamplein;

                    
                    dataSvc.getColor(function(resultColor) {
                        $.each(resultColor, function(key, val) {
                            console.log(val);
                            if(val == $scope.dataSamplein.color) {
                                $scope.color = key;
                            }
                        });
                        $scope.$digest($scope.color);
                    },COLOR);

                    $scope.$watch('dataSamplein', function () {
                        var page = document.documentElement.outerHTML
                            .replace(/<script src="bower_components\/angular\/angular.js"><\/script>/g, '')
                            .replace(/(href="|src=")/g, '$1../');
                        $.post("/cachestaticpage.php", { page: page, url: window.location.href } );
                        $('button.dontprint').removeAttr('disabled');
                     });
                });
             }, SAMPLEIN);
        }, SAMPLEOUT);
    }])

