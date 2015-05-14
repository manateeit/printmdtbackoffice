"use strict";

MDTCRMCtrls.controller('SampinCtrl', ['$scope','$routeParams','dataSvc','$timeout','$http', '$cookieStore',
                            function ($scope, $routeParams, dataSvc,  $timeout, $http, $cookieStore) {

    var SAMPLESIN = 'samplesin';
    var SUPPLIERS = 'suppliers';
    var CONTACTS = 'contacts';

   if ($routeParams.sampinId == null) {
       console.log($routeParams.sampinId);
       return;
   } else {
     $scope.customerId = $routeParams.customerId;
     $scope.sampinId = $routeParams.sampinId;

       console.log("step1");
   }

        dataSvc.childlookup($scope.customerId, $scope.sampinId, function(result) {
            console.log("step2");
            $scope.data = result;
            console.log("step3");
            console.log(result);

             dataSvc.supplierLookup($scope.customerId, function(supplier) {
                 console.log(supplier);
                 $scope.supplier = supplier;

                if($scope.data.contact.id == undefined){
                    $timeout (function () {
                        dataSvc.contactLookup($scope.data.contact, $scope.customerId, function (contact) {
                            console.log(contact);
                            $scope.data.contact = contact;
                            $scope.$watch('data', function () {
                                var page = document.documentElement.outerHTML
                                    .replace(/<script src="bower_components\/angular\/angular.js"><\/script>/g, '')
                                    .replace(/(href="|src=")/g, '$1../');
                                $.post("/cachestaticpage.php", {page: page, url: window.location.href});
                                $('button.dontprint').removeAttr('disabled');
                            }, CONTACTS);
                        });
                    });
                } else {
                    $timeout(function () {
                        $scope.$watch('data', function () {
                            var page = document.documentElement.outerHTML
                                .replace(/<script src="bower_components\/angular\/angular.js"><\/script>/g, '')
                                .replace(/(href="|src=")/g, '$1../');
                            $.post("/cachestaticpage.php", {page: page, url: window.location.href});
                            $('button.dontprint').removeAttr('disabled');
                        });
                    });
                }
             }, SUPPLIERS);

        }, SAMPLESIN);

    }]);
