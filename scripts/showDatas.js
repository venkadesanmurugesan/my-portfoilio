var db = firebase.firestore();
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    console.log(uid);
    var docRef = db.collection("PortfolioDetails").doc(uid);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          document.getElementById("preLoader").style.display = "none";
          document.getElementById("displayUserName").innerHTML =
            doc.data().about_details.first_name +
            doc.data().about_details.last_name;

          // display about details
          let aboutForm = document.getElementById("about_form");
          aboutForm[0].value = doc.data()["about_details"].first_name;
          aboutForm[1].value = doc.data()["about_details"].last_name;
          aboutForm[2].value = doc.data()["about_details"].about_desc;

          // display education details
          let educationForm = document.getElementById("eduDetailsResult");
          for (let i = 0; i < doc.data()["education_details"].length; i++) {
            educationForm.innerHTML += `<tr id="eduDataRow${i + 1}">
                <td>${doc.data()["education_details"][i]["degree"]}</td>
               <td>${doc.data()["education_details"][i]["instituteName"]}</td>
                <td>${
                  doc.data()["education_details"][i]["instituteAddress"]
                }</td>
                <td>${
                  doc.data()["education_details"][i]["startYearAndMonth"]
                }</td>
                <td>${
                  doc.data()["education_details"][i]["endYearAndMonth"]
                }</td>
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

          // display experience details
          let experienceForm = document.getElementById("expDetailsResult");
          for (let i = 0; i < doc.data()["experience_details"].length; i++) {
            experienceForm.innerHTML += `<tr id=expShowTableRow${i + 1}>
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

          // display skills
          let skillsForm = document.getElementById("showSkills");
          if (doc.data()["skills"] !== []) {
            skillsForm.classList.remove("d-none");
            skillsForm.classList.add("d-block");
            let SkillArrDatas = doc.data()["skills"];
            for (let i = 0; i < SkillArrDatas.length; i++) {
              document.getElementById(
                "showSkills"
              ).children[1].innerHTML += `<li class=list-group-item>${SkillArrDatas[i]} <i onclick=delSkillDatas(this,${i}) style=cursor:pointer class="fa-solid fa-square-xmark ml-2"></i></li>`;
            }
          } else {
            skillsForm.classList.remove("d-block");
            skillsForm.classList.add("d-none");
          }
        } else {
          console.log("No such document!");
        }

        // display contact details
        let contactForm = document
          .getElementById("contact_form")
          .querySelectorAll("input");
        contactForm[0].value = doc.data()["contact_details"]["fb_id"];
        contactForm[1].value = doc.data()["contact_details"]["insta_id"];
        contactForm[2].value = doc.data()["contact_details"]["linkedin_id"];
        contactForm[3].value = doc.data()["contact_details"]["twitter_id"];
        contactForm[4].value = doc.data()["contact_details"]["github_id"];
        contactForm[5].value = doc.data()["contact_details"]["mail_id"];
        contactForm[6].value = doc.data()["contact_details"]["phone_no"];
        contactForm[7].value = doc.data()["contact_details"]["address"];
      })
      .catch((error) => {
        console.log("Error getting document:", error);
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
