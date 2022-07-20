function showAboutDetails(aboutForm, aboutDetails) {
  document.getElementById("displayUserName").innerHTML =
    aboutDetails["first_name"] + "" + aboutDetails["last_name"];
  aboutForm[0].value = aboutDetails["first_name"];
  aboutForm[1].value = aboutDetails["last_name"];
  aboutForm[2].value = aboutDetails["about_desc"];
  // console.log(aboutDetails["hobbies"]);
  // for (let i = 0; i < aboutDetails["hobbies"].length; i++) {
  //   document.getElementById(
  //     "hobbiesDataShowAfterSave"
  //   ).innerHTML += `<span class="border pl-2 pr-1" style="display: flex; align-items: center; justify-content: space-between;"><small>${aboutDetails["hobbies"][i]}</small><b onclick="deleteHobbiesData(this.parentElement,${i})" class="h3 ml-2 text-muted" aria-hidden="true" style="cursor: pointer;">&times;</b></span>`;
  // }
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
          document.getElementById("fname_lnameErrMsg").innerText = "";
          document.getElementById("areaOfInterestErrMsg").innerText = "";
          document.getElementById("hobbiesErrMsg").innerText = "";

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
          document.getElementById("fname_lnameErrMsg").innerText =
            "Please Check your required field";
        }
      });
    }
  });
}
// hobbies section
function showHobbiesDatas(hobbiesArr) {
  document.getElementById("preLoader").style.display = "none";

  for (let i = 0; i < hobbiesArr.length; i++) {
    document.getElementById(
      "hobbiesDataShow"
    ).innerHTML += `<li id="hobbiesRow${i}" style =" display: flex;
  align-items: center;
   justify-content: space-between;" class="list-group-item list-group-item-action">${hobbiesArr[i]}
   <i onclick="deleteHobbies(this.parentElement.getAttribute('id'),${i})" style = "cursor:pointer" class="fa fa-trash-o delete"></i>
   </li>`;
  }
}

function postHobbiesDatas(hobbiesArr) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      document.getElementById("preLoader").style.display = "block";

      var docRef = db.collection("PortfolioDetails").doc(user.uid);
      docRef.set({ hobbies: hobbiesArr }, { merge: true }).then(() => {
        document.getElementById("hobbiesDataShow").innerHTML = "";
        showHobbiesDatas(hobbiesArr);
        document.getElementById("about_hobbies").value = "";
      });
    }
  });
}

function deleteHobbies(deleteElementId, iterativeValue) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var docRef = db.collection("PortfolioDetails").doc(user.uid);
      docRef.get().then((doc) => {
        let hobbiesArr = doc.data()["hobbies"];
        hobbiesArr[iterativeValue] = "";
        delete hobbiesArr[iterativeValue];
        let filteredHobbiesData = hobbiesArr.filter((hobbiesData) => {
          return hobbiesData !== null;
        });
        postHobbiesDatas(filteredHobbiesData);
        document.getElementById(deleteElementId).remove();
      });
    }
  });
}
function addHobbiesDatas() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var docRef = db.collection("PortfolioDetails").doc(user.uid);
      docRef.get().then((doc) => {
        let hobbiesInput = document.getElementById("about_hobbies");
        if (hobbiesInput.value) {
          document.getElementById("hobbiesErrMsg").innerText = "";
          let hobbiesArr = doc.data()["hobbies"];
          hobbiesArr.push(hobbiesInput.value);
          postHobbiesDatas(hobbiesArr);
        } else {
          document.getElementById("hobbiesErrMsg").innerText =
            "Please fill your Hobbies field before add";
        }
      });
    }
  });
}

// area of interest section
function showAreaOfInterestDatas(areaOfInterestArr) {
  document.getElementById("preLoader").style.display = "none";

  for (let i = 0; i < areaOfInterestArr.length; i++) {
    document.getElementById(
      "areaOfInterestDataShow"
    ).innerHTML += `<li id="areaOfInterestRow${i}" style =" display: flex;
  align-items: center;
   justify-content: space-between;" class="list-group-item list-group-item-action">${areaOfInterestArr[i]}
   <i onclick="deleteAreaOfInterest(this.parentElement.getAttribute('id'),${i})" style = "cursor:pointer" class="fa fa-trash-o delete"></i>
   </li>`;
  }
}

function postAreaOfInterestDataShowDatas(areaOfInterestArr) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      document.getElementById("preLoader").style.display = "block";

      var docRef = db.collection("PortfolioDetails").doc(user.uid);
      docRef
        .set({ area_interest: areaOfInterestArr }, { merge: true })
        .then(() => {
          document.getElementById("areaOfInterestDataShow").innerHTML = "";
          showAreaOfInterestDatas(areaOfInterestArr);
          document.getElementById("areaOfInterest").value = "";
        });
    }
  });
}

function deleteAreaOfInterest(deleteElementId, iterativeValue) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var docRef = db.collection("PortfolioDetails").doc(user.uid);
      docRef.get().then((doc) => {
        let areaOfInterestArr = doc.data()["area_interest"];
        areaOfInterestArr[iterativeValue] = "";
        delete areaOfInterestArr[iterativeValue];
        let filteredAreaOfInterestData = areaOfInterestArr.filter(
          (AreaOfInterestData) => {
            return AreaOfInterestData !== null;
          }
        );
        postAreaOfInterestDataShowDatas(filteredAreaOfInterestData);
        document.getElementById(deleteElementId).remove();
      });
    }
  });
}
function addAreaOfInterest() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var docRef = db.collection("PortfolioDetails").doc(user.uid);
      docRef.get().then((doc) => {
        let areaOfInterestInput = document.getElementById("areaOfInterest");
        if (areaOfInterestInput.value) {
          document.getElementById("areaOfInterestErrMsg").innerText = "";
          let areaOfInterestArr = doc.data()["area_interest"];
          areaOfInterestArr.push(areaOfInterestInput.value);
          postAreaOfInterestDataShowDatas(areaOfInterestArr);
        } else {
          document.getElementById("areaOfInterestErrMsg").innerText =
            "Please fill your Interest field before add";
        }
      });
    }
  });
}
