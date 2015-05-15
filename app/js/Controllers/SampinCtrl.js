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

/*
       $scope.contact = {
         name: 'TEMP',
         email: 'TEMP@email.com',
         workPhone: '9999999999'
*/
     }
   }

        dataSvc.childlookup($scope.customerId, $scope.sampinId, function(result) {

            $scope.data = result;
            console.log("Lookup Sample IN:");
            console.log(result.contact);

             dataSvc.supplierLookup($scope.customerId, function(supplier) {
                 console.log("Lookup Supplier Name");
                 console.log(supplier);
                 $scope.supplier = supplier;

                if(result.contact.id == undefined && result.contact !== undefined){
                    $timeout (function () {
                        dataSvc.contactLookup(result.contact, $scope.customerId, function (contact) {
                            if (contact.workPhone !== undefined ) {
                                    $scope.contact = {
                                        name:contact.fname + " " + contact.lname,
                                        email: contact.email,
                                        workPhone: contact.workPhone
                                    };
                                    $scope.contact.workPhone = contact.workPhone;
                            } else {
                                if (contact.cellPhone !== undefined) {
                                    $scope.contact = {
                                        name:contact.fname + " " + contact.lname,
                                        email: contact.email,
                                        workPhone: contact.cellPhone
                                    };
                                }
                            }



                            $scope.$watch('data', function () {
                                var page = document.documentElement.outerHTML
                                    .replace(/<script src="bower_components\/angular\/angular.js"><\/script>/g, '')
                                    .replace(/(href="|src=")/g, '$1../');
                                $.post("/cachestaticpage.php", {page: page, url: window.location.href});
                                $('button.dontprint').removeAttr('disabled');
                            });
                        }, CONTACTS);
                    });
                } else {

                    $scope.contact.name = result.contact.name;
                    $scope.contact.email = result.contact.email;

                    if (result.contact.workPhone !== undefined ) {
                        $scope.contact.workPhone = result.contact.workPhone;
                    } else {
                        if (result.contact.cellPhone !== undefined) {
                            $scope.contact.workPhone = result.contact.cellPhone;
                        }
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
             }, SUPPLIERS);

        }, SAMPLESIN);

    }]);
