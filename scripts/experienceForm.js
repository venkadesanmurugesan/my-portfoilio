// exp modal year validation
function expFormModalYearValidation(expModalFormInput, eduModalSaveBtn) {
  let startDate = expModalFormInput[4].value;
  let endDate = expModalFormInput[5].value;
  if (startDate && endDate) {
    let startUpdateDate = new Date(startDate.replace(/-/g, "/"));
    let EndUpdateDate = new Date(endDate.replace(/-/g, "/"));
    if (startUpdateDate <= EndUpdateDate === true) {
      eduModalSaveBtn.disabled = false;
      document.getElementById("addExpYearErrMsg").innerHTML = "";
      document.getElementById("editExpYearErrMsg").innerHTML = "";
    } else {
      eduModalSaveBtn.disabled = true;
      document.getElementById("addExpYearErrMsg").innerHTML =
        "End date can’t be earlier than start date";
      document.getElementById("editExpYearErrMsg").innerHTML =
        "End date can’t be earlier  than start date";
    }
  }
}

// form validation for edu modal inputs
function expformValidation(expFormInputs) {
  let expModalInput = expFormInputs.querySelectorAll("input");
  expModalInput[0].addEventListener("input", () => {
    if (expModalInput[0].value === "") {
      document.getElementById("addExpPosErrMsg").innerHTML =
        "Your Position Field is required";
      document.getElementById("editExpPosErrMsg").innerHTML =
        "Your Position Field is required";
    } else {
      document.getElementById("addExpPosErrMsg").innerHTML = "";
      document.getElementById("editExpPosErrMsg").innerHTML = "";
    }
  });
  expFormInputs.children[1].children[1].addEventListener("input", () => {
    if (
      expFormInputs.children[1].children[1].options[
        expFormInputs.children[1].children[1].selectedIndex
      ].text === ""
    ) {
      document.getElementById("addExpEmpTypeErrMsg").innerHTML =
        "Employment type Field is required";
      document.getElementById("editExpEmpTypeErrMsg").innerHTML =
        "Employment type Field is required";
    } else {
      document.getElementById("addExpEmpTypeErrMsg").innerHTML = "";
      document.getElementById("editExpEmpTypeErrMsg").innerHTML = "";
    }
  });
  expModalInput[1].addEventListener("input", () => {
    if (expModalInput[1].value === "") {
      document.getElementById("addExpOrganizationErrMsg").innerHTML =
        "Organization Name Field is required";
      document.getElementById("editExpOrganizationErrMsg").innerHTML =
        "Organization Name Field is required";
    } else {
      document.getElementById("addExpOrganizationErrMsg").innerHTML = "";
      document.getElementById("editExpOrganizationErrMsg").innerHTML = "";
    }
  });
  expModalInput[4].addEventListener("input", () => {
    if (expModalInput[4].value === "") {
      document.getElementById("addExpStartDateErrMsg").innerHTML =
        "Start Date Field is required";
      document.getElementById("editExpStartDateErrMsg").innerHTML =
        "Start Date Field is required";
    } else {
      document.getElementById("addExpStartDateErrMsg").innerHTML = "";
      document.getElementById("editExpStartDateErrMsg").innerHTML = "";
    }
  });
  expModalInput[5].addEventListener("input", () => {
    if (expModalInput[5].value === "") {
      document.getElementById("addExpEndDateErrMsg").innerHTML =
        "End Date Field is required";
      document.getElementById("editExpEndDateErrMsg").innerHTML =
        "End Date Field is required";
    } else {
      document.getElementById("addExpEndDateErrMsg").innerHTML = "";
      document.getElementById("editExpEndDateErrMsg").innerHTML = "";
    }
  });
}
// exp add btn work
function addExp() {
  document.getElementById(
    "addExpFormModal"
  ).children[0].children[0].children[2].children[1].disabled = false;
  let expModalFormInputs = document
    .getElementById("experience_modal_form")
    .querySelectorAll("input");
  document
    .querySelectorAll(".addExpModalErrMsg")
    .forEach((addExpModalErrMsg) => {
      addExpModalErrMsg.innerHTML = "";
    });

  expModalFormInputs[4].addEventListener("input", () => {
    expFormModalYearValidation(
      document
        .getElementById("experience_modal_form")
        .querySelectorAll("input"),
      document.getElementById("addExpFormModal").children[0].children[0]
        .children[2].children[1]
    );
  });
  expModalFormInputs[5].addEventListener("input", () => {
    expFormModalYearValidation(
      document
        .getElementById("experience_modal_form")
        .querySelectorAll("input"),
      document.getElementById("addExpFormModal").children[0].children[0]
        .children[2].children[1]
    );
  });

  expformValidation(document.getElementById("experience_modal_form"));

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
      document.getElementById("addExpEndDateErrMsg").innerHTML = "";
      document.getElementById("editExpEndDateErrMsg").innerHTML = "";
    } else {
      checkbox[5].value = "";
      checkbox[5].disabled = false;
      document.getElementById("addExpEndDateErrMsg").innerHTML =
        "End Date Field is required";
      document.getElementById("editExpEndDateErrMsg").innerHTML =
        "End Date Field is required";
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
function postExpDatas(expDatasUpdated, userId) {
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
      document.getElementById("preLoader").style.display = "none";
    })
    .catch((error) => {
      document.getElementById("preLoader").style.display = "none";
      console.error("Error adding document: ", error);
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

  document
    .querySelectorAll(".editExpModalErrMsg")
    .forEach((addExpModalErrMsg) => {
      addExpModalErrMsg.innerHTML = "";
    });
  expformValidation(
    expEditModal.children[0].children[0].children[1].children[0]
  );
  checkBoxForEndYear(expEditModal.querySelectorAll("input"));

  expEditModal.querySelectorAll("input")[4].addEventListener("input", () => {
    expFormModalYearValidation(
      expEditModal.querySelectorAll("input"),
      expEditModal.children[0].children[0].children[2].children[1]
    );
  });
  expEditModal.querySelectorAll("input")[5].addEventListener("input", () => {
    expFormModalYearValidation(
      expEditModal.querySelectorAll("input"),
      expEditModal.children[0].children[0].children[2].children[1]
    );
  });

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
          document.getElementById("preLoader").style.display = "block";
          postExpDatas(expArrDatas, user.uid);
          $(`#editExpFormModal${expEditModalSaveBtnGetDigitFromBtnId}`).modal(
            "hide"
          );
          alert("Successfully Updated!!!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
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
            document.getElementById("preLoader").style.display = "block";
            postExpDatas(filteredExpArrDatas, user.uid).catch((error) => {
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
            document.getElementById("preLoader").style.display = "block";
            postExpDatas(oldExpData, user.uid);
            $("#addExpFormModal").modal("hide");
            emptyExpModalValues();
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    });
  } else {
    if (expModalFormInputs[0].value === "") {
      document.getElementById("addExpPosErrMsg").innerHTML =
        "Your Position Field is required";
    } else {
      document.getElementById("addExpPosErrMsg").innerHTML = "";
    }
    if (
      document.getElementById("experience_modal_form").children[1].children[1]
        .options[
        document.getElementById("experience_modal_form").children[1].children[1]
          .selectedIndex
      ].text === ""
    ) {
      document.getElementById("addExpEmpTypeErrMsg").innerHTML =
        "Employment type Field is required";
    } else {
      document.getElementById("addExpEmpTypeErrMsg").innerHTML = "";
    }
    if (expModalFormInputs[1].value === "") {
      document.getElementById("addExpOrganizationErrMsg").innerHTML =
        "Organization Name Field is required";
    } else {
      document.getElementById("addExpOrganizationErrMsg").innerHTML = "";
    }
    if (expModalFormInputs[4].value === "") {
      document.getElementById("addExpStartDateErrMsg").innerHTML =
        "Start Date Field is required";
    } else {
      document.getElementById("addExpStartDateErrMsg").innerHTML = "";
    }
    if (expModalFormInputs[5].value === "") {
      document.getElementById("addExpEndDateErrMsg").innerHTML =
        "End Date Field is required";
    } else {
      document.getElementById("addExpEndDateErrMsg").innerHTML = "";
    }
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
