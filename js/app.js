var app = angular.module('app', ['ngRoute', 'firebase']);

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(e, next, prev, err) {
        console.log(err);
        if (err === 'AUTH_REQUIRED') {
            $location.path('/login');
        }
    })
});

app.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            template: '<home></home>',
            resolve: {
                currentAuth: function (auth) {
                    return auth.$requireSignIn();
                }
            }
        })
        .when('/userpref', {
            template: '<edit-user-pref user-preferences="$resolve.userPreferences"></edit-user-pref>',
            resolve: {
                // currentAuth: function (auth) {
                //     return auth.$requireSignIn();
                // },
                userPreferences: function(fbRef, $firebaseObject, auth) {
                    return auth.$requireSignIn().then(function() {
                        return $firebaseObject(fbRef.getPreferencesRef()).$loaded();
                    })
                }
            }
        })
        .when('/categories', {
            template: '<category-list categories="$resolve.categories"></category-list>',
            resolve: {
                categories: function(fbRef, $firebaseObject, auth) {
                    return auth.$requireSignIn().then(function() {
                        return $firebaseObject(fbRef.getCategoriesRef()).$loaded();
                    })
                }
            }
        })
        .when('/login', {
            template: '<login current-auth="$resolve.currentAuth"></login>',
            resolve: {
                currentAuth: function(auth) {
                    return auth.$waitForSignIn();
                }
            }
        })
        .when('/logout', {
            template: '<logout></logout>'
        })
        .otherwise('/home');
});


/*
**  $firebaseObject
        $destroy()
        $id
        $remove()
        $ref()

    Child Refs
    Using Resolve to Query Data (standard method to retrieve data before a route is hit)
    Display & Update data

*/

/*
**
*/
$(function() {
    // initialization
    var config = {
        uid: 'FgOO5JpecmVZqEf6F0KJMIanFsh1'
    };
    
    // get the firebase database reference
    var database = firebase.database();

    // authenticate that there is no currentUser
    // var user = firebase.auth().currentUser;
     firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
             console.log('user is signed in', user);
      
             renderUser(user);
         } else {
             // uncomment this to get user data
             //googleSignIn()
                 //.then(googleAuthSuccessHandler)
                 //.catch(googleAuthExceptionHandler);
         }
     });
    

    $('#btnAddUser').on('click', function(e) {
        // attempt to write data to the firebase database table
        var uid = (new Date()).getMilliseconds();
        var username = $('#name').val();
        var picture = $('#email').val();
        var title = picture,
            body = picture;

        FirebaseApi.post(uid, username, picture, title, body);
    });

    $('#btnGetUsers').click(function(e) {
        FirebaseApi.getById(1);

        FirebaseApi.getAll();
    });
    
});