// Add details functions

// let resetValuesModalForm = () => {
//   console.log("hi");
// };
// resetValuesModalForm();
function eduFormModalYearValidation(eduModalForm) {
  let startDate = eduModalForm[3].value;
  let endDate = eduModalForm[4].value;
  // console.log(startDate);
  if (startDate && endDate) {
    let startUpdateDate = new Date(startDate.replace(/-/g, "/"));
    let EndUpdateDate = new Date(endDate.replace(/-/g, "/"));
    // console.log(startUpdateDate, EndUpdateDate);
    if (startUpdateDate <= EndUpdateDate === true) {
      document.getElementById("errMsgForYear").style.display = "none";
      document.getElementById("errMsgForYearForEdit").style.display = "none";
      document.getElementById(
        "addEduFormModal"
      ).children[0].children[0].children[2].children[1].disabled = false;
      // document.getElementById("endYearCheckMsg").classList.add("display_none");
      // document.getElementById(
      //   "addEduFormModal"
      // ).children[0].children[0].children[2].children[1].disabled = false;
    } else {
      document.getElementById("errMsgForYear").style.display = "block";
      document.getElementById("errMsgForYearForEdit").style.display = "block";
      document.getElementById(
        "addEduFormModal"
      ).children[0].children[0].children[2].children[1].disabled = true;
      // alert("End Date Should be greater than Start Date!!!");
      // document.getElementById(
      //   "eduModalMain"
      // ).children[0].children[4].children[1].value = "";
      // document.getElementById("endYearCheckMsg").classList.remove("display_none");
    }
  }
}

function addEdu(eduModalForm) {
  eduModalForm.forEach((item) => {
    item.value = "";
  });
  document.querySelectorAll(".addEduErrMsg").forEach((addEduModalErrMsg) => {
    addEduModalErrMsg.style.display = "none";
  });
  document.getElementById("errMsgForYear").style.display = "none";
  eduModalForm[4].addEventListener("input", () => {
    eduFormModalYearValidation(eduModalForm);
  });
  eduModalForm[3].addEventListener("input", () => {
    eduFormModalYearValidation(eduModalForm);
  });
}
//
//   console.log(
//     document.getElementById("eduModalMain").children[0].children[4].children[1]
//   );
//   if (document.getElementById("addEduFormModal").style === "display: none;") {
//     console.log("no");
//   } else {
//     console.log("hi");
//     document.getElementById(
//       "eduModalMain"
//     ).children[0].children[3].children[1].value = "";
//     document.getElementById(
//       "eduModalMain"
//     ).children[0].children[4].children[1].disabled = true;
//     document
//       .getElementById("eduModalMain")
//       .children[0].children[3].children[1].addEventListener(
//         "input",
//         eduFormModalYearValidation(
//           document.getElementById("eduModalMain").children[0].children[3]
//             .children[1],

//           document.getElementById("eduModalMain").children[0].children[4]
//             .children[1]
//         )
//       );
//   }

// console.log(
//   document.getElementById("addEduFormModal").getAttribute("class") === "show"
// );
// if (
//   document.getElementById("addEduFormModal").getAttribute("class") === "show"
// ) {
//   console.log("hi");
// }
// }
//   firebase.auth().onAuthStateChanged((user) => {
//     db.collection("PortfolioDetails")
//       .doc(user.uid)
//       .get()
//       .then((doc) => {
//         let datas = doc.data()["education_details"];

//         // document
//         //   .getElementById("eduModalMain")
//         //   .children[0].children[3].children[1].addEventListener("input", () => {
//         //     for (let i = 0; i < datas.length; i++) {
//         //       if (
//         //         datas[i]["startYearAndMonth"] ===
//         //         document.getElementById("eduModalMain").children[0].children[3]
//         //           .children[1].value
//         //       ) {
//         //         alert("Already Start year and month Exist");
//         //         document.getElementById(
//         //           "eduModalMain"
//         //         ).children[0].children[3].children[1].value = "";
//         //         document.getElementById(
//         //           "eduModalMain"
//         //         ).children[0].children[4].children[1].disabled = true;
//         //       }
//         //     }
//         //   });

