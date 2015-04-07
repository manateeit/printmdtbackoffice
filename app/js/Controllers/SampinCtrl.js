"use strict";

MDTCRMCtrls.controller('SampinCtrl', ['$scope','$routeParams','dataSvc','dataShare','$timeout','$http', '$cookieStore',
                            function ($scope, $routeParams, dataSvc, dataShare, $timeout, $http, $cookieStore) {

   if ($routeParams.sampinId == null) {
       console.log($routeParams.sampinId);
       return;
   }
    else {
     $scope.customerId = $routeParams.customerId;
     $scope.sampinId = $routeParams.sampinId;
     }
        dataSvc.childlookup($scope.customerId,$scope.sampinId, function(result) {
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
        return {
            childAdded: function childAdded(id,cb) {
                var fbUrl = 'https://mdtbackoffice.firebaseio.com/samplesin/' + id;
                var companyRef = new Firebase(fbUrl);
                companyRef.on('child_added', function (snapshot) {
                    cb.call(this, snapshot.val());
                });
            },
            childDelete: function childDelete(childDeleteId) {
                var fbUrl = 'https://mdtbackoffice.firebaseio.com/samplesin/' + childDeleteId ;
                var companyRef = new Firebase(fbUrl);
                companyRef.remove();
            },
            childSave: function childSave(samplein) {
                var fbUrl = 'https://mdtbackoffice.firebaseio.com/samplesin/' + samplein.supplier.id + '/';
                var companyRef = new Firebase(fbUrl);
                var recordObj = {
                    date : samplein.date,
                    material: samplein.material,
                    supplier: samplein.supplier,
                    id: samplein.id,
                    description: samplein.description,
                    supplierPartNumber: samplein.supplierPartNumber,
                    pricing: samplein.pricing,
                    dateReceived: samplein.dateReceived,
                    amountReceived: samplein.amountReceived,
                    comments: samplein.comments,
                    monthlyVolume: samplein.monthlyVolume,
                    color: samplein.color,
                    fob: samplein.fob,
                    colorChipImage: samplein.colorChipImage,
                    provided: samplein.provided,
                    tested: samplein.tested
                };
                var objArry = Object.keys(recordObj);
                for(var i=0; i< objArry.length; ++i)
                {
                    if (typeof recordObj[objArry[i]] === 'undefined') { recordObj[objArry[i]] = "" }
                }
                companyRef.child(samplein.id).set(recordObj);
            },
            setId: function setId(currentId,dbtype){
                var fbUrl = FIREBASEDB + 'counters/';
                console.log("raise counter");
                console.log(currentId);
                console.log(dbtype);
                var companyRef = new Firebase(fbUrl);
                currentId++;
                var countersType = {samplesin: currentId};
                companyRef.update(countersType);
            },
            getId: function getId(cb,db){
                var fbUrl = FIREBASEDB + 'counters/' + db;

                var companyRef = new Firebase(fbUrl);
                companyRef.once('value', function (snapshot) {
                    cb.call(this, snapshot.val());
                });
            },
            childlookup: function childlookup (id,recordid,cb) {
                var authdata = $cookieStore.get('UserSession');
                // console.log(authdata);
                var fbUrl = FIREBASEDB + '/samplesin/' + id + "/" + recordid;
                var companyRef = new Firebase(fbUrl);
                companyRef.authWithCustomToken(authdata.token, function(error, authdata) {
                    if (!error) {
                        console.log(authdata);
                        companyRef.on('value', function (snapshot) {
                            cb.call(this, snapshot.val());
                        });
                    }
                });
            },
            queryAll: function queryAll(id,cb) {
                var fbUrl = 'https://mdtbackoffice.firebaseio.com/samplesin/';
                var companyRef = new Firebase(fbUrl);
                companyRef.on('child_added', function (snapshot) {
                    cb.call(this, snapshot.val());
                });
            }
        };

    }]);
