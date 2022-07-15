var db = firebase.firestore();
(function () {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      uid = user.uid;
      // console.log(uid);
      var docRef = db.collection("PortfolioDetails").doc(uid);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            // themes changing
            let themeMode = doc.data()["themes"];
            themeChanging(themeMode);

            document.getElementById("preLoader").style.display = "none";
            document.getElementById("displayUserName").innerHTML =
              doc.data().about_details.first_name +
              doc.data().about_details.last_name;

            // display about details
            let aboutForm = document.getElementById("about_form");
            aboutForm[0].value = doc.data()["about_details"].first_name;
            aboutForm[1].value = doc.data()["about_details"].last_name;
            aboutForm[2].value = doc.data()["about_details"].about_desc;

            // display education details
            let educationForm = document.getElementById("eduDetailsResult");
            for (let i = 0; i < doc.data()["education_details"].length; i++) {
              educationForm.innerHTML += `<tr id="eduDataRow${i + 1}">
                  <td>${doc.data()["education_details"][i]["degree"]}</td>
                 <td>${doc.data()["education_details"][i]["instituteName"]}</td>
                  <td>${
                    doc.data()["education_details"][i]["instituteAddress"]
                  }</td>
                  <td>${
                    doc.data()["education_details"][i]["startYearAndMonth"]
                  }</td>
                  <td>${
                    doc.data()["education_details"][i]["endYearAndMonth"]
                  }</td>
                     <td class="d-flex justify-content-between">
                     <button onclick=eduEditModalSetDatas(this,${i}) data-keyboard="false"
                     data-backdrop="static" data-toggle="modal"
                     data-target="#editEduFormModal${i + 1}" id="eduEditBtn${
                i + 1
              }" type="button" class="btn btn-info"><i class=" fa-solid fa-pen-to-square"></i>
              </button>
                     <button onclick=eduDelDatas(this,${i}) id="eduDelBtn${
                i + 1
              }" type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                     </td>
                   </tr>`;
            }

            // display experience details
            let experienceForm = document.getElementById("expDetailsResult");
            for (let i = 0; i < doc.data()["experience_details"].length; i++) {
              experienceForm.innerHTML += `<tr id=expShowTableRow${i + 1}>
         <td>${doc.data()["experience_details"][i].position}</td>
         <td>${doc.data()["experience_details"][i].empType}</td>
         <td>${doc.data()["experience_details"][i].organizationName}</td>
         <td>${doc.data()["experience_details"][i].companyLocation}</td>
         <td>${doc.data()["experience_details"][i].expStartMon_year}</td>
         <td>${doc.data()["experience_details"][i].expEndMon_year}</td>
         <td class="d-flex justify-content-between">
                     <button onclick=expEditModalSetDatas(this) id=editExpBtn${
                       i + 1
                     }  data-toggle="modal"
                     data-target="#editExpFormModal${
                       i + 1
                     }" data-keyboard="false"
                     data-backdrop="static" type="button" class="btn btn-info"><i class=" fa-solid fa-pen-to-square"></i>
              </button>
                     <button onclick=expModalDeleteBtn(this,${i}) id=expTableDelBtn${
                i + 1
              } type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                     </td>
         </tr>`;
            }

            // display skills
            let skillsForm = document.getElementById("showSkills");
            if (doc.data()["skills"] !== []) {
              skillsForm.classList.remove("d-none");
              skillsForm.classList.add("d-block");
              let SkillArrDatas = doc.data()["skills"];
              for (let i = 0; i < SkillArrDatas.length; i++) {
                document.getElementById(
                  "showSkills"
                ).children[1].innerHTML += `<li class="list-group-item">${SkillArrDatas[i]} <i onclick=delSkillDatas(this,${i}) style=cursor:pointer class=" fa-solid fa-square-xmark ml-2"></i></li>`;
              }
            } else {
              skillsForm.classList.remove("d-block");
              skillsForm.classList.add("d-none");
            }

            // display contact details
            let contactForm = document
              .getElementById("contact_form")
              .querySelectorAll("input");
            contactForm[0].value = doc.data()["contact_details"]["fb_id"];
            contactForm[1].value = doc.data()["contact_details"]["insta_id"];
            contactForm[2].value = doc.data()["contact_details"]["linkedin_id"];
            contactForm[3].value = doc.data()["contact_details"]["twitter_id"];
            contactForm[4].value = doc.data()["contact_details"]["github_id"];
            contactForm[5].value = doc.data()["contact_details"]["mail_id"];
            contactForm[6].value = doc.data()["contact_details"]["phone_no"];
            contactForm[7].value = doc.data()["contact_details"]["address"];
          } else {
            document.getElementById("preLoader").style.display = "none";
            console.log("No such document!");
          }
        })
        .catch((error) => {
          // console.log("Error getting document:", error);
        });
    } else {
      firebase
        .auth()
        .signOut()
        .then(() => {
          location.href = "index.html";
        })
        .catch((error) => {
          // console.error(error);
        });
    }
  });
})();

