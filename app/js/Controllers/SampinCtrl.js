"use strict";

MDTCRMCtrls.controller('SampinCtrl', ['$scope','$routeParams','dataSvc','dataShare','$timeout','$http', '$cookieStore',
                            function ($scope, $routeParams, dataSvc, dataShare, $timeout, $http, $cookieStore) {

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
             dataSvc.supplierLookup($scope.customerId, function(supplier) {

                 $timeout (function () {
                    dataSvc.contactLookup($scope.data.contact, $scope.customerId, function(contact){

                        $scope.supplier = supplier;
                        $scope.data.contact = contact;

                        $scope.$watch('data', function () {
                            var page = document.documentElement.outerHTML
                                .replace(/<script src="bower_components\/angular\/angular.js"><\/script>/g, '')
                                .replace(/(href="|src=")/g, '$1../');
                            $.post("/cachestaticpage.php", { page: page, url: window.location.href } );
                            $('button.dontprint').removeAttr('disabled');



                        },CONTACTS)
                 });

             });

             }, SUPPLIERS);


          });
        }, SAMPLESIN);

    }]);
