angular.module('app').component('login', {
    templateUrl: '/js/security/login.html',
    bindings: {
        currentAuth: '=' //corresponds to the name of the attribute        
    },
    controller: function (auth, $location) {
        console.log('auth service', auth);

        this.loggedIn = !!this.currentAuth;
        

        // anonymous login on button click
        this.anonLogin = function () {
            auth.$signInAnonymously().then(function () {
                $location.path('/home');
            }).catch((function (err) {
                this.errorMessage = err.code;
            }).bind(this));
        };

        // google login
        this.googleLogin = function () {
            auth.$signInWithPopup('google').then(function () {
                $location.path('/home');
            }).catch((function (err) {
                this.errorMessage = err.code;
            }).bind(this));
        };

        // fb login: https://firebase.google.com/docs/auth/web/facebook-login
        // this will not work at this time, because it needs to be configured in the firebase console.  please reference the above link
        this.fbLogin = function () {
            auth.$signInWithPopup('facebook').then(function () {
                $location.path('/home');
            }).catch((function (err) {
                this.errorMessage = err.code;
            }).bind(this));
        };
    }
});