firebase.initializeApp({
  apiKey: "AIzaSyD3CXtOxGXV2_AxiKWD3_68A0DZR6vJEWA",
  authDomain: "portfolio-1-1925e.firebaseapp.com",
  projectId: "portfolio-1-1925e",
});
function resetEmailEventInputErr(inputEmail, inputErr) {
  if (inputEmail.value === "") {
    inputErr.style.display = "block";
    inputErr.innerText = "Please write your email first.";
  } else {
    inputErr.style.display = "none";
    inputErr.innerText = "";
  }
}

let resetPasswordFunction = (email) => {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      document.getElementById("preLoader").style.display = "none";
      document.getElementById("resetPassCommonErr").style.display = "block";
      document
        .getElementById("resetPassCommonErr")
        .classList.remove("bg-danger");
      document.getElementById("resetPassCommonErr").classList.add("bg-success");
      document.getElementById("resetPassCommonErr").children[0].innerText =
        "Email has been sent to you, Please Check and verify";
    })
    .catch((error) => {
      document.getElementById("preLoader").style.display = "none";
      var errorMessage = error.message;
      document.getElementById("resetPassCommonErr").style.display = "block";
      document
        .getElementById("resetPassCommonErr")
        .classList.remove("bg-success");
      document.getElementById("resetPassCommonErr").classList.add("bg-danger");
      document.getElementById("resetPassCommonErr").children[0].innerText =
        errorMessage;
    });
};

function resetPasswordBtn(resetEmailInput, resetEmailInputErrMsg) {
  let email = resetEmailInput.value;
  if (email !== "") {
    document.getElementById("preLoader").style.display = "block";
    resetEmailInputErrMsg.style.display = "none";
    resetEmailInputErrMsg.innerHTML = "";
    resetPasswordFunction(email);
  } else {
    resetEmailInputErrMsg.style.display = "block";
    resetEmailInputErrMsg.innerHTML = "Please write your email first.";
  }
}
