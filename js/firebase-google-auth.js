// auth: https://firebase.google.com/docs/auth/web/google-signin
function googleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/plus.login');

    console.log(firebase.auth().currentUser)

    return firebase.auth().signInWithPopup(provider);
}

function googleAuthSuccessHandler(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    renderUser(user);
}

function googleAuthExceptionHandler(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
}

function renderUser(user) {
    for (var prop in user) {
        $tr = $('<tr />');
        
        var $td = $('<td />');

        $td.html(prop);

        $tr.append($td);

        $td = $('<td />');
        $td.html(user[prop]);
        $tr.append($td);

        $('.authdetails').append($tr.prop('outerHTML'));    
    }
}