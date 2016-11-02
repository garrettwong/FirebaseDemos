/*
**  $firebaseObject
        $destroy()
        $id
        $remove()
        $ref()

    Child Refs
    Using Resolve to Query Data (standard method to retrieve data before a route is hit)
    Display & Update data

*/

/*
**
*/
$(function() {
    // initialization
    var config = {
        uid: 'FgOO5JpecmVZqEf6F0KJMIanFsh1'
    };
    
    // get the firebase database reference
    var database = firebase.database();

    // authenticate that there is no currentUser
    // var user = firebase.auth().currentUser;
     firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
             console.log('user is signed in', user);
      
             renderUser(user);
         } else {
             // uncomment this to get user data
             //googleSignIn()
                 //.then(googleAuthSuccessHandler)
                 //.catch(googleAuthExceptionHandler);
         }
     });
    

    $('#btnAddUser').on('click', function(e) {
        // attempt to write data to the firebase database table
        var uid = (new Date()).getMilliseconds();
        var username = $('#name').val();
        var picture = $('#email').val();
        var title = picture,
            body = picture;

        FirebaseApi.post(uid, username, picture, title, body);
    });

    $('#btnGetUsers').click(function(e) {
        FirebaseApi.getById(1);

        FirebaseApi.getAll();
    });
    
});