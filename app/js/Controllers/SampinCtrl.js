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
            dataSvc.supplierLookup($scope.customerId, function(supplier) {
                $timeout (function () {
                $scope.supplier = supplier;
                if(result.contact.id == undefined && result.contact !== undefined){
                        dataSvc.contactLookup(result.contact, $scope.customerId, function (contact) {
                            $timeout (function() {
                                if (contact.workPhone !== undefined ) {
                                    $scope.contact = {
                                        name: contact.fname + " " + contact.lname,
                                        email: contact.email,
                                        workPhone: contact.workPhone
                                    };
                                } else {
                                    if (contact.cellPhone !== undefined) {
                                        $scope.contact = {
                                            name: contact.fname + " " + contact.lname,
                                            email: contact.email,
                                            workPhone: contact.cellPhone
                                        };
                                    }
                                };
                                $scope.$watch('data', function () {
                                    var page = document.documentElement.outerHTML
                                        .replace(/<script src="bower_components\/angular\/angular.js"><\/script>/g, '')
                                        .replace(/(href="|src=")/g, '$1../');
                                    $.post("/cachestaticpage.php", {page: page, url: window.location.href});
                                    $('button.dontprint').removeAttr('disabled');
                                });
                            });
                        }, CONTACTS);

                } else {

                    if (result.contact.workPhone !== undefined ) {
                        $scope.contact = {
                            name: result.contact.name,
                            email: result.contact.email,
                            workPhone: result.contact.workPhone                        };
                    } else {
                        if (result.contact.cellPhone !== undefined) {
                            $scope.contact = {
                                name: result.contact.name,
                                email: result.contact.email,
                                workPhone: result.contact.cellPhone
                            };
                        }

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
                });
             }, SUPPLIERS);

        }, SAMPLESIN);

    }]);
