angular.module('app').factory('firebaseList', function($firebaseArray) {
    var FirebaseList = $firebaseArray.$extend({
        getTotal: function() {
            var total = 0;
            angular.forEach(this.$list, function(rec) {
                total += rec.amount;
            });
            return total;
        }
    });

    return function(ref) {
        return new FirebaseList(ref);
    };
});