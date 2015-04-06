"use strict";

MDTCRMCtrls.controller('SampoutCtrl', ['$scope','$routeParams','dataSvc','dataShare','$timeout','$http', '$cookieStore',
                            function ($scope, $routeParams, dataSvc, dataShare, $timeout, $http, $cookieStore) {

   if ($routeParams.sampouId == null) {
       console.log($routeParams.sampouId);
       return;
   }
    else {
     // $scope.customerId = $routeParams.sampouId;
     $scope.sampouId = $routeParams.sampouId;
     }
        dataSvc.childlookup($scope.sampouId, function(result) {
          $timeout (function () {
             $scope.data = result;
             console.log($scope.data);
             $scope.$watch('data', function () {
                var page = document.documentElement.outerHTML
                    .replace(/<script src="bower_components\/angular\/angular.js"><\/script>/g, '')
                    .replace(/(href="|src=")/g, '$1../');
                    // console.log(page);

                $.post("http://printdev.mdtbackoffice.com/cachestaticpage.php", { page: page, url: window.location.href } );
                $('button.dontprint').removeAttr('disabled');
             });
          });
        });

    }])

  .service('dataShare', [ function () {
    this.companyIn = '';

  }])
  .service('dataSvc', ['dataShare', '$cookieStore', function(dataShare, $cookieStore) {
        var FIREBASEDB = "https://mdtbackoffice.firebaseio.com/DEVELOPMENT/";
        
            childlookup: function childlookup (id,cb) {
                var authdata = $cookieStore.get('UserSession');
                console.log(authdata);
                var fbUrl = FIREBASEDB + id;
                var companyRef = new Firebase(fbUrl);
                companyRef.authWithCustomToken(authdata.token, function(error, authdata) {
                    if (!error) {
                        console.log(authdata);
                        companyRef.on('value', function (snapshot) {
                            cb.call(this, snapshot.val());
                        });
                    }
                });
            }
        };

    }]);
