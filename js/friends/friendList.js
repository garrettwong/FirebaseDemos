angular.module('app').component('friendList', {
    templateUrl: '/js/friends/friendList.html',

    bindings: {
        friends: '='
    },

    controller: function () {
        console.log(this.friends);

        this.createNewFriend = function () {
            console.log(this.newFriendName);

            this.friends.$add(this.friend);

            this.newFriendName = '';
        };
    }
});