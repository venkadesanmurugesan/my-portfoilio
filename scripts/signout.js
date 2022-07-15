function signout() {
  if (confirm("Are you sure Sign out...") == true) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        firebase
          .auth()
          .signOut()
          .then(() => {
            location.href = "index.html";
            // console.log(user);
            // Sign-out successful.
          })
          .catch((error) => {
            // console.error(error);
          });
        var uid = user.uid;
        // console.log(uid);
        // ...
      } else {
      }
    });
  }
}
