var db = firebase.firestore();
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    console.log(uid);
    var docRef = db.collection("PortfolioDetails").doc(uid);
    docRef.get().then((doc) => {
      if (doc.exists) {
        let aboutDoc = doc.data()["about_details"];
        let eduDoc = doc.data()["education_details"];
        let expDoc = doc.data()["experience_details"];
        let skillsDoc = doc.data()["skills"];
        let contactDoc = doc.data()["contact_details"];

        document.getElementById("titleForUser").innerText =
          aboutDoc["first_name"] + aboutDoc["last_name"] + "|Resume";

        document.getElementById(
          "aboutName"
        ).innerText = `${aboutDoc["first_name"]} ${aboutDoc["last_name"]}`;

        document.getElementById(
          "addressContact"
        ).innerText = `${contactDoc["address"]}`;

        document.getElementById(
          "mailAndPhoneContact"
        ).innerText = ` ${contactDoc["mail_id"]} | ${contactDoc["phone_no"]}`;

        document.getElementById(
          "aboutDesCol"
        ).innerHTML = `<p>${aboutDoc["about_desc"]}</p>`;

        document.getElementById(
          "contactCol"
        ).innerHTML = `<p>${contactDoc["linkedin_id"]}</p>
          <p>${contactDoc["github_id"]}</p>
          <p>${contactDoc["insta_id"]}</p>
          <p>${contactDoc["fb_id"]}</p>
          <p>${contactDoc["twitter_id"]}</p>`;

        for (let i = 0; i < eduDoc.length; i++) {
          document.getElementById("eduDetails").innerHTML += `<ul class=pl-0>
          <li>${eduDoc[i]["degree"]}</li>
          <li>${eduDoc[i]["instituteName"]}</li>
          <li>${eduDoc[i]["instituteAddress"]}</li>
          <li>${eduDoc[i]["startYearAndMonth"]} - ${eduDoc[i]["endYearAndMonth"]} </li>
          </ul>`;
        }
      }
    });
  } else {
    firebase
      .auth()
      .signOut()
      .then(() => {
        location.href = "login.html";
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