//         // document
//         //   .getElementById("eduModalMain")
//         //   .children[0].children[4].children[1].addEventListener("input", () => {
//         //     for (let i = 0; i < datas.length; i++) {
//         //       if (
//         //         datas[i]["endYearAndMonth"] ===
//         //         document.getElementById("eduModalMain").children[0].children[4]
//         //           .children[1].value
//         //       ) {
//         //         alert("Already End year and month Exist");
//         //         document.getElementById(
//         //           "eduModalMain"
//         //         ).children[0].children[4].children[1].value = "";
//         //         // document
//         //         //   .getElementById("endYearCheckMsg")
//         //         //   .classList.add("display_none");
//         //       }
//         //     }
//         //   });
//       });
//   });
//   // document.getElementById("endYearCheckMsg").classList.add("display_none");
//   document.getElementById(
//     "eduModalMain"
//   ).children[0].children[4].children[1].disabled = true;
//   document.getElementById(
//     "addEduFormModal"
//   ).children[0].children[0].children[2].children[1].disabled = true;
//   document
//     .getElementById("eduModalMain")
//     .children[0].children[3].children[1].addEventListener("input", () => {
//       document.getElementById(
//         "eduModalMain"
//       ).children[0].children[4].children[1].disabled = false;
//       document
//         .getElementById("eduModalMain")
//         .children[0].children[4].children[1].addEventListener(
//           "input",
//           eduFormModalYearValidation
//         );
//     });

//   // document
//   // .getElementById("eduModalMain")
//   // .children[0].children[3].children[1].addEventListener('input',()=>{

//   // })

//   // document.getElementById('eduModalMain').children[0].children[4].children[2].addEventListener('select',()=>{
//   //   document.getElementById('eduModalMain').children[0].children[4].children[2].value = document.getElementById('eduModalMain').children[0].children[4].children[2]<
//   // });

//   // document
//   //   .getElementById("eduModalMain")
//   //   .children[0].children[3].children[2].addEventListener("change", () => {
//   //     document
//   //       .getElementById("eduModalMain")
//   //       .children[0].children[4].children[2].setAttribute(
//   //         "min",
//   //         `${
//   //           document.getElementById("eduModalMain").children[0].children[3]
//   //             .children[2].value
//   //         }`
//   //       );
//   //   });
//   // document
//   //   .getElementById("eduModalMain")
//   //   .children[0].children[3].children[2].addEventListener("input", () => {
//   //     document
//   //       .getElementById("eduModalMain")
//   //       .children[0].children[4].children[2].setAttribute(
//   //         "min",
//   //         `${
//   //           document.getElementById("eduModalMain").children[0].children[3]
//   //             .children[2].value
//   //         }`
//   //       );
//   //   });

//   // if (
//   //   document
//   //     .getElementById("eduModalMain")
//   //     .children[0].children[4].children[2].getAttribute("min") <
//   //   document.getElementById("eduModalMain").children[0].children[4]
//   //     .children[2].value
//   // ) {
//   //   alert("Your End Year must be Greater than start year!!!");
//   // } else {
//   //   console.log("hi");

//   // }

//   // document.getElementById('eduModalMain').innerHTML += `
//   // <div id="education_form_input${document.getElementById('eduModalMain').children.length + 1}">
//   //     <div class="form-group mb-4">
//   //       <label
//   //         >Institute Name
//   //         <h5 class="d-inline-block text-danger">*</h5></label
//   //       >
//   //       <input
//   //         type="text"
//   //         name="institute_name"
//   //         class="form-control institute_name"
//   //         placeholder="Institute Name"
//   //         required
//   //       />
//   //     </div>

//   //     <div class="form-group mb-4">
//   //       <label
//   //         >Degree
//   //         <h5 class="d-inline-block text-danger">*</h5></label
//   //       >
//   //       <input
//   //         type="text"
//   //         name="institute_degree"
//   //         class="form-control institute_degree"
//   //         placeholder="Degree"
//   //         required
//   //       />
//   //     </div>

