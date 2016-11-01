angular.module('app').component('nav', {
    templateUrl: '/js/nav/nav.html',

    controller: function ($firebaseObject, fbRef) {
        this.loaded = false;
        
        this.userPreferences = $firebaseObject(fbRef.getPreferencesRef());
        this.userPreferences.$loaded().then((function(data) {
            console.log(data);
            this.loaded = true;
            this.darktheme = this.userPreferences.theme === 'dark';
        }).bind(this));

        this.userPreferences.$watch((function() {
            this.darktheme = this.userPreferences.theme === 'dark';
        }).bind(this));
        
    }
});