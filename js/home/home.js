angular.module('app').component('home', {
    templateUrl: '/js/home/home.html',

    bindings: {
        firebasesInOrder: '='
    },
    controller: function($firebaseObject) {
        
        console.log($firebaseObject);

        var ref = firebase.database().ref();
        // download the data into a local object
        this.data = $firebaseObject(ref);
        // putting a console.log here won't work, see below
    }
});