//   //     <div class="form-group mb-4">
//   //       <label>Institute Address</label>
//   //       <input
//   //         type="text"
//   //         name="institute_address"
//   //         class="form-control institute_address"
//   //         placeholder="Institute Address"
//   //       />
//   //     </div>

//   //     <div class="input-group mb-4">
//   //       <div class="input-group-prepend">
//   //         <span class="input-group-text" id=""
//   //           >Start and End Year
//   //           <h5 class="d-inline-block text-danger">*</h5>
//   //         </span>
//   //       </div>
//   //       <input
//   //         name="edu_start_year"
//   //         min="1800"
//   //         type="number"
//   //         list="edu_start_year_list"
//   //         class="form-control edu_start_year"
//   //         placeholder="Start Year"
//   //         required
//   //       />
//   //       <input
//   //         name="edu_end_year"
//   //         min="1800"
//   //         type="number"
//   //         list="edu_end_year_list"
//   //         class="form-control edu_end_year"
//   //         placeholder="End Year"
//   //         required
//   //       />

//   //       <datalist id="edu_start_year_list"> </datalist>
//   //       <datalist id="edu_end_year_list"> </datalist>
//   //     </div>
//   //   </div>
//   // `;
//   // let months = [
//   //   "January",
//   //   "February",
//   //   "March",
//   //   "April",
//   //   "May",
//   //   "June",
//   //   "July",
//   //   "August",
//   //   "September",
//   //   "October",
//   //   "November",
//   //   "December",
//   // ];
//   // for (let m = 0; m < months.length; m++) {
//   //   document.getElementById(
//   //     "edu_start_mon_list"
//   //   ).innerHTML += `<option value="${months[m]}">${months[m]}</option>`;
//   //   document.getElementById(
//   //     "edu_end_mon_list"
//   //   ).innerHTML += `<option value="${months[m]}">${months[m]}</option>`;
//   // }
//   // let startYear = 1800;
//   // let endYear = new Date().getFullYear();
//   // for (y = endYear; y > startYear; y--) {
//   //   document.getElementById(
//   //     "edu_start_year_list"
//   //   ).innerHTML += `<option value="${y}">${y}</option>`;
//   //   document.getElementById(
//   //     "edu_end_year_list"
//   //   ).innerHTML += `<option value="${y}">${y}</option>`;
//   // }
//   // }
//   // function closeBtn(closeBtn) {
//   //   document.getElementById(closeBtn).parentElement.remove();
//   // }
//   // for (let i = 0; i < eduMainForm.children.length + 1; i++) {
//   //   let closeBtn = document.getElementById(`closeBtnRow${i + 1}`);

//   //   if (closeBtn) {
//   //     closeBtn.addEventListener("click", () => {
//   //       closeBtn.parentElement.innerHTML = "";
//   //       // document.getElementById(`education_form_inputs${i + 1}`).innerHTML = "";
//   //     });
//   //   }
//   // }

//   //   let idValue = document.getElementById("edu_form_main").children.length;
//   //   if (
//   //     document
//   //       .getElementById(`education_form_inputs${idValue}`)
//   //       .getElementsByClassName("institute_name")[0].value !== "" &&
//   //     document
//   //       .getElementById(`education_form_inputs${idValue}`)
//   //       .getElementsByClassName("institute_degree")[0].value !== "" &&
//   //     document
//   //       .getElementById(`education_form_inputs${idValue}`)
//   //       .getElementsByClassName("edu_start_year")[0].value !== "" &&
//   //     document
//   //       .getElementById(`education_form_inputs${idValue}`)
//   //       .getElementsByClassName("edu_end_year")[0].value !== ""
//   //   ) {
//   //     let eduFormNodes = document.getElementById(
//   //       `education_form_inputs${idValue}`
//   //     );
//   //     let cloneEduNodes = eduFormNodes.cloneNode(true);
//   //     cloneEduNodes.setAttribute("id", `education_form_inputs${idValue + 1}`);
//   //     document.getElementById("edu_form_main").appendChild(cloneEduNodes);