// delete user account
function deleteUserAccount() {
  // const cred = fire.firebase_.auth.EmailAuthProvider.credential(
  //   "test@gmail.com",
  //   "testtest"
  // );
  // user.reauthenticateWithCredential(cred);
  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     if (confirm("Are you sure to delete?")) {
  //       document.getElementById("preLoader").style.display = "block";
  //       db.collection("PortfolioDetails")
  //         .doc(`${user.uid}`)
  //         .delete()
  //         .then(() => {
  //           document.getElementById("preLoader").style.display = "none";
  // user
  //   .delete()
  //   .then(() => {
  //     alert("Your account is successfully deleted");
  //     document.getElementById("preLoader").style.display = "none";
  //   })
  //             .catch((error) => {
  //               alert(error.message);
  //               window.location.href = "./index.html";
  //             });
  //         });
  //     }
  //   } else {
  //     firebase
  //       .auth()
  //       .signOut()
  //       .then(() => {
  //         location.href = "index.html";
  //       });
  // }
}
document.getElementById("deleteUserAccount").onclick = () => {
  const pass = "testtest";
  reauthenticate = (pass) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    user.reauthenticateWithCredential(cred);
  };
  // const user = firebase.auth().currentUser;
  // const cred = fire.firebase_.auth.EmailAuthProvider.credential(
  //   "test@gmail.com",
  //   "testtest"
  // );
  // user.reauthenticateWithCredential(cred);
  // if (confirm("Are you sure to delete?")) {
  // }
  // if (confirm("Please Confirm your Login")) {
  //   window.location.href = "./index.html";
  // } else {
  //   return false;
  // }

  // let email = "test@gmail.com   ";
  // let password = "testtest";
  // // let credential = promptForCredentials(email, password);
  // const signInCredential = firebase
  //   .auth()
  //   .EmailAuthProvider.credential({ email, password });
  // // Now you can use that to reauthenticate
  // user.reauthenticateWithCredential(signInCredential);
  // });
};

// update user email
function updateEmail(updateEmailInput) {
  if (updateEmailInput.value !== "" || null) {
    document.getElementById("preLoader").style.display = "block";

    updateEmailInput.nextElementSibling.innerHTML = "";

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (updateEmailInput.value.match(mailformat)) {
      document.getElementById("resetEmailCommonErr").style.display = "none";
      document.getElementById("resetEmailCommonErr").children[0].innerHTML = "";

      const user = firebase.auth().currentUser;
      user
        .updateEmail(`${updateEmailInput.value}`)
        .then(() => {
          document.getElementById("preLoader").style.display = "none";

          document.getElementById("resetEmailCommonErr").style.display =
            "block";
          document
            .getElementById("resetEmailCommonErr")
            .classList.remove("bg-danger");
          document
            .getElementById("resetEmailCommonErr")
            .classList.add("bg-success");
          document.getElementById("resetEmailCommonErr").children[0].innerHTML =
            "Update successful";
        })
        .catch((error) => {
          document.getElementById("preLoader").style.display = "none";

          document
            .getElementById("resetEmailCommonErr")
            .classList.remove("bg-success");
          document
            .getElementById("resetEmailCommonErr")
            .classList.add("bg-danger");
          document.getElementById("resetEmailCommonErr").style.display =
            "block";
          document.getElementById("resetEmailCommonErr").children[0].innerHTML =
            error.message;
        });
    } else {
      document
        .getElementById("resetEmailCommonErr")
        .classList.remove("bg-success");
      document.getElementById("resetEmailCommonErr").classList.add("bg-danger");
      document.getElementById("resetEmailCommonErr").style.display = "block";
      document.getElementById("resetEmailCommonErr").children[0].innerHTML =
        "Your mail is badly Formatted";
    }
  } else {
    document.getElementById("resetEmailCommonErr").style.display = "none";
    document.getElementById("resetEmailCommonErr").children[0].innerHTML = "";
    updateEmailInput.nextElementSibling.innerHTML =
      "Email Address is required field";
  }
}

