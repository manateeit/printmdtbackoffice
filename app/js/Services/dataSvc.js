
angular.module('AngStarter')

       .service('dataSvc', ['dataShare', '$cookieStore','FIREBASEMDTBACKOFFICEDB', function(dataShare, $cookieStore,FIREBASEMDTBACKOFFICEDB) {
            var FIREBASEDB = FIREBASEMDTBACKOFFICEDB;
            return {
                childlookup: function childlookup (id, recordid, cb,db) {
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
                supplierLookup: function supplierLookup (id,cb,db) {
                    var authdata = $cookieStore.get('UserSession');
                    var fbUrl = FIREBASEDB + db + '/' + id + "/";
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
                contactLookup: function supplierLookup (id,sp,cb,db) {
                    var authdata = $cookieStore.get('UserSession');
                    var fbUrl = FIREBASEDB + db + '/' + sp +'/'+ id + "/";
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

                mdtAddress: function mdtAddress (db,id,cb) {
                    var authdata = $cookieStore.get('UserSession');
                    var fbUrl = FIREBASEDB + db + '/' + id ;
                    console.log(fbUrl);
                    var companyRef = new Firebase(fbUrl);
                    companyRef.authWithCustomToken(authdata.token, function(error, authdata) {
                        if (!error) {
                            companyRef.on('value', function (snapshot) {
                                console.log(snapshot.val());
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

    .service('cspecDataSvc', ['Auth', 'FIREBASEMDTBACKOFFICEDB', function(Auth, FIREBASEMDTBACKOFFICEDB) {
        return {
            /**
             * Function: Save Customer Specification
             *
             */
            saveCspec: function saveCspec(dataObj, db) {
                var fbUrl = FIREBASEMDTBACKOFFICEDB  + db + '/';
                var specRef = new Firebase(fbUrl);

                Auth.auth(specRef, function () {

                    specRef = specRef.push(dataObj);
                    dataObj.id = specRef.key();
                    specRef.update(dataObj);

                });
            },
            updateCspec: function saveCspec(dataObj, db) {
                var fbUrl = FIREBASEMDTBACKOFFICEDB  + db + '/' + dataObj.id ;
                var specRef = new Firebase(fbUrl);

                Auth.auth(specRef, function () {
                    specRef.update(dataObj);
                });
            },
            queryCspecs: function queryCspecs(cb,db) {
                var fbUrl = FIREBASEMDTBACKOFFICEDB + db;
                var specRefs = new Firebase(fbUrl);
                Auth.auth(specRefs, function () {
                    specRefs.on("value", function (snapshot) {
                        cb.call(this, snapshot);
                    });
                });
            },
            queryCspec: function queryCspecs(id,cb,db) {
                var fbUrl = FIREBASEMDTBACKOFFICEDB + db + id;
                var specRefs = new Firebase(fbUrl);
                console.log(fbUrl);
               // Auth.auth(specRefs, function () {
                    specRefs.on("value", function (snapshot) {
                        cb.call(this, snapshot.val());
                   // });
                });
            },

            /**
             * Function: getSupContact
             * View all contact data in based on the supplierid.
             */

            getCusContact: function getName (id, cb, db) {
                var fbUrl = FIREBASEMDTBACKOFFICEDB  + db + '/' + id;
                var companyRef = new Firebase(fbUrl);
                Auth.auth(companyRef, function () {
                    companyRef.on('value', function (snapshot) {
                        cb.call(this, snapshot.val());
                        return false;
                    });
                });
            },

            deleteCspecs: function childDelete(childDeleteId, db, cb) {
                var fbUrl = FIREBASEMDTBACKOFFICEDB  + db + '/' + childDeleteId;
                var companyRef = new Firebase(fbUrl);
                Auth.auth(companyRef, function () {
                    //console.log(cb);
                    companyRef.remove(cb);
                });
            },

            /**
             * Function: getDefault
             * View all contact data in based on the supplierid.
             */
            getDefault: function getDefault (fieldName, cb, db) {
                var fbUrl = FIREBASEMDTBACKOFFICEDB  + db + '/' + fieldName;
                //console.log(fbUrl);
                var companyRef = new Firebase(fbUrl);
                Auth.auth(companyRef, function () {
                    companyRef.on('value', function (snapshot) {
                        cb.call(this, snapshot.val());
                        return false;
                    });
                });
            }
        };

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