//   //     for (let i = 0; i < 4; i++) {
//   //       if (i == 3) {
//   //         cloneEduNodes.children[i].getElementsByTagName("input")[0].value = "";
//   //         cloneEduNodes.children[i].getElementsByTagName("input")[1].value = "";
//   //       } else {
//   //         cloneEduNodes.children[i].getElementsByTagName("input")[0].value = "";
//   //       }
//   //     }
//   //   } else {
//   //     alert("Please Check your Required Field !!!");
//   //   }

// get datas and show it in table
let getDatasShow = () => {
  firebase.auth().onAuthStateChanged((user) => {
    let portfolioDatas = db.collection("PortfolioDetails").doc(user.uid);

    portfolioDatas
      .get()
      .then((doc) => {
        if (doc.exists) {
          let eduDatas = doc.data()["education_details"];
          console.log(eduDatas);
          for (let i = 0; i < eduDatas.length; i++) {
            document.getElementById(
              "eduDetailsResult"
            ).innerHTML += `<tr id="eduDataRow${i + 1}">
                <td>${eduDatas[i]["degree"]}</td>
               <td>${eduDatas[i]["instituteName"]}</td>
                <td>${eduDatas[i]["instituteAddress"]}</td>
                <td>${eduDatas[i]["startYearAndMonth"]}</td>
                <td>${eduDatas[i]["endYearAndMonth"]}</td>
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
        console.log("Error getting document:", error);
      });
  });
};

// post edu datas to db
function postEduDatas(eduDatasUpdated, userId) {
  db.collection("PortfolioDetails")
    .doc(userId)
    .set({ education_details: eduDatasUpdated }, { merge: true })
    .then(() => {
      console.log("Document successfully written!");
      document.getElementById("eduDetailsResult").innerHTML = "";
      getDatasShow();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

// delete data from table
function eduDelDatas(eduTableDelBtn, iterateValue) {
  firebase.auth().onAuthStateChanged((user) => {
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
            postEduDatas(filteredEduArrDatasWithDel, user.uid);
            eduTableDelBtn.parentNode.parentNode.remove();
          }
        }
      });
  });
}

// edit data modal
function eduEditModalSetDatas(eduEditBtn, iterateValue) {
  document.getElementById("errMsgForYearForEdit").style.display = "none";

  let eduEditModal = document.getElementById("edu_form_main").children[1];
  eduEditModal.setAttribute("id", `editEduFormModal${iterateValue + 1}`);
  eduEditModal.children[0].children[0].children[2].children[1].setAttribute(
    "onclick",
    `eduEditModalSaveBtn(this,${iterateValue})`
  );
  let eduEditModalInputs = eduEditModal.querySelectorAll("input");
  console.log(eduEditModalInputs);
  eduEditModalInputs[4].addEventListener("input", () => {
    eduFormModalYearValidation(eduEditModalInputs);
  });
  eduEditModalInputs[3].addEventListener("input", () => {
    eduFormModalYearValidation(eduEditModalInputs);
  });
  firebase.auth().onAuthStateChanged((user) => {
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
          eduEditModalInputs[1].value = eduEditArrData[iterateValue]["degree"];
          eduEditModalInputs[2].value =
            eduEditArrData[iterateValue]["instituteAddress"];
          eduEditModalInputs[3].value =
            eduEditArrData[iterateValue]["startYearAndMonth"];
          eduEditModalInputs[4].value =
            eduEditArrData[iterateValue]["endYearAndMonth"];
        }
      });
  });
}

// post datas to db when click the edit modal save button
function eduEditModalSaveBtn(eduEditButton, iterateValue) {
  firebase.auth().onAuthStateChanged((user) => {
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
          };
          if (
            (eduEditModalInputs[0].value &&
              eduEditModalInputs[1].value &&
              eduEditModalInputs[3].value &&
              eduEditModalInputs[4].value !== "") ||
            null
          ) {
            eduEditArrData[iterateValue] = eduEditModalUpdatedDatas;
            postEduDatas(eduEditArrData, user.uid);
            alert("Successfully Updated!!!");

            $(`#editEduFormModal${iterateValue + 1}`).modal("hide");
          } else {
            let errArr = [];
            if (eduEditModalInputs[0].value === "") {
              errArr.push("Institute Name is required field");
            } else {
            }
            if (eduEditModalInputs[1].value === "") {
              errArr.push("Degree is required field");
            } else {
            }
            if (eduEditModalInputs[3].value === "") {
              errArr.push("Start Date is required field");
            } else {
            }
            if (eduEditModalInputs[4].value === "") {
              errArr.push("End Date is required field");
            } else {
            }
            alert(errArr);
          }
        }
      });
  });
}

