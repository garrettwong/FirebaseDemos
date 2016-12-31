var app = angular.module('app', ['ngRoute', 'firebase']);

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(e, next, prev, err) {
        console.log(err);
        if (err === 'AUTH_REQUIRED') {
            $location.path('/login');
        }
    })
});

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

app.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            template: '<home categories="$resolve.categories" firebases-in-order="$resolve.firebasesInOrder"></home>',
            resolve: {
                firebasesInOrder: function(fbRef, firebaseList, auth) {
                    return auth.$requireSignIn().then(function() {
                        var query = fbRef.getFirebasesRef().orderByChild('date');
                        return firebaseList(query).$loaded();
                    });
                },
                categories: function (fbRef, $firebaseArray, auth) {
                    return auth.$requireSignIn().then(function() {
                        var query = fbRef.getCategoriesRef().orderByChild('name');
                        return $firebaseArray(query).$loaded();
                    })
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
                    });
                }
            }
        })
        .when('/categories', {
            template: '<category-list categories="$resolve.categories"></category-list>',
            resolve: {
                categories: function(fbRef, $firebaseArray, auth) {
                    return auth.$requireSignIn().then(function() {
                        var query = fbRef.getCategoriesRef().orderByChild('name');
                        return $firebaseArray(query).$loaded();
                    });
                }
            }
        })
        .when('/friends', {
            template: '<friend-list friends="$resolve.friends"></category-list>',
            resolve: {
                friends: function(fbRef, $firebaseArray, auth) {
                    return auth.$requireSignIn().then(function() {
                        var query = fbRef.getFriendsRef().orderByChild('name');
                        return $firebaseArray(query).$loaded();
                    });
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