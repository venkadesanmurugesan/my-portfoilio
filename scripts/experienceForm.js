// exp add btn work
function addExp() {
  let expModalFormInputs = document
    .getElementById("experience_modal_form")
    .querySelectorAll("input");
  // console.log(expModalFormInputs[5]);
  checkBoxForEndYear(expModalFormInputs);
}

// checkbox function
function checkBoxForEndYear(checkbox) {
  checkbox[3].addEventListener("click", () => {
    if (checkbox[3].checked) {
      let today = new Date();
      let date = `${today.getFullYear()}-0${today.getMonth() + 1}`;
      checkbox[5].value = date;
      checkbox[5].disabled = true;
    } else {
      checkbox[5].value = "";
      checkbox[5].disabled = false;
    }
  });
}

// datas show in table
function showExpDatasOnTable() {
  firebase.auth().onAuthStateChanged((user) => {
    db.collection("PortfolioDetails")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          for (let i = 0; i < doc.data()["experience_details"].length; i++) {
            document.getElementById(
              "expDetailsResult"
            ).innerHTML += `<tr id=expShowTableRow${i + 1}>
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
                   data-target="#editExpFormModal${i + 1}" data-keyboard="false"
                   data-backdrop="static" type="button" class="btn btn-info"><i class=" fa-solid fa-pen-to-square"></i>
            </button>
                   <button onclick=expModalDeleteBtn(this,${i}) id=expTableDelBtn${
              i + 1
            } type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                   </td>
       </tr>`;
          }
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  });
}

// post exp datas to db
function postExpDatas(expDatasUpdated,userId){
  db.collection("PortfolioDetails")
  .doc(userId)
  .set(
    {
      experience_details: expDatasUpdated,
    },
    { merge: true }
  )
  .then(() => {
    document.getElementById("expDetailsResult").innerHTML = "";
    showExpDatasOnTable();
  });
}

        // set exp data values to exp modal input
function expEditModalSetDatas(expEditBtn) {
  let expEditBtnGetDataAttribute = expEditBtn
    .getAttribute("data-target")
    .match(/\w/g)
    .join("");
  let expEditModal = document.getElementById("expModalForm").children[1];
  expEditModal.setAttribute("id", expEditBtnGetDataAttribute);
  let expEditModalBtn =
    expEditModal.children[0].children[0].children[2].children[1];
  expEditModalBtn.setAttribute("id", expEditBtnGetDataAttribute + "btn");
  expEditModalBtn.setAttribute("onclick", "expEditModalSaveAndUpdateBtn(this)");

  checkBoxForEndYear(expEditModal.querySelectorAll("input"));
  firebase.auth().onAuthStateChanged((user) => {
    let porfolioDocRef = db.collection("PortfolioDetails").doc(user.uid);
    porfolioDocRef.get().then((doc) => {
      if (doc.exists) {
        let expOldDataFromDB = doc.data()["experience_details"];
        let setDatasToExpModalInputs =
          expOldDataFromDB[expEditBtnGetDataAttribute.match(/\d/g)[0] - 1];
        let expModalContents =
          expEditModal.children[0].children[0].children[1].children[0];

        expModalContents.children[0].getElementsByTagName("input")[0].value =
          setDatasToExpModalInputs["position"];

        expModalContents.children[1].getElementsByTagName("select")[0].options[
          expModalContents.children[1].getElementsByTagName(
            "select"
          )[0].selectedIndex
        ].text = setDatasToExpModalInputs["empType"];

        expModalContents.children[2].getElementsByTagName("input")[0].value =
          setDatasToExpModalInputs["organizationName"];

        expModalContents.children[3].getElementsByTagName("input")[0].value =
          setDatasToExpModalInputs["companyLocation"];

        expModalContents.children[5].getElementsByTagName("input")[0].value =
          setDatasToExpModalInputs["expStartMon_year"];

        expModalContents.children[6].getElementsByTagName("input")[0].value =
          setDatasToExpModalInputs["expEndMon_year"];
      }
    });
  });
}