// education modal save button
function eduAddFormModalSaveDatas(eduForm) {
  const userId = firebase.auth().currentUser.uid;
  if (userId) {
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
          // if (eduForm[0].value === "") {
          //   document.getElementById(
          //     "addEduModalInstituteErrMsg"
          //   ).style.display = "none";
          // } else if (eduForm[1].value === "") {
          //   document.getElementById("addEduModalDegreeErrMsg").style.display =
          //     "none";
          // } else if (eduForm[3].value === "") {
          //   document.getElementById(
          //     "addEduModalStartDateErrMsg"
          //   ).style.display = "none";
          // } else if (eduForm[4].value === "") {
          //   document.getElementById("addEduModalEndDateErrMsg").style.display =
          //     "none";
          // }
          let educationDetails = {
            instituteName: eduForm[0].value,
            degree: eduForm[1].value,
            instituteAddress: eduForm[2].value,
            startYearAndMonth: eduForm[3].value,
            endYearAndMonth: eduForm[4].value,
          };
          let newEduData = educationDetails;
          oldEduData.push(newEduData);
          postEduDatas(oldEduData, userId);
          $("#addEduFormModal").modal("hide");

          eduForm[0].value = "";
          eduForm[1].value = "";
          eduForm[2].value = "";
          eduForm[3].value = "";
          eduForm[4].value = "";
        } else {
          if (eduForm[0].value === "") {
            document.getElementById(
              "addEduModalInstituteErrMsg"
            ).style.display = "block";
          } else {
            document.getElementById(
              "addEduModalInstituteErrMsg"
            ).style.display = "none";
          }
          if (eduForm[1].value === "") {
            document.getElementById("addEduModalDegreeErrMsg").style.display =
              "block";
          } else {
            document.getElementById("addEduModalDegreeErrMsg").style.display =
              "none";
          }
          if (eduForm[3].value === "") {
            document.getElementById(
              "addEduModalStartDateErrMsg"
            ).style.display = "block";
          } else {
            document.getElementById(
              "addEduModalStartDateErrMsg"
            ).style.display = "none";
          }
          if (eduForm[4].value === "") {
            document.getElementById("addEduModalEndDateErrMsg").style.display =
              "block";
          } else {
            document.getElementById("addEduModalEndDateErrMsg").style.display =
              "none";
          }

          // document
          //   .querySelectorAll(".addEduErrMsg")
          //   .forEach((addEduModalErrMsg) => {
          //     addEduModalErrMsg.style.display = "block";
          //   });
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } else {
    console.log("No such document!");
  }
}

// education modal close button & icon
// document
//   .querySelectorAll("#closeIconEduModal,#closeBtnEduModal")
//   .forEach((item) => {
//     item.addEventListener("click", () => {
//       document.getElementById(
//         "education_form_input"
//       ).children[1].children[1].value = "";
//       document.getElementById(
//         "education_form_input"
//       ).children[0].children[1].value = "";
//       document.getElementById(
//         "education_form_input"
//       ).children[2].children[1].value = "";
//       document.getElementById(
//         "education_form_input"
//       ).children[3].children[1].value = "";
//       document.getElementById(
//         "education_form_input"
//       ).children[4].children[1].value = "";
//     });
//   });
