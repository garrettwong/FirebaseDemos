angular.module('app').component('home', {
    templateUrl: '/js/home/home.html',

    bindings: {
        firebasesInOrder: '=',
        categories: '='
    },
    controller: function($firebaseObject) {
        
        console.log(this.firebasesInOrder);

        this.createFirebase = function (firebaseData) {
            this.firebasesInOrder.$add(firebaseData);
        };

        this.editFirebase = function(firebase) {
            this.editedFirebase = firebase;
        };

        this.updateFirebase = function() {
            this.firebasesInOrder.$save(this.editedFirebase);
        };
    }
});

