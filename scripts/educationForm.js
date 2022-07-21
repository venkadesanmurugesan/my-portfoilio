function eduFormModalYearValidation(eduModalForm, eduModalSaveBtn) {
  let startDate = eduModalForm[3].value;
  let endDate = eduModalForm[4].value;
  if (startDate && endDate) {
    let startUpdateDate = new Date(startDate.replace(/-/g, "/"));
    let EndUpdateDate = new Date(endDate.replace(/-/g, "/"));
    if (startUpdateDate <= EndUpdateDate === true) {
      eduModalSaveBtn.disabled = false;
      document.getElementById("errMsgForYear").innerText = "";
      document.getElementById("errMsgForYearForEdit").innerText = "";
    } else {
      eduModalSaveBtn.disabled = true;
      document.getElementById("errMsgForYear").innerText =
        "End date can’t be earlier than start date";
      document.getElementById("errMsgForYearForEdit").innerText =
        " End date can’t be earlier than start date";
    }
  }
}

function addEdu(eduModalForm) {
  eduModalForm.forEach((item) => {
    item.value = "";
  });
  document.getElementById("edu_desc").value = "";

  document.getElementById(
    "addEduFormModal"
  ).children[0].children[0].children[2].children[1].disabled = false;
  document.querySelectorAll(".eduErrMsg").forEach((eduErrMsg) => {
    eduErrMsg.innerText = "";
  });
  eduModalForm[4].addEventListener("input", () => {
    eduFormModalYearValidation(
      eduModalForm,
      document.getElementById("addEduFormModal").children[0].children[0]
        .children[2].children[1]
    );
  });
  eduModalForm[3].addEventListener("input", () => {
    eduFormModalYearValidation(
      eduModalForm,
      document.getElementById("addEduFormModal").children[0].children[0]
        .children[2].children[1]
    );
  });
  formValidation(eduModalForm);
}

