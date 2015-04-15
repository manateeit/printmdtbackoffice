
angular.module('AngStarter')

       .service('dataSvc', ['dataShare', '$cookieStore','FIREBASEMDTBACKOFFICEDB', function(dataShare, $cookieStore,FIREBASEMDTBACKOFFICEDB) {
            var FIREBASEDB = FIREBASEMDTBACKOFFICEDB;
            return {
                childlookup: function childlookup (id,recordid,cb,db) {
                    var authdata = $cookieStore.get('UserSession');
                    var fbUrl = FIREBASEDB + db + '/' + id + "/" + recordid;
                    console.log(fbUrl);
                    var companyRef = new Firebase(fbUrl);
                    companyRef.authWithCustomToken(authdata.token, function(error, authdata) {
                        if (!error) {
                            companyRef.on('value', function (snapshot) {
                                cb.call(this, snapshot.val());
                            });
                        }
                    });
                },
                mdtAddress: function mdtAddress (id,cb,db) {
                    var authdata = $cookieStore.get('UserSession');
                    var fbUrl = FIREBASEDB + db + '/' + id ;
                    console.log(fbUrl);
                    var companyRef = new Firebase(fbUrl);
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
                    var fbUrl = FIREBASEDB + db + '/' + id + "/" + recordid;
                    var companyRef = new Firebase(fbUrl);
                    companyRef.authWithCustomToken(authdata.token, function(error, authdata) {
                        if (!error) {
                           companyRef.on('value', function (snapshot) {
                                cb.call(this, snapshot.val());
                            });
                         }
                    });
                },

                getColor: function getColor (cb, db) {
                    var authdata = $cookieStore.get('UserSession');
                    var fbUrl = FIREBASEDB + 'defaults/' + db ;
                    var companyRef = new Firebase(fbUrl);
                    companyRef.authWithCustomToken(authdata.token, function(error, authdata) {
                        if (!error) {
                           companyRef.on('value', function (snapshot) {
                                cb.call(this, snapshot.val());
                            });
                         }
                    });
                },

                getAddress: function getAddress (cb, db) {
                    var authdata = $cookieStore.get('UserSession');
                    var fbUrl = FIREBASEDB + 'defaults/MDTAddress' ;
                    console.log(fbUrl);
                    var companyRef = new Firebase(fbUrl);
                    companyRef.authWithCustomToken(authdata.token, function(error, authdata) {
                        if (!error) {
                           companyRef.on('value', function (snapshot) {
                                cb.call(this, snapshot.val());
                            });
                         } else { console.log("Error Reading Address!");}
                    });
                }
            };
    }])
    .service('dataShare', [ function () {
        this.companyIn = '';

    }]);
      


// angular.module('AngStarter')

//        .service('dataSvc', ['dataShare', '$cookieStore', function(dataShare, $cookieStore) {
//             var FIREBASEDB = "https://mdtbackoffice.firebaseio.com/DEVELOPMENT/";
//             return {
//                 childlookup: function childlookup (id,recordid,cb,db) {
//                     // var authdata = $cookieStore.get('UserSession');
//                     var fbUrl = FIREBASEDB + db + '/' + id + "/" + recordid;
//                     var companyRef = new Firebase(fbUrl);
//                     // companyRef.authWithCustomToken(authdata.token, function(error, authdata) {
//                     //     if (!error) {
//                             companyRef.on('value', function (snapshot) {
//                                 cb.call(this, snapshot.val());
//                             });
//                     //     }
//                     // });
//                 },

//                 getsamplein: function getsamplein (id, recordid, cb, db) {
//                     // var authdata = $cookieStore.get('UserSession');
//                     var fbUrl = FIREBASEDB + db + '/' + id + "/" + recordid;
//                     var companyRef = new Firebase(fbUrl);
//                     // companyRef.authWithCustomToken(authdata.token, function(error, authdata) {
//                     //     if (!error) {
//                            companyRef.on('value', function (snapshot) {
//                                 cb.call(this, snapshot.val());
//                             });
//                     //      }
//                     // });
//                 },

//                 getAddress: function getAddress (cb, db) {
//                     // var authdata = $cookieStore.get('UserSession');
//                     var fbUrl = FIREBASEDB + 'defaults/' + db ;
//                     var companyRef = new Firebase(fbUrl);
//                     // companyRef.authWithCustomToken(authdata.token, function(error, authdata) {
//                     //     if (!error) {
//                            companyRef.on('value', function (snapshot) {
//                                 cb.call(this, snapshot.val());
//                             });
//                     //      }
//                     // });
//                 },

//                 getColor: function getColor (cb, db) {
//                     // var authdata = $cookieStore.get('UserSession');
//                     var fbUrl = FIREBASEDB + 'defaults/' + db ;
//                     var companyRef = new Firebase(fbUrl);
//                     // companyRef.authWithCustomToken(authdata.token, function(error, authdata) {
//                     //     if (!error) {
//                            companyRef.on('value', function (snapshot) {
//                                 cb.call(this, snapshot.val());
//                             });
//                     //      }
//                     // });
//                 }
//             };
//     }])
//     .service('dataShare', [ function () {
//         this.companyIn = '';

//     }]);
      
