function showContactDetails(contactObj, contactForm) {
  contactForm.elements[0].value = contactObj["fb_id"];
  contactForm.elements[1].value = contactObj["insta_id"];
  contactForm.elements[2].value = contactObj["linkedin_id"];
  contactForm.elements[3].value = contactObj["twitter_id"];
  contactForm.elements[4].value = contactObj["github_id"];
  contactForm.elements[5].value = contactObj["mail_id"];
  contactForm.elements[6].value = contactObj["phone_no"];
  contactForm.elements[7].value = contactObj["address"];
}

function postContactDetails(contactObj, uid, contactForm) {
  db.collection("PortfolioDetails")
    .doc(uid)
    .set({ contact_details: contactObj }, { merge: true })
    .then(() => {
      contactForm.elements[0].value = "";
      contactForm.elements[1].value = "";
      contactForm.elements[2].value = "";
      contactForm.elements[3].value = "";
      contactForm.elements[4].value = "";
      contactForm.elements[5].value = "";
      contactForm.elements[6].value = "";
      contactForm.elements[7].value = "";
      console.log("Document successfully written!");
      showContactDetails(contactObj, contactForm);
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

function contact_btn(contactForm) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var docRef = db.collection("PortfolioDetails").doc(user.uid);
      docRef.get().then((doc) => {
        if (doc.exists) {
          if (
            contactForm.elements[5].value &&
            contactForm.elements[6].value &&
            contactForm.elements[7].value !== ""
          ) {
            let contactObj = {
              fb_id: contactForm.elements[0].value,
              insta_id: contactForm.elements[1].value,
              linkedin_id: contactForm.elements[2].value,
              twitter_id: contactForm.elements[3].value,
              github_id: contactForm.elements[4].value,
              mail_id: contactForm.elements[5].value,
              phone_no: contactForm.elements[6].value,
              address: contactForm.elements[7].value,
            };
            postContactDetails(contactObj, user.uid, contactForm);
          } else {
            alert("Please Check your Required Field !!!");
          }
        }
      });
    }
  });
}
