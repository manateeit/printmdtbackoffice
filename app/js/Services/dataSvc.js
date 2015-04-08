
angular.module('AngStarter')

       .service('dataSvc', ['dataShare', '$cookieStore', function(dataShare, $cookieStore) {
            var FIREBASEDB = "https://mdtbackoffice.firebaseio.com/DEVELOPMENT/";
            return {
                childlookup: function childlookup (id,recordid,cb,db) {
                    var authdata = $cookieStore.get('UserSession');
                    var fbUrl = FIREBASEDB + db + '/' + id + "/" + recordid;
                    var companyRef = new Firebase(fbUrl);
                    console.log(fbUrl);
                    companyRef.authWithCustomToken(authdata.token, function(error, authdata) {
                        if (!error) {
                            companyRef.on('value', function (snapshot) {
                                cb.call(this, snapshot.val());
                            });
                        }
                    });
                },
                getsamplein: function getsamplein (id, recordid, cb, db) {
                    var authdata = $cookieStore.get('UserSession');
                    var fbUrl = FIREBASEDB + '/' + db + '/' + id + "/" + recordid;
                    var companyRef = new Firebase(fbUrl);
                    companyRef.authWithCustomToken(authdata.token, function(error, authdata) {
                        if (!error) {
                           companyRef.on('value', function (snapshot) {
                                cb.call(this, snapshot.val());
                            });
                         }
                    });
                }
            };
    }])
    .service('dataShare', [ function () {
        this.companyIn = '';

    }]);
      