// get datas and show it in table
let getDatasShow = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let portfolioDatas = db.collection("PortfolioDetails").doc(user.uid);

      portfolioDatas
        .get()
        .then((doc) => {
          if (doc.exists) {
            let eduDatas = doc.data()["education_details"];
            // console.log(eduDatas);
            for (let i = 0; i < eduDatas.length; i++) {
              document.getElementById(
                "eduDetailsResult"
              ).innerHTML += `<tr id="eduDataRow${i + 1}">
                  <td>${eduDatas[i]["degree"]}</td>
                 <td>${eduDatas[i]["instituteName"]}</td>
                  <td>${eduDatas[i]["instituteAddress"]}</td>
                  <td>${eduDatas[i]["startYearAndMonth"]}</td>
                  <td>${eduDatas[i]["endYearAndMonth"]}</td>
                  <td>${eduDatas[i]["educationDesc"]}</td>
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
          } else {
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
};

// form validation for edu modal inputs
function formValidation(eduForm) {
  eduForm[0].addEventListener("input", () => {
    if (eduForm[0].value === "") {
      document.getElementById("addEduModalInstituteErrMsg").innerText =
        "Institute Name is required field";
      document.getElementById("editEduModalInstituteErrMsg").innerText =
        "Institute Name is required field";
    } else {
      document.getElementById("addEduModalInstituteErrMsg").innerText = "";
      document.getElementById("editEduModalInstituteErrMsg").innerText = "";
    }
  });

  eduForm[1].addEventListener("input", () => {
    if (eduForm[1].value === "") {
      document.getElementById("addEduModalDegreeErrMsg").innerText =
        "Degree is required field";
      document.getElementById("editEduModalDegreeErrMsg").innerText =
        "Degree is required field";
    } else {
      document.getElementById("addEduModalDegreeErrMsg").innerText = "";
      document.getElementById("editEduModalDegreeErrMsg").innerText = "";
    }
  });
  eduForm[3].addEventListener("input", () => {
    if (eduForm[3].value === "") {
      document.getElementById("addEduModalStartDateErrMsg").innerText =
        "Start Date is required field";
      document.getElementById("editEduModalStartDateErrMsg").innerText =
        "Start Date is required field";
    } else {
      document.getElementById("addEduModalStartDateErrMsg").innerText = "";
      document.getElementById("editEduModalStartDateErrMsg").innerText = "";
    }
  });
  eduForm[4].addEventListener("input", () => {
    if (eduForm[4].value === "") {
      document.getElementById("addEduModalEndDateErrMsg").innerText =
        "End Date is required field";
      document.getElementById("editEduModalEndDateErrMsg").innerText =
        "End Date is required field";
    } else {
      document.getElementById("addEduModalEndDateErrMsg").innerText = "";
      document.getElementById("editEduModalEndDateErrMsg").innerText = "";
    }
  });
}
// post edu datas to db
function postEduDatas(eduDatasUpdated, userId) {
  db.collection("PortfolioDetails")
    .doc(userId)
    .set({ education_details: eduDatasUpdated }, { merge: true })
    .then(() => {
      document.getElementById("eduDetailsResult").innerHTML = "";
      getDatasShow();
      document.getElementById("preLoader").style.display = "none";
    })
    .catch((error) => {
      document.getElementById("preLoader").style.display = "none";
      // console.error("Error adding document: ", error);
    });
}

// delete data from table
function eduDelDatas(eduTableDelBtn, iterateValue) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection("PortfolioDetails")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            let eduArrDatasWithDel = doc.data()["education_details"];
            let confirmation = confirm("Are you sure to delete");
            if (confirmation === true) {
              delete eduArrDatasWithDel[iterateValue];
              let filteredEduArrDatasWithDel = eduArrDatasWithDel.filter(
                (eduData) => {
                  return eduData !== null;
                }
              );
              document.getElementById("preLoader").style.display = "block";
              postEduDatas(filteredEduArrDatasWithDel, user.uid);
              eduTableDelBtn.parentNode.parentNode.remove();
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

// edit edu modal
function eduEditModalSetDatas(eduEditBtn, iterateValue) {
  let eduEditModal = document.getElementById("edu_form_main").children[1];
  eduEditModal.setAttribute("id", `editEduFormModal${iterateValue + 1}`);
  eduEditModal.children[0].children[0].children[2].children[1].setAttribute(
    "onclick",
    `eduEditModalSaveBtn(this,${iterateValue})`
  );
  document.querySelectorAll(".eduErrMsg").forEach((eduErrMsg) => {
    eduErrMsg.innerText = "";
  });
  document.getElementById(
    `editEduFormModal${iterateValue + 1}`
  ).children[0].children[0].children[2].children[1].disabled = false;

  let eduEditModalInputs = eduEditModal.querySelectorAll("input");

  eduEditModalInputs[4].addEventListener("input", () => {
    eduFormModalYearValidation(
      eduEditModalInputs,
      document.getElementById(`editEduFormModal${iterateValue + 1}`).children[0]
        .children[0].children[2].children[1]
    );
  });
  eduEditModalInputs[3].addEventListener("input", () => {
    eduFormModalYearValidation(
      eduEditModalInputs,
      document.getElementById(`editEduFormModal${iterateValue + 1}`).children[0]
        .children[0].children[2].children[1]
    );
  });
  formValidation(eduEditModalInputs);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection("PortfolioDetails")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            let eduEditArrData = doc.data()["education_details"];
            let eduEditModalInputs =
              eduEditModal.children[0].children[0].querySelectorAll("input");
            eduEditModalInputs[0].value =
              eduEditArrData[iterateValue]["instituteName"];
            eduEditModalInputs[1].value =
              eduEditArrData[iterateValue]["degree"];
            eduEditModalInputs[2].value =
              eduEditArrData[iterateValue]["instituteAddress"];
            eduEditModalInputs[3].value =
              eduEditArrData[iterateValue]["startYearAndMonth"];
            eduEditModalInputs[4].value =
              eduEditArrData[iterateValue]["endYearAndMonth"];

            document.getElementById("edit_edu_desc").value =
              eduEditArrData[iterateValue]["educationDesc"];
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

// post datas to db when click the edit modal save button
function eduEditModalSaveBtn(eduEditButton, iterateValue) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection("PortfolioDetails")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            let eduEditArrData = doc.data()["education_details"];

            let eduEditModal = document.getElementById(
              `editEduFormModal${iterateValue + 1}`
            );
            let eduEditModalInputs =
              eduEditModal.children[0].children[0].querySelectorAll("input");
            let eduEditModalUpdatedDatas = {
              instituteName: eduEditModalInputs[0].value,
              degree: eduEditModalInputs[1].value,
              instituteAddress: eduEditModalInputs[2].value,
              startYearAndMonth: eduEditModalInputs[3].value,
              endYearAndMonth: eduEditModalInputs[4].value,
              educationDesc: document.getElementById("edit_edu_desc").value,
            };
            if (
              (eduEditModalInputs[0].value &&
                eduEditModalInputs[1].value &&
                eduEditModalInputs[3].value &&
                eduEditModalInputs[4].value !== "") ||
              null
            ) {
              eduEditArrData[iterateValue] = eduEditModalUpdatedDatas;
              document.getElementById("preLoader").style.display = "block";

              postEduDatas(eduEditArrData, user.uid);
              alert("Successfully Updated!!!");

              $(`#editEduFormModal${iterateValue + 1}`).modal("hide");
            } else {
              if (eduEditModalInputs[0].value === "") {
                document.getElementById(
                  "editEduModalInstituteErrMsg"
                ).innerText = "Institute Name is required field";
                eduEditModalInputs[0].focus();
              } else {
                document.getElementById(
                  "editEduModalInstituteErrMsg"
                ).innerText = "";
              }

              if (eduEditModalInputs[1].value === "") {
                document.getElementById("editEduModalDegreeErrMsg").innerText =
                  "Degree is required field";
                eduEditModalInputs[1].focus();
              } else {
                document.getElementById("editEduModalDegreeErrMsg").innerText =
                  "";
              }
              if (eduEditModalInputs[3].value === "") {
                document.getElementById(
                  "editEduModalStartDateErrMsg"
                ).innerText = "Start Date is required field";
                eduEditModalInputs[3].focus();
              } else {
                document.getElementById(
                  "editEduModalStartDateErrMsg"
                ).innerText = "";
              }
              if (eduEditModalInputs[4].value === "") {
                document.getElementById("editEduModalEndDateErrMsg").innerText =
                  "End Date is required field";
                eduEditModalInputs[4].focus();
              } else {
                document.getElementById("editEduModalEndDateErrMsg").innerText =
                  "";
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

// education modal save button
function eduAddFormModalSaveDatas(eduForm) {
  const user = firebase.auth().currentUser;
  if (user) {
    const userId = user.uid;
    var portfolioDatas = db.collection("PortfolioDetails").doc(userId);

    portfolioDatas
      .get()
      .then((doc) => {
        let oldEduData = doc.data()["education_details"];
        if (
          eduForm[0].value &&
          eduForm[1].value &&
          eduForm[3].value &&
          eduForm[4].value !== ""
        ) {
          let educationDetails = {
            instituteName: eduForm[0].value,
            degree: eduForm[1].value,
            instituteAddress: eduForm[2].value,
            startYearAndMonth: eduForm[3].value,
            endYearAndMonth: eduForm[4].value,
            educationDesc: document.getElementById("edu_desc").value,
          };
          let newEduData = educationDetails;
          oldEduData.push(newEduData);
          document.getElementById("preLoader").style.display = "block";

          postEduDatas(oldEduData, userId);
          $("#addEduFormModal").modal("hide");

          eduForm[0].value = "";
          eduForm[1].value = "";
          eduForm[2].value = "";
          eduForm[3].value = "";
          eduForm[4].value = "";
          document.getElementById("edu_desc").value = "";
        } else {
          if (eduForm[0].value === "") {
            document.getElementById("addEduModalInstituteErrMsg").innerText =
              " Institute Name is required field";
            eduForm[0].focus();
          } else {
            document.getElementById("addEduModalInstituteErrMsg").innerText =
              "";
          }

          if (eduForm[1].value === "") {
            document.getElementById("addEduModalDegreeErrMsg").innerText =
              "Degree is required field";
            eduForm[1].focus();
          } else {
            document.getElementById("addEduModalDegreeErrMsg").innerText = "";
          }
          if (eduForm[3].value === "") {
            document.getElementById("addEduModalStartDateErrMsg").innerText =
              "Start Date is required field";
            eduForm[3].focus();
          } else {
            document.getElementById("addEduModalStartDateErrMsg").innerText =
              "";
          }
          if (eduForm[4].value === "") {
            document.getElementById("addEduModalEndDateErrMsg").innerText =
              "End Date is required field";
            eduForm[4].focus();
          } else {
            document.getElementById("addEduModalEndDateErrMsg").innerText = "";
          }
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
}
