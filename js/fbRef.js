angular.module('app').factory('fbRef', function(auth) {
    return {
        // child references: https://firebase.google.com/docs/reference/js/firebase.database.Reference

        getPreferencesRef: function () {
            console.log(auth.$getAuth()); // gets the user

            return firebase.database().ref('preferences').child(auth.$getAuth().uid);
            //new Firebase('https://../preferences' + auth.$getAuth().uid);
        },
        
        getCategoriesRef: function () {
            return firebase.database().ref('categories');
        },
        
        getFirebasesRef: function () {
            return firebase.database().ref('firebases').child(auth.$getAuth().uid);
        }
    }
})