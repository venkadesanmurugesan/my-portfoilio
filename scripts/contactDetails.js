function contactInputEventValidation() {
  let contactElements = document.getElementById("contact_form").elements;
  contactElements[5].addEventListener("input", () => {
    let contactMailErr = document.getElementById("contactMailIdErrMsg");
    if (contactElements[5].value === "" || null) {
      contactMailErr.style.display = "block";
      contactMailErr.innerText = "Mail ID is required field";
    } else {
      contactMailErr.style.display = "none";
      contactMailErr.innerText = "";
    }
  });
  contactElements[6].addEventListener("input", () => {
    let contactPhoneErr = document.getElementById("contactPhoneErrMsg");
    if (contactElements[6].value === "" || null) {
      contactPhoneErr.style.display = "block";
      contactPhoneErr.innerText = "Phone Number is required field";
    } else {
      contactPhoneErr.style.display = "none";
      contactPhoneErr.innerText = "";
    }
  });
  contactElements[7].addEventListener("input", () => {
    let contactAddressErr = document.getElementById("contactAddErrMsg");
    if (contactElements[7].value === "" || null) {
      contactAddressErr.style.display = "block";
      contactAddressErr.innerText = "Address is required field";
    } else {
      contactAddressErr.style.display = "none";
      contactAddressErr.innerText = "";
    }
  });
}
contactInputEventValidation();

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

      showContactDetails(contactObj, contactForm);
      document.getElementById("preLoader").style.display = "none";
    })
    .catch((error) => {
      document.getElementById("preLoader").style.display = "none";
      // console.error("Error writing document: ", error);
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
            let urlFormat =
              /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

            let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (contactForm.elements[5].value.match(mailformat)) {
              document.getElementById("contactMailIdErrMsg").style.display =
                "none";
              document.getElementById("contactMailIdErrMsg").innerText = "";
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

              document.getElementById("preLoader").style.display = "block";
              postContactDetails(contactObj, user.uid, contactForm);
              return true;
            } else {
              document.getElementById("contactMailIdErrMsg").style.display =
                "block";
              document.getElementById("contactMailIdErrMsg").innerText =
                "Invalid email address!";
              return false;
            }
          } else {
            if (contactForm.elements[5].value === "" || null) {
              document.getElementById("contactMailIdErrMsg").style.display =
                "block";
              document.getElementById("contactMailIdErrMsg").innerText =
                "Mail ID is required field";
            } else {
              document.getElementById("contactMailIdErrMsg").style.display =
                "none";
              document.getElementById("contactMailIdErrMsg").innerText = "";
            }
            if (contactForm.elements[6].value === "" || null) {
              document.getElementById("contactPhoneErrMsg").style.display =
                "block";
              document.getElementById("contactPhoneErrMsg").innerText =
                "Phone Number is required field";
            } else {
              document.getElementById("contactPhoneErrMsg").style.display =
                "none";
              document.getElementById("contactPhoneErrMsg").innerText = "";
            }
            if (contactForm.elements[7].value === "" || null) {
              document.getElementById("contactAddErrMsg").style.display =
                "block";
              document.getElementById("contactAddErrMsg").innerText =
                "Address is required field";
            } else {
              document.getElementById("contactAddErrMsg").style.display =
                "none";
              document.getElementById("contactAddErrMsg").innerText = "";
            }
          }
        }
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
}
