"use strict";

MDTCRMCtrls.controller('SampoutCtrl', ['$scope','$routeParams','dataSvc','dataShare','$timeout','$http', '$cookieStore',
                            function ($scope, $routeParams, dataSvc, dataShare, $timeout, $http, $cookieStore) {

    var SAMPLEOUT = "samplesout";
    var SAMPLEIN = "samplesin";
    var ADDRESS = "MDTAddress";
    var COLOR = "Color";
    var DEFAULT = "defaults";

    if ($routeParams.sampoutId == null) {
        return;
    }
    else {
        $scope.customerId = $routeParams.customerId;
        $scope.sampoutId = $routeParams.sampoutId;
    }
     /* Lookup the Sample Out via its ID from Firebase */
        dataSvc.childlookup($scope.customerId, $scope.sampoutId, function(result) {
             $scope.data = result;
             $scope.$digest($scope.data);
        /* Sample out contains a samplein material ID,  lookup SampleIn Parameters */
             dataSvc.getsamplein($scope.data.materialID.supplierID, $scope.data.materialID.samplesinID, function(resultSamplein) {
                $timeout (function () {
                    $scope.dataSamplein = resultSamplein;
         /* Lookup the MDT Address information stored in the DB. */
                    dataSvc.mdtAddress(DEFAULT,ADDRESS,function(resultAddress) {
                            $scope.address = resultAddress;
                            $scope.$digest($scope.address);

         /* Lookup the color.  I am not sure what this is. Please example.. */
                        dataSvc.getColor(function(resultColor) {
                                $.each(resultColor, function(key, val) {
                                    if(val == $scope.dataSamplein.color) {
                                        $scope.color = key;
                                    }
                                });
                                $scope.$digest($scope.color);
                                $scope.$watch('dataSamplein', function () {
                                    var page = document.documentElement.outerHTML
                                        .replace(/<script src="bower_components\/angular\/angular.js"><\/script>/g, '')
                                        .replace(/(href="|src=")/g, '$1../');
                                    $.post("/cachestaticpage.php", { page: page, url: window.location.href } );
                                    $('button.dontprint').removeAttr('disabled');
                                });
                            },COLOR);
                  });
               });
             }, SAMPLEIN);
        }, SAMPLEOUT);
    }]);