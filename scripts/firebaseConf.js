if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyD3CXtOxGXV2_AxiKWD3_68A0DZR6vJEWA",
    authDomain: "portfolio-1-1925e.firebaseapp.com",
    projectId: "portfolio-1-1925e",
  });
  var db = firebase.firestore();
  // firebase
  //   .firestore()
  //   .enablePersistence()
  //   .catch((err) => {
  //     if (err.code == "failed-precondition") {
  //       console.log(err.code);
  //     } else if (err.code == "unimplemented") {
  //       console.log(err.code);
  //     }
  //   });
  // firebase.firestore().settings({
  //   cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
  // });
}
