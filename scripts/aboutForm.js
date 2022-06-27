function showAboutDetails(aboutForm, aboutDetails) {
  document.getElementById("displayUserName").innerHTML =aboutDetails["first_name"]+aboutDetails["last_name"];
  aboutForm[0].value = aboutDetails["first_name"];
  aboutForm[1].value = aboutDetails["last_name"];
  aboutForm[2].value = aboutDetails["about_desc"];
}

function postAboutDetails(aboutDetails, uid, aboutForm) {
  db.collection("PortfolioDetails")
    .doc(uid)
    .set({ about_details: aboutDetails }, { merge: true })
    .then(() => {
      document.getElementById("displayUserName").innerHTML =""
      aboutForm[0].value = "";
      aboutForm[1].value = "";
      aboutForm[2].value = "";
      console.log("Document successfully written!");
      showAboutDetails(aboutForm, aboutDetails);
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

function about_btn(aboutForm) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var docRef = db.collection("PortfolioDetails").doc(user.uid);
      docRef.get().then((doc) => {
        if (doc.exists) {
          if (aboutForm[0].value && aboutForm[1].value !== "") {
            let aboutDetails = {
              first_name: aboutForm[0].value,
              last_name: aboutForm[1].value,
              about_desc: aboutForm[2].value,
            };
            postAboutDetails(aboutDetails, user.uid, aboutForm);
          } else {
            alert("Please Check your Required Field !!!");
          }
        }
      });
    }
  });
}
