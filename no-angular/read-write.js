// https://firebase.google.com/docs/database/web/read-and-write

var FirebaseApi = {};


function readData(userId) {
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        console.log(snapshot.val());

        // render
        $('#userList').html('<li>' + JSON.stringify(snapshot.val()) + '</li>');
    });
}

function readList() {
    return firebase.database().ref('/userposts').once('value').then(function(snapshot) {
        console.log(snapshot.val());

        var val = snapshot.val();

        var arr = [];
        for(var prop in val) {
            var obj = $.extend(val[prop], {_id: prop });
            arr.push(obj);
        }
        console.log(arr);

        // render
        var html = '';
        for(var idx in arr) {
            var gg = '<li>' + JSON.stringify(arr[idx]) + '</li>';
            html += gg;
        }
        $('#userList').append(html);
    });
}

// update
function writeData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
    });
}

// add new
function writeNewUser(uid, username, picture, title, body) {
  // A post entry.
  var postData = {
    author: username,
    //uid: uid,
    body: body,
    title: title,
    authorPic: picture
  };

  console.log(postData);

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('userposts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/userposts/' + newPostKey] = postData;
  //updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}



FirebaseApi.getById = readData;
FirebaseApi.getAll = readList;
FirebaseApi.post = writeNewUser;
FirebaseApi.put = writeData;
