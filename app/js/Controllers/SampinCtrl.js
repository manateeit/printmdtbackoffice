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
          $timeout (function () {
             $scope.data = result;
              console.log(data);
             dataSvc.supplierLookup($scope.customerId, function(supplier) {
                 console.log(supplier);
                 $scope.supplier = supplier;
                if(data.contact.id == undefined){
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
          });
        }, SAMPLESIN);

    }]);
