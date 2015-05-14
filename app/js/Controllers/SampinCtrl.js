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
   }

        dataSvc.childlookup($scope.customerId, $scope.sampinId, function(result) {

            $scope.data = result;
            console.log("Lookup Sample IN:");
            console.log(result);

             dataSvc.supplierLookup($scope.customerId, function(supplier) {
                 console.log("Lookup Supplier Name");
                 console.log(supplier);
                 $scope.supplier = supplier;

                if(result.contact.id == undefined && result.contact !== undefined){
                    $timeout (function () {
                        dataSvc.contactLookup(result.contact.id, $scope.customerId, function (contact) {
                            console.log("Lookup Contact Info");
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