// update user password
function updatePassword(updatePasswordInput) {
  if (updatePasswordInput.value !== "" || null) {
    document.getElementById("preLoader").style.display = "block";

    updatePasswordInput.nextElementSibling.innerHTML = "";
    const user = firebase.auth().currentUser;
    const newPassword = updatePasswordInput.value;

    user
      .updatePassword(newPassword)
      .then(() => {
        document.getElementById("preLoader").style.display = "none";

        document.getElementById("resetPasswordCommonErr").style.display =
          "block";
        document
          .getElementById("resetPasswordCommonErr")
          .classList.remove("bg-danger");
        document
          .getElementById("resetPasswordCommonErr")
          .classList.add("bg-success");
        document.getElementById(
          "resetPasswordCommonErr"
        ).children[0].innerHTML = "Update successful";
      })
      .catch((error) => {
        document.getElementById("preLoader").style.display = "none";

        document
          .getElementById("resetPasswordCommonErr")
          .classList.remove("bg-success");
        document
          .getElementById("resetPasswordCommonErr")
          .classList.add("bg-danger");
        document.getElementById("resetPasswordCommonErr").style.display =
          "block";
        document.getElementById(
          "resetPasswordCommonErr"
        ).children[0].innerHTML = error.message;
      });
  } else {
    document.getElementById("resetPasswordCommonErr").style.display = "none";
    document.getElementById("resetPasswordCommonErr").children[0].innerHTML =
      "";
    updatePasswordInput.nextElementSibling.innerHTML =
      "New Password is required field";
  }
}

// clear change email modal
document.getElementById("changeEmailDropdownItem").onclick = () => {
  document.getElementById("resetEmailCommonErr").style.display = "none";
  document.getElementById("resetEmailCommonErr").children[0].innerHTML = "";
  document.getElementById("resetEmailInput").value = "";
  document.getElementById("resetEmailInput").nextElementSibling.innerHTML = "";
};

// clear change email modal
document.getElementById("changePasswordDropdownItem").onclick = () => {
  document.getElementById("resetPasswordCommonErr").style.display = "none";
  document.getElementById("resetPasswordCommonErr").children[0].innerHTML = "";
  document.getElementById("resetPasswordInput").value = "";
  document.getElementById("resetPasswordInput").nextElementSibling.innerHTML =
    "";
};

// typing dynamic words
const dynamicText = [
  "Portfolio Details",
  "Resume Details",
  "Portfolio Credentials",
  "Resume Credentials",
];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
  if (count === dynamicText.length) {
    count = 0;
  }
  currentText = dynamicText[count];
  letter = currentText.slice(0, ++index);

  document.querySelector(".typingText").textContent = letter;
  if (currentText.length === letter.length) {
    count++;
    index = 0;
  }
  setTimeout(type, 400);
})();

// theme changing
function themeChanging(pageTheme) {
  document.getElementById("preLoader").style.display = "none";
  if (pageTheme === "DefaultTheme") {
    document.body.classList.remove("bg-white");
    document.body.classList.remove("bg-dark");
    document.body.classList.add("bgGradient");
    document
      .getElementById("typingTextHeading")
      .children[0].classList.remove("text-dark");
    document
      .getElementById("headerForm")
      .children[1].children[0].classList.remove("text-dark");
    document
      .getElementById("typingTextHeading")
      .children[0].classList.add("text-white");
    document
      .getElementById("headerForm")
      .children[1].children[0].classList.add("text-white");
  } else if (pageTheme === "DarkTheme") {
    document.body.classList.remove("bg-white");
    document.body.classList.remove("bgGradient");
    document.body.classList.add("bg-dark");
    document
      .getElementById("typingTextHeading")
      .children[0].classList.remove("text-dark");
    document
      .getElementById("headerForm")
      .children[1].children[0].classList.remove("text-dark");
    document
      .getElementById("typingTextHeading")
      .children[0].classList.add("text-white");
    document
      .getElementById("headerForm")
      .children[1].children[0].classList.add("text-white");
  } else if (pageTheme === "WhiteTheme") {
    document.body.classList.remove("bgGradient");
    document.body.classList.remove("bg-dark");
    document.body.classList.add("bg-white");
    document
      .getElementById("typingTextHeading")
      .children[0].classList.remove("text-white");
    document
      .getElementById("headerForm")
      .children[1].children[0].classList.remove("text-white");
    document
      .getElementById("typingTextHeading")
      .children[0].classList.add("text-dark");
    document
      .getElementById("headerForm")
      .children[1].children[0].classList.add("text-dark");
  }
}
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    var docRef = db.collection("PortfolioDetails").doc(uid);

    docRef.get().then((doc) => {
      let themeMode = doc.data()["themes"];
      let themeDropdownParent = document.getElementById("themeDropdown");
      themeDropdownParent.childNodes.forEach(function (themeBtn) {
        themeBtn.addEventListener("click", () => {
          document.getElementById("preLoader").style.display = "block";
          if (themeBtn.getAttribute("id") === "darkThemeBtn") {
            themeMode = "DarkTheme";
          } else if (themeBtn.getAttribute("id") === "whiteThemeBtn") {
            themeMode = "WhiteTheme";
          } else if (themeBtn.getAttribute("id") === "defaultThemeBtn") {
            themeMode = "DefaultTheme";
          }
          docRef
            .set(
              {
                themes: themeMode,
              },
              { merge: true }
            )
            .then(() => {
              themeChanging(themeMode);
            })
            .catch((error) => {
              // console.error("Error writing document: ", error);
            });
        });
      });
    });
  }
});
