firebase.initializeApp({
  apiKey: "AIzaSyD3CXtOxGXV2_AxiKWD3_68A0DZR6vJEWA",
  authDomain: "portfolio-1-1925e.firebaseapp.com",
  projectId: "portfolio-1-1925e",
});

window.onload = () => {
  loginInputEventValidation();
};
function loginInputEventValidation() {
  let emailInput = document.getElementById("loginEmail");
  let passwordInput = document.getElementById("loginPassword");
  emailInput.addEventListener("input", () => {
    if (emailInput.value === "") {
      document.getElementById("loginEmailErrMsg").style.display = "block";
      document.getElementById("loginEmailErrMsg").innerText =
        "Please Check your Email field";
    } else {
      document.getElementById("loginEmailErrMsg").style.display = "none";
      document.getElementById("loginEmailErrMsg").innerText = "";
    }
  });
  passwordInput.addEventListener("input", () => {
    if (passwordInput.value === "") {
      document.getElementById("loginPasswordErrMsg").style.display = "block";
      document.getElementById("loginPasswordErrMsg").innerText =
        "Please Check your Password field";
    } else {
      document.getElementById("loginPasswordErrMsg").style.display = "none";
      document.getElementById("loginPasswordErrMsg").innerText = "";
    }
  });
}
function signIn(emailLogin, passLogin) {
  if (emailLogin.value && passLogin.value !== "") {
    document.getElementById("preLoader").style.display = "block";
    firebase
      .auth()
      .signInWithEmailAndPassword(emailLogin.value, passLogin.value)
      .then((userCredential) => {
        document.getElementById("preLoader").style.display = "none";
        document.getElementById("loginCommonErr").style.display = "none";
        document.getElementById("loginCommonErr").children[0].innerText = "";

        location.href = "form.html";
      })
      .catch((error) => {
        document.getElementById("preLoader").style.display = "none";
        document.getElementById("loginCommonErr").style.display = "block";
        document.getElementById("loginCommonErr").children[0].innerText =
          "Login was unsuccessful, please check your username and password";

        return false;
      });
  } else {
    if (emailLogin.value === "") {
      document.getElementById("loginEmailErrMsg").style.display = "block";
      document.getElementById("loginEmailErrMsg").innerText =
        "Please Check your Email field";
    } else {
      document.getElementById("loginEmailErrMsg").style.display = "none";
      document.getElementById("loginEmailErrMsg").innerText = "";
    }
    if (passLogin.value === "") {
      document.getElementById("loginPasswordErrMsg").style.display = "block";
      document.getElementById("loginPasswordErrMsg").innerText =
        "Please Check your Password field";
    } else {
      document.getElementById("loginPasswordErrMsg").style.display = "none";
      document.getElementById("loginPasswordErrMsg").innerText = "";
    }
  }
}
