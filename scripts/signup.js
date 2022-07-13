window.onload = () => {
  signUpInputEventValidation();
};
function signUpInputEventValidation() {
  let emailInput = document.getElementById("signUpEmail");
  let passwordInput = document.getElementById("signUpPassword");
  emailInput.addEventListener("input", () => {
    if (emailInput.value === "") {
      document.getElementById("signUpEmailErrMsg").style.display = "block";
      document.getElementById("signUpEmailErrMsg").innerText =
        "Please Check your Email field";
    } else {
      document.getElementById("signUpEmailErrMsg").style.display = "none";
      document.getElementById("signUpEmailErrMsg").innerText = "";
    }
  });
  passwordInput.addEventListener("input", () => {
    if (passwordInput.value === "") {
      document.getElementById("signUpPasswordErrMsg").style.display = "block";
      document.getElementById("signUpPasswordErrMsg").innerText =
        "Please Check your Password field";
    } else {
      document.getElementById("signUpPasswordErrMsg").style.display = "none";
      document.getElementById("signUpPasswordErrMsg").innerText = "";
    }
  });
}
function signUp(signUpEmail, signUpPassword) {
  if (signUpEmail && signUpPassword !== "") {
    document.getElementById("preLoader").style.display = "block";
    firebase
      .auth()
      .createUserWithEmailAndPassword(signUpEmail, signUpPassword)
      .then((userCredential) => {
        if (userCredential.user.uid) {
          db.collection("PortfolioDetails")
            .doc(userCredential.user.uid)
            .set(
              {
                about_details: {},
                education_details: [],
                experience_details: [],
                skills: [],
                contact_details: {},
                themes: "DefaultTheme",
              },
              { merge: true }
            )
            .then(() => {
              document.getElementById("preLoader").style.display = "none";
              document.getElementById("signUpCommonErr").style.display = "none";
              document.getElementById("signUpCommonErr").children[0].innerText =
                "";
              location.href = "form.html";
            })
            .catch((error) => {
              document.getElementById("preLoader").style.display = "none";
              console.error("Error writing document: ", error);
            });
        }
      })
      .catch((error) => {
        document.getElementById("preLoader").style.display = "none";
        document.getElementById("signUpCommonErr").style.display = "block";
        document.getElementById("signUpCommonErr").children[0].innerText =
          error.message;
      });
  } else {
    if (signUpEmail === "") {
      document.getElementById("signUpEmailErrMsg").style.display = "block";
      document.getElementById("signUpEmailErrMsg").innerText =
        "Please Check your Email field";
    } else {
      document.getElementById("signUpEmailErrMsg").style.display = "none";
      document.getElementById("signUpEmailErrMsg").innerText = "";
    }
    if (signUpPassword === "") {
      document.getElementById("signUpPasswordErrMsg").style.display = "block";
      document.getElementById("signUpPasswordErrMsg").innerText =
        "Please Check your Password field";
    } else {
      document.getElementById("signUpPasswordErrMsg").style.display = "none";
      document.getElementById("signUpPasswordErrMsg").innerText = "";
    }
  }
}
