function downloadPdf() {
  const fileName = `${
    document.getElementById("resumeDetails").children[0].children[0].innerText
  }_resume.pdf`;
  const downloadPage = document.getElementById("resumeDetails");
  var opt = {
    margin: 0,
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf(downloadPage, opt);
}

var db = firebase.firestore();
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    // console.log(uid);
    var docRef = db.collection("PortfolioDetails").doc(uid);
    docRef.get().then((doc) => {
      if (doc.exists) {
        document.getElementById("preLoader").style.display = "none";
        let aboutDoc = doc.data()["about_details"];
        let eduDoc = doc.data()["education_details"];
        let expDoc = doc.data()["experience_details"];
        let skillsDoc = doc.data()["skills"];
        let contactDoc = doc.data()["contact_details"];
        let hobbiesDoc = doc.data()["hobbies"];
        let areaInterestDoc = doc.data()["area_interest"];

        document.getElementById("titleForUser").innerText =
          aboutDoc["first_name"] + aboutDoc["last_name"] + " | Resume";

        document.getElementById("resumeDetails").innerHTML = `
          <h2 class="text-left">
            <span>${aboutDoc["first_name"]}</span>
            <span>${aboutDoc["last_name"]}</span>
          </h2>
          <div class="text-left">
         <p class="text-muted small">${contactDoc["address"]}</p>
         <p class="text-muted small">${contactDoc["mail_id"]} | ${contactDoc["phone_no"]}</p>
          </div>

          <hr/>
          <h3 class="bg-secondary p-2 mb-2 text-white">Profile</h3>
          <ul class="pl-0 pr-5">
         <li  class="text-justify">${aboutDoc["about_desc"]}</li>
         </ul>
         
     
        
          <hr/>
         
          <h3 class="bg-secondary p-2 mb-2 text-white">Education</h3>
         
          
          <div  id="eduDetails"></div>

         
          <h3 class="bg-secondary p-2 mb-2 text-white">Experience</h3>
         

          <div  id="expDetails"></div>

         
          <h3 class="bg-secondary p-2 mb-2 text-white">Skills</h3>
         

          <ul style="list-style: circle;"  id="skills"></ul>
          <hr/>

          
          <div class="d-flex p-2 mb-2 bg-secondary text-white justify-content-between">
          <h3>Area of interest</h3>
          <h3>Hobbies</h3>
          </div>
        
       <div class="d-flex justify-content-between">
      
       

       <ul class=" pr-2" style="list-style: square;"  id="areaOfInterest"></ul>

      
       

        <ul style="list-style: square;"  id="hobbiesShow"></ul>
       </div>
       <hr/>

          <h3 class="bg-secondary p-2 mb-2 text-white">Media Contacts</h3>
          <ul class="pl-0 ">
         <li><b>Linkedin Profile - </b><a style="text-decoration: underline;" class="text-dark" href="${contactDoc["linkedin_id"]}" target="_blank">${contactDoc["linkedin_id"]}</a></li>
         <li><b>Github Profile - </b><a style="text-decoration: underline;" class="text-dark" href="${contactDoc["github_id"]}" target="_blank">${contactDoc["github_id"]}</a></li>
         <li><b>Instagram Profile - </b><a style="text-decoration: underline;" class="text-dark" href="${contactDoc["insta_id"]}" target="_blank">${contactDoc["insta_id"]}</a></li>
         <li><b>Facebook Profile - </b><a style="text-decoration: underline;" class="text-dark" href="${contactDoc["fb_id"]}" target="_blank">${contactDoc["fb_id"]}</a></li>
         <li><b>Twitter Profile - </b><a style="text-decoration: underline;" class="text-dark" href="${contactDoc["twitter_id"]}" target="_blank">${contactDoc["twitter_id"]}</a></li>
         </ul>
          

         
        `;

        for (let i = 0; i < eduDoc.length; i++) {
          document.getElementById("eduDetails").innerHTML += `<ul class="pl-0 ">
          <li  class="float-right h6">${eduDoc[i]["startYearAndMonth"]} - ${eduDoc[i]["endYearAndMonth"]} </li>
          <li class="h6 font-weight-bold">${eduDoc[i]["degree"]}</li>
          <li class="h6" >${eduDoc[i]["instituteName"]}</li>
          <li class="h6" >${eduDoc[i]["instituteAddress"]}</li>
          <li class="text-muted small">${eduDoc[i]["educationDesc"]} </li>
          </ul><hr/>
          `;
        }

        for (let i = 0; i < expDoc.length; i++) {
          document.getElementById("expDetails").innerHTML += `<ul class="pl-0">
          <li class="float-right h6">${expDoc[i]["expStartMon_year"]} - ${expDoc[i]["expEndMon_year"]}  </li>
          <li class="h6 font-weight-bold">${expDoc[i]["position"]}</li>
          <li class="h6" >${expDoc[i]["organizationName"]} | ${expDoc[i]["empType"]}</li>
          <li class="h6" >${expDoc[i]["companyLocation"]}</li>
          <li  class="text-muted small">${expDoc[i]["jobDescription"]}</li>
          </ul><hr/>
      `;
        }

        for (let i = 0; i < skillsDoc.length; i++) {
          document.getElementById("skills").innerHTML += `
          <li>${skillsDoc[i]}</li>
         
          `;
        }

        for (let i = 0; i < areaInterestDoc.length; i++) {
          document.getElementById("areaOfInterest").innerHTML += `
          <li>${areaInterestDoc[i]}</li>
         
          `;
        }

        for (let i = 0; i < hobbiesDoc.length; i++) {
          document.getElementById("hobbiesShow").innerHTML += `
          <li>${hobbiesDoc[i]}</li>
         
          `;
        }

        document.getElementById("downloadBtn").innerHTML = `
        <button
      onclick="downloadPdf()"
      type="button"
      class="btn btn-outline-secondary text-right"
    >
      Download PDF
    </button>
    `;
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