// datas update to click the edit btn
function expEditModalSaveAndUpdateBtn(expEditModalSaveBtn) {
  firebase.auth().onAuthStateChanged((user) => {
    let expEditModalSaveBtnGetDigitFromBtnId = expEditModalSaveBtn
      .getAttribute("id")
      .match(/\d/g)[0];

    let getExpEditModalContentForUpdate = document.getElementById(
      `editExpFormModal${expEditModalSaveBtnGetDigitFromBtnId}`
    ).children[0].children[0].children[1].children[0];

    if (
      (getExpEditModalContentForUpdate.children[0].getElementsByTagName(
        "input"
      )[0].value &&
        getExpEditModalContentForUpdate.children[1].getElementsByTagName(
          "select"
        )[0].options[
          getExpEditModalContentForUpdate.children[1].getElementsByTagName(
            "select"
          )[0].selectedIndex
        ].text &&
        getExpEditModalContentForUpdate.children[2].getElementsByTagName(
          "input"
        )[0].value &&
        getExpEditModalContentForUpdate.children[5].getElementsByTagName(
          "input"
        )[0].value &&
        getExpEditModalContentForUpdate.children[6].getElementsByTagName(
          "input"
        )[0].value !== "") ||
      null
    ) {
      let expEditModalDatasWithEdit = {
        position:
          getExpEditModalContentForUpdate.children[0].getElementsByTagName(
            "input"
          )[0].value,
        empType:
          getExpEditModalContentForUpdate.children[1].getElementsByTagName(
            "select"
          )[0].options[
            getExpEditModalContentForUpdate.children[1].getElementsByTagName(
              "select"
            )[0].selectedIndex
          ].text,
        organizationName:
          getExpEditModalContentForUpdate.children[2].getElementsByTagName(
            "input"
          )[0].value,
        companyLocation:
          getExpEditModalContentForUpdate.children[3].getElementsByTagName(
            "input"
          )[0].value,
        expStartMon_year:
          getExpEditModalContentForUpdate.children[5].getElementsByTagName(
            "input"
          )[0].value,
        expEndMon_year:
          getExpEditModalContentForUpdate.children[6].getElementsByTagName(
            "input"
          )[0].value,
      };
      db.collection("PortfolioDetails")
        .doc(user.uid)
        .get()
        .then((doc) => {
          let expArrDatas = doc.data()["experience_details"];

          expArrDatas[expEditModalSaveBtnGetDigitFromBtnId - 1] =
            expEditModalDatasWithEdit;

          postExpDatas(expArrDatas,user.uid);
          $(
            `#editExpFormModal${expEditModalSaveBtnGetDigitFromBtnId}`
          ).modal("hide");
          alert("Successfully Updated!!!");
         
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      alert("Please Check Your Fields!!!");
    }
  });
}

// datas delete in show table and db
function expModalDeleteBtn(expTableDelBtn, indexValue) {
  firebase.auth().onAuthStateChanged((user) => {
    db.collection("PortfolioDetails")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          let confirmToDel = confirm("Are you sure to Delete?");
          if (confirmToDel === true) {
            let expArrDatasToClickDelBtn = doc.data()["experience_details"];
            document.getElementById(
              `expShowTableRow${indexValue + 1}`
            ).innerHTML = "";
            delete expArrDatasToClickDelBtn[indexValue];

            let filteredExpArrDatas = expArrDatasToClickDelBtn.filter((el) => {
              return el !== null;
            });

            postExpDatas(filteredExpArrDatas,user.uid)
          
              .catch((error) => {
                console.error("Error writing document: ", error);
              });
          } else {
            return 0;
          }
        }
      });
  });
}

// Post experienceDetails to Firebase
function setNewDatas() {
  let expModalFormInputs = document
    .getElementById("experience_modal_form")
    .querySelectorAll("input");
  if (
    expModalFormInputs[0].value &&
    expModalFormInputs[1].value &&
    expModalFormInputs[4].value &&
    expModalFormInputs[5].value &&
    document.getElementById("experience_modal_form").children[1].children[1]
      .options[
      document.getElementById("experience_modal_form").children[1].children[1]
        .selectedIndex
    ].text !== ""
  ) {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection("PortfolioDetails")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            let oldExpData = doc.data()["experience_details"];
            // console.log(oldExpData.length);
            let experienceDetails = {
              position: expModalFormInputs[0].value,
              organizationName: expModalFormInputs[1].value,
              expStartMon_year: expModalFormInputs[4].value,
              expEndMon_year: expModalFormInputs[5].value,
              companyLocation: expModalFormInputs[2].value,
              empType: document.getElementById("experience_modal_form")
                .children[1].children[1].options[
                document.getElementById("experience_modal_form").children[1]
                  .children[1].selectedIndex
              ].text,
            };
            let newExpData = experienceDetails;
            oldExpData.push(newExpData);
            postExpDatas(oldExpData,user.uid)
            $("#addExpFormModal").modal("hide");
            emptyExpModalValues();
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    });
  } else {
    alert("Please Check Your Fields!!!");
  }
}

function ExpFormModal() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setNewDatas();
    } else {
      firebase
        .auth()
        .signOut()
        .then(() => {
          location.href = "login.html";
        });
    }
  });
}

// empty the all values in exp modal
function emptyExpModalValues() {
  document
    .getElementById("experience_modal_form")
    .querySelectorAll("input")
    .forEach((input) => {
      input.value = "";
    });
  document
    .getElementById("experience_modal_form")
    .querySelectorAll("input")[3].checked = false;
  document
    .getElementById("experience_modal_form")
    .querySelectorAll("input")[5]
    .setAttribute("type", "month");
  document
    .getElementById("experience_modal_form")
    .querySelectorAll("input")[5].value = "";
  document
    .getElementById("experience_modal_form")
    .querySelectorAll("input")[5].disabled = false;

  document.getElementById(
    "ExpModalMain"
  ).children[0].children[1].children[1].value = null;
}

// experience modal close button & icon
document
  .querySelectorAll("#closeIconExpModal,#closeBtnExpModal")
  .forEach((item) => {
    item.addEventListener("click", emptyExpModalValues);
  });
