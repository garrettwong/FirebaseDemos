angular.module('app').component('firebaseListDisplay', {
    templateUrl: 'js/firebases/firebaseListDisplay.html',

    bindings: {
        firebases: '=firebaseData',
        selectFirebase: '&'
    },

    controller: function () {
        this.deleteFirebase = function (firebase) {
            this.firebases.$remove(firebase);
        };

        this.clickRow = function (firebase) {
            this.selectFirebase({ firebase: firebase });
        };
    }

});