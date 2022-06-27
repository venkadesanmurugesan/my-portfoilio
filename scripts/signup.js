firebase.initializeApp({
  apiKey: "AIzaSyD3CXtOxGXV2_AxiKWD3_68A0DZR6vJEWA",
  authDomain: "portfolio-1-1925e.firebaseapp.com",
  projectId: "portfolio-1-1925e",
});
function signUp(signUpEmail, signUpPassword) {
  if (signUpEmail && signUpPassword !== "") {
    firebase
      .auth()
      .createUserWithEmailAndPassword(signUpEmail, signUpPassword)
      .then((userCredential) => {
        if (userCredential.user.uid) {
          // let PortfolioDetails = {
          //   about_details: {},
          //   education_details: [],
          //   experience_details: [],
          //   skills: [],
          //   contact_details: {},
          // };
          db.collection("PortfolioDetails")
            .doc(userCredential.user.uid)
            .set(
              {
                about_details: {},
                education_details: [],
                experience_details: [],
                skills: [],
                contact_details: {},
              },
              { merge: true }
            )
            .then(() => {
              console.log("Document successfully written!");
              location.href = "login.html";
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  } else {
    alert("Please Check Your fields");
  }
}
