function skillInputValidation(skillInputElementParent, skillErrMsg) {
  skillInputElementParent.children[0].addEventListener("input", () => {
    if (skillInputElementParent.children[0].value === "") {
      skillErrMsg.innerText = "Skill is required field";
    } else {
      skillErrMsg.innerText = "";
    }
  });
}

function addSkills(skillInputElementParent, skillInputClosebtn) {
  skillInputElementParent.children[0].value = "";

  skillInputClosebtn.classList.remove("d-none");
  skillInputClosebtn.classList.add("d-block");
  skillInputElementParent.classList.remove("d-none");
  skillInputElementParent.classList.add("d-flex");

  skillInputClosebtn.addEventListener("click", () => {
    document.getElementById("skillErrMsg").innerText = "";
    skillInputElementParent.classList.remove("d-flex");
    skillInputClosebtn.classList.remove("d-block");
    skillInputClosebtn.classList.add("d-none");
    skillInputElementParent.classList.add("d-none");
  });
  skillInputValidation(
    skillInputElementParent,
    document.getElementById("skillErrMsg")
  );
}

// show skill datas in list
function showSkillDatasInList() {
  firebase.auth().onAuthStateChanged((user) => {
    var docRef = db.collection("PortfolioDetails").doc(user.uid);
    docRef.get().then((doc) => {
      if (doc.data()["skills"] !== []) {
        document.getElementById("showSkills").classList.remove("d-none");
        document.getElementById("showSkills").classList.add("d-block");
        let SkillArrDatas = doc.data()["skills"];
        for (let i = 0; i < SkillArrDatas.length; i++) {
          document.getElementById(
            "showSkills"
          ).children[1].innerHTML += `<li class=list-group-item>${SkillArrDatas[i]} <i onclick=delSkillDatas(this,${i}) style=cursor:pointer class="fa-solid fa-square-xmark ml-2"></i></li>`;
        }
      } else {
        document.getElementById("showSkills").classList.remove("d-block");
        document.getElementById("showSkills").classList.add("d-none");
      }
    });
  });
}

// post skill datas to db
function postSkillDatas(skillDatasToPost) {
  skillsDatas = skillDatasToPost;
  firebase.auth().onAuthStateChanged((user) => {
    var docRef = db.collection("PortfolioDetails").doc(user.uid);
    docRef
      .set({ skills: skillDatasToPost }, { merge: true })
      .then(() => {
        document.getElementById("showSkills").children[1].innerHTML = "";
        showSkillDatasInList();
        document.getElementById("preLoader").style.display = "none";
      })
      .catch((error) => {
        document.getElementById("preLoader").style.display = "none";
        console.error("Error writing document: ", error);
      });
  });
}

// delete skill datas
function delSkillDatas(skillDelIcon, skillDataIterateValue) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var docRef = db.collection("PortfolioDetails").doc(user.uid);
      if (confirm("Are you sure to remove Your Skill!!!") === true) {
        skillDelIcon.parentElement.remove();
        docRef.get().then((doc) => {
          let delSkillArrDatas = doc.data()["skills"];
          delete delSkillArrDatas[skillDataIterateValue];
          let delSkillArrDatasWithFiltered = delSkillArrDatas.filter(
            (skillDatas) => {
              return skillDatas !== null || "";
            }
          );
          document.getElementById("preLoader").style.display = "block";
          postSkillDatas(delSkillArrDatasWithFiltered);
          alert("your Skill is Successfully Deleted!!!");
        });
      }
    }
  });
}

function saveSkillDatasWithValidation(skillInputElementParent, skillDatasArr) {
  if (skillInputElementParent.children[0].value !== "") {
    skillInputElementParent.classList.remove("d-flex");
    skillInputElementParent.classList.add("d-none");
    skillInputElementParent.previousElementSibling.children[1].classList.remove(
      "d-block"
    );
    skillInputElementParent.previousElementSibling.children[1].classList.add(
      "d-none"
    );
    skillDatasArr.push(skillInputElementParent.children[0].value);
    document.getElementById("preLoader").style.display = "block";
    postSkillDatas(skillDatasArr);
    alert("your Skill is Added!!!");
  } else {
    if (skillInputElementParent.children[0].value === "") {
      document.getElementById("skillErrMsg").innerText =
        "Skill is required field";
    } else {
      document.getElementById("skillErrMsg").innerText = "";
    }
  }
}

// save skill datas
function saveSkillData(skillInputElementParent) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var docRef = db.collection("PortfolioDetails").doc(user.uid);
      docRef.get().then((doc) => {
        if (doc.exists) {
          var repeatSkillData;
          for (let i = 0; i < doc.data()["skills"].length; i++) {
            if (
              doc.data()["skills"][i] ===
              skillInputElementParent.children[0].value
            ) {
              repeatSkillData = "true";
              break;
            } else {
              repeatSkillData = "false";
            }
          }
          if (repeatSkillData === "true") {
            document.getElementById("skillErrMsg").innerText =
              "This skill is already on your profile";
          } else {
            document.getElementById("skillErrMsg").innerText = "";
            saveSkillDatasWithValidation(
              skillInputElementParent,
              doc.data()["skills"]
            );
          }
        }
      });
    }
  });
}
