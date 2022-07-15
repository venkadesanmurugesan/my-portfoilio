function showAboutDetails(aboutForm, aboutDetails) {
  document.getElementById("displayUserName").innerHTML =
    aboutDetails["first_name"] + aboutDetails["last_name"];
  aboutForm[0].value = aboutDetails["first_name"];
  aboutForm[1].value = aboutDetails["last_name"];
  aboutForm[2].value = aboutDetails["about_desc"];
}

function postAboutDetails(aboutDetails, uid, aboutForm) {
  db.collection("PortfolioDetails")
    .doc(uid)
    .set({ about_details: aboutDetails }, { merge: true })
    .then(() => {
      document.getElementById("displayUserName").innerHTML = "";
      aboutForm[0].value = "";
      aboutForm[1].value = "";
      aboutForm[2].value = "";

      document.getElementById("preLoader").style.display = "none";
      showAboutDetails(aboutForm, aboutDetails);
    })
    .catch((error) => {
      document.getElementById("preLoader").style.display = "none";
    });
}

function about_btn(aboutForm) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var docRef = db.collection("PortfolioDetails").doc(user.uid);
      docRef.get().then((doc) => {
        if (aboutForm[0].value && aboutForm[1].value !== "") {
          document
            .getElementById("firstAndLastNameErrMsg")
            .previousElementSibling.classList.add("mb-4");
          document.getElementById("firstAndLastNameErrMsg").style.display =
            "none";
          document.getElementById("firstAndLastNameErrMsg").innerText = "";
          document.getElementById("preLoader").style.display = "block";
          if (doc.exists) {
            let aboutDetails = {
              first_name: aboutForm[0].value,
              last_name: aboutForm[1].value,
              about_desc: aboutForm[2].value,
            };

            postAboutDetails(aboutDetails, user.uid, aboutForm);
          }
        } else {
          document
            .getElementById("firstAndLastNameErrMsg")
            .previousElementSibling.classList.remove("mb-4");
          document.getElementById("firstAndLastNameErrMsg").style.display =
            "block";
          document.getElementById("firstAndLastNameErrMsg").innerText =
            "Please Check your required field";
        }
      });
    }
  });
}
