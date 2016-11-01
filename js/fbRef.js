angular.module('app').factory('fbRef', function(auth) {
    return {
        // child references: https://firebase.google.com/docs/reference/js/firebase.database.Reference


        getPreferencesRef: function () {
            console.log(firebase.database());
            return firebase.database().ref('preferences').child(auth.$getAuth().uid);
            //new Firebase('https://../preferences' + auth.$getAuth().uid);
        }
    }
})