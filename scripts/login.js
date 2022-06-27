// import {showExpDatasOnTable} from './experienceForm.js'

firebase.initializeApp({
  apiKey: "AIzaSyD3CXtOxGXV2_AxiKWD3_68A0DZR6vJEWA",
  authDomain: "portfolio-1-1925e.firebaseapp.com",
  projectId: "portfolio-1-1925e",
});
function signIn(emailLogin, passLogin) {
  if (emailLogin && passLogin !== "") {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailLogin, passLogin)
      .then((userCredential) => {

        location.href = "form.html";
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + errorMessage);
      });
  } else {
    alert("Please Check Your fields");
  }
}
// window.addEventListener('keypress',(key)=>{
//   if(key.keyCoded === 13){
//     signIn();
//   }
// });