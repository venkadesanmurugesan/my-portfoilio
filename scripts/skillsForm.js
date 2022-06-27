function addSkills(skillInputElementParent) {
  skillInputElementParent.classList.remove("d-none");
  skillInputElementParent.classList.add("d-flex");
  skillInputElementParent.children[0].value = "";
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
      })
      .catch((error) => {
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

          postSkillDatas(delSkillArrDatasWithFiltered);
          alert("your Skill is Successfully Deleted!!!");
        });
      }
    }
  });
}

// save skill datas
function saveSkillData(skillInputElementParent) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var docRef = db.collection("PortfolioDetails").doc(user.uid);
      docRef.get().then((doc) => {
        if (doc.exists) {
          if (skillInputElementParent.children[0].value !== "") {
            skillInputElementParent.classList.remove("d-flex");
            skillInputElementParent.classList.add("d-none");

            let skillDatasArr = doc.data()["skills"];
            skillDatasArr.push(skillInputElementParent.children[0].value);
            postSkillDatas(skillDatasArr);
            alert("your Skill is Added!!!");
          } else {
            alert("You must Write Skill to Save!!!");
          }
        }
      });
    }
  });
}
