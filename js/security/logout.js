angular.module('app').component('logout', {
    controller: function (auth, $location, $timeout) {
        console.log('logging out using', auth);
        
        auth.$signOut();

        $timeout(function() {
            $location.path('/home');
        }, 0);
        
    }
});