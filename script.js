//div containers of resume
let detailsContainer = document.getElementById("details-container");
let myResume = document.getElementById("myResume");
let contactDetails = document.querySelectorAll(".contactDetails");
let myName = document.getElementById("myName");
let myPicture = document.getElementById("myPicture");
let otherDetails = document.querySelectorAll(".otherDetails");
let detailTitle = document.querySelectorAll(".detailTitle");
let printB = document.getElementById("print");

//div container of edit forms
let profilePictureOnScreen = document.getElementById("profilePictureOnScreen");
let showBasicDetails = document.getElementById("show-basic-details");
let showEducationDetails = document.getElementById("show-education-details")
let showProjectDetails = document.getElementById("show-project-details")
let editBasicDetails = document.getElementById("edit-basic-details");
let editEducationDetails = document.getElementById("edit-education-details");
let editProjectDetails = document.getElementById("edit-project-details");

//input fields
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let emailId = document.getElementById("emailId");
let phoneNumber = document.getElementById("phoneNumber");
let profilePicture = document.getElementById("profilePicture");
let gitHubHandle = document.getElementById("gitHubHandle");
let linkedInHandle = document.getElementById("linkedInHandle");
let nameOfInstitute = document.getElementById("nameOfInstitute");
let nameOfDegree = document.getElementById("nameOfDegree");
let startDate = document.getElementById("startDate");
let endDate = document.getElementById("endDate");
let projectTitle = document.getElementById("projectTitle");
let projectDescription = document.getElementById("projectDescription");
let projectSkills = document.getElementById("projectSkills");

//buttons on edit forms
let saveBasic = document.getElementById("saveBasic");
let addEducation = document.getElementById("addEducation");
let addProject = document.getElementById("addProject");
let previewResume = document.getElementById("previewResume");

//--------------------------------------------------//
let resume = loadFromLS();
let data = {};
let isUpdate = {
    flag: false,
    key: -1
};
showDetails();
//------------------------------------------------//


//functions//
function loadFromLS() {
    let data = localStorage.getItem("YourResume");
    if (!data)
        return {
            firstName: "",
            lastName: "",
            emailId: "",
            phoneNumber: "",
            profilePicture: "",
            gitHubHandle: "",
            linkedInHandle: "",
            education: [],
            projects: []
        };
    return JSON.parse(data);
}
function saveToLS() {
    localStorage.setItem("YourResume", JSON.stringify(resume));
}
function getEducation(education) {
    let detailOnScreen = document.createElement("div");
    detailOnScreen.className = "detailOnScreen";
    detailOnScreen.innerHTML = education.nameOfInstitute + "<br>" + education.nameOfDegree + "<br>" + education.startDate + "<br>" + education.endDate + "<br>";
    return detailOnScreen;
}
function getProject(project) {
    let detailOnScreen = document.createElement("div");
    detailOnScreen.className = "detailOnScreen";
    detailOnScreen.innerHTML = project.projectTitle + "<br>" + project.projectDescription + "<br>" + project.projectSkills + "<br>";
    return detailOnScreen;
}
function getImageData() {
    let file = profilePicture.files[0];
    if (file) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener("load", () => {
            resume.profilePicture = fileReader.result;
            saveToLS();
        });
    }
}
function showDetails() {
    setTimeout(() => {
        if (resume.profilePicture)
            profilePictureOnScreen.src = resume.profilePicture;
    }, 1000);
    firstName.value = resume.firstName;
    lastName.value = resume.lastName;
    emailId.value = resume.emailId;
    phoneNumber.value = resume.phoneNumber;
    gitHubHandle.value = resume.gitHubHandle;
    linkedInHandle.value = resume.linkedInHandle;
    showEducationDetails.innerHTML = "";
    resume.education.forEach((education, i) => {
        let educationType = document.createElement("div");
        let deleteButton = document.createElement("button");
        let editButton = document.createElement("button");
        let actionButtons = document.createElement("div");
        actionButtons.className = "actionButtons";
        educationType.className = "educationType";
        deleteButton.innerHTML = "Delete";
        deleteButton.className = "delete";
        editButton.innerHTML = "Edit";
        editButton.className = "edit";
        educationType.appendChild(getEducation(education));
        actionButtons.appendChild(deleteButton);
        actionButtons.appendChild(editButton);
        educationType.appendChild(actionButtons);
        showEducationDetails.appendChild(educationType);
        deleteButton.addEventListener('click', () => {
            if(confirm("Are you sure?")){
            resume.education.splice(i, 1);
            educationType.remove();
            saveToLS();
            }
        });
        editButton.addEventListener('click', () => {
            isUpdate.flag = true
            isUpdate.key = i;
            nameOfInstitute.value = education.nameOfInstitute;
            nameOfDegree.value = education.nameOfDegree;
            startDate.value = education.startDate;
            endDate.value = education.endDate;
        });
    });
    showProjectDetails.innerHTML = "";
    resume.projects.forEach((project, i) => {
        let projectType = document.createElement("div");
        let deleteButton = document.createElement("button");
        let editButton = document.createElement("button");
        let actionButtons = document.createElement("div");
        projectType.className = "projectType";
        deleteButton.innerHTML = "Delete";
        deleteButton.className = "delete";
        editButton.innerHTML = "Edit";
        editButton.className = "edit";
        actionButtons.className = "actionButtons";
        projectType.appendChild(getProject(project));
        actionButtons.appendChild(deleteButton);
        actionButtons.appendChild(editButton);
        projectType.appendChild(actionButtons);
        showProjectDetails.appendChild(projectType);
        deleteButton.addEventListener('click', () => {
            if(confirm("Are you sure?")){
            resume.projects.splice(i, 1);
            saveToLS();
            projectType.remove();
            }
        });
        editButton.addEventListener('click', () => {
            isUpdate.flag = true
            isUpdate.key = i;
            projectTitle.value = project.projectTitle;
            projectDescription.value = project.projectDescription;
            projectSkills.value = project.projectSkills;
        });

    });
}
function saveBasicDetails() {
    resume.firstName = firstName.value;
    resume.lastName = lastName.value;
    resume.emailId = emailId.value;
    resume.phoneNumber = phoneNumber.value;
    resume.gitHubHandle = gitHubHandle.value;
    resume.linkedInHandle = linkedInHandle.value;
    getImageData();
}
function addEducationDetails(educationAchieved) {
    educationAchieved.nameOfInstitute = nameOfInstitute.value;
    educationAchieved.nameOfDegree = nameOfDegree.value;
    educationAchieved.startDate = startDate.value;
    educationAchieved.endDate = endDate.value;
    return educationAchieved;
}
function addProjectDetails(project) {
    project.projectTitle = projectTitle.value;
    project.projectDescription = projectDescription.value
    project.projectSkills = projectSkills.value;
    return project;
}
function createResume() {
    myName.innerHTML = resume.firstName + " " + resume.lastName
    if (resume.profilePicture !== "")
        myPicture.src = resume.profilePicture;
    if (resume.phoneNumber !== "") {
        contactDetails[0].innerHTML = '<svg fill="#fff" width="50px" height="24px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>phone</title><path d="M21.999 4h-12c-1.104 0-1.999 0.896-1.999 2v20c0 1.104 0.895 2 1.999 2h12c1.105 0 2.001-0.896 2.001-2v-20c0-1.104-0.896-2-2.001-2zM13 5h5l0.062 1h-5.062v-1zM15.979 26.5c-0.552 0-1-0.447-1-1s0.448-1 1-1c0.553 0 1 0.447 1 1s-0.448 1-1 1zM21.999 23h-12l0.021-16h11.979v16z"></path></svg>' + resume.phoneNumber;
    }
    if (resume.emailId !== "") {
        contactDetails[1].innerHTML = ' <svg width="50px" height="24px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:1.91px;}</style></defs><circle class="cls-1" cx="12" cy="12" r="2.86"/><path class="cls-1" d="M14.86,8.18v6a1.67,1.67,0,0,0,1.67,1.67h0a1.64,1.64,0,0,0,1.48-.9,6.65,6.65,0,0,0,.63-3.67,6.69,6.69,0,1,0-4.23,7"/><rect class="cls-1" x="1.5" y="1.5" width="21" height="21" rx="3.82"/></svg>' + resume.emailId;
    }
    if (resume.gitHubHandle !== "") {
        contactDetails[2].innerHTML = ' <svg fill="#fff" width="50px" height="24px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>github</title><path d="M16 1.375c-8.282 0-14.996 6.714-14.996 14.996 0 6.585 4.245 12.18 10.148 14.195l0.106 0.031c0.75 0.141 1.025-0.322 1.025-0.721 0-0.356-0.012-1.3-0.019-2.549-4.171 0.905-5.051-2.012-5.051-2.012-0.288-0.925-0.878-1.685-1.653-2.184l-0.016-0.009c-1.358-0.93 0.105-0.911 0.105-0.911 0.987 0.139 1.814 0.718 2.289 1.53l0.008 0.015c0.554 0.995 1.6 1.657 2.801 1.657 0.576 0 1.116-0.152 1.582-0.419l-0.016 0.008c0.072-0.791 0.421-1.489 0.949-2.005l0.001-0.001c-3.33-0.375-6.831-1.665-6.831-7.41-0-0.027-0.001-0.058-0.001-0.089 0-1.521 0.587-2.905 1.547-3.938l-0.003 0.004c-0.203-0.542-0.321-1.168-0.321-1.821 0-0.777 0.166-1.516 0.465-2.182l-0.014 0.034s1.256-0.402 4.124 1.537c1.124-0.321 2.415-0.506 3.749-0.506s2.625 0.185 3.849 0.53l-0.1-0.024c2.849-1.939 4.105-1.537 4.105-1.537 0.285 0.642 0.451 1.39 0.451 2.177 0 0.642-0.11 1.258-0.313 1.83l0.012-0.038c0.953 1.032 1.538 2.416 1.538 3.937 0 0.031-0 0.061-0.001 0.091l0-0.005c0 5.761-3.505 7.029-6.842 7.398 0.632 0.647 1.022 1.532 1.022 2.509 0 0.093-0.004 0.186-0.011 0.278l0.001-0.012c0 2.007-0.019 3.619-0.019 4.106 0 0.394 0.262 0.862 1.031 0.712 6.028-2.029 10.292-7.629 10.292-14.226 0-8.272-6.706-14.977-14.977-14.977-0.006 0-0.013 0-0.019 0h0.001z"></path></svg>' + resume.gitHubHandle;
    }
    if (resume.linkedInHandle !== "") {
        contactDetails[3].innerHTML = '  <svg fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" height="19px" viewBox="0 0 552.77 552.77"xml:space="preserve"><g><g> <path d="M17.95,528.854h71.861c9.914,0,17.95-8.037,17.95-17.951V196.8c0-9.915-8.036-17.95-17.95-17.95H17.95C8.035,178.85,0,186.885,0,196.8v314.103C0,520.816,8.035,528.854,17.95,528.854z"/><path d="M17.95,123.629h71.861c9.914,0,17.95-8.036,17.95-17.95V41.866c0-9.914-8.036-17.95-17.95-17.95H17.95C8.035,23.916,0,31.952,0,41.866v63.813C0,115.593,8.035,123.629,17.95,123.629z"/><path d="M525.732,215.282c-10.098-13.292-24.988-24.223-44.676-32.791c-19.688-8.562-41.42-12.846-65.197-12.846c-48.268,0-89.168,18.421-122.699,55.27c-6.672,7.332-11.523,5.729-11.523-4.186V196.8c0-9.915-8.037-17.95-17.951-17.95h-64.192c-9.915,0-17.95,8.035-17.95,17.95v314.103c0,9.914,8.036,17.951,17.95,17.951h71.861c9.915,0,17.95-8.037,17.95-17.951V401.666c0-45.508,2.748-76.701,8.244-93.574c5.494-16.873,15.66-30.422,30.488-40.649c14.83-10.227,31.574-15.343,50.24-15.343c14.572,0,27.037,3.58,37.393,10.741c10.355,7.16,17.834,17.19,22.436,30.104c4.604,12.912,6.904,41.354,6.904,85.33v132.627c0,9.914,8.035,17.951,17.949,17.951h71.861c9.914,0,17.949-8.037,17.949-17.951V333.02c0-31.445-1.982-55.607-5.941-72.48S535.836,228.581,525.732,215.282z"/></g></g></svg> ' + resume.linkedInHandle;
    }

    otherDetails[0].innerHTML = "";
    if (resume.education.length === 0)
        detailTitle[0].style.display = "none";
    else
        detailTitle[0].style.display = "block";
    resume.education.forEach((education, i) => {
        let educationType = document.createElement("div");
        let deleteButton = document.createElement("button");
        educationType.className = "educationType";
        deleteButton.innerHTML = "Delete";
        deleteButton.className = "delete";
        educationType.appendChild(getEducation(education));
        educationType.appendChild(deleteButton);
        otherDetails[0].appendChild(educationType);
        deleteButton.addEventListener('click', () => {
            if(confirm("Are you sure?")){
            resume.education.splice(i, 1);
            if (resume.education.length === 0)
                detailTitle[0].style.display = "none";
            educationType.remove();
            saveToLS();
            }
        });

    });

    otherDetails[1].innerHTML = "";
    if (resume.projects.length === 0)
        detailTitle[1].style.display = "none";
    else
        detailTitle[1].style.display = "block";
    resume.projects.forEach((project, i) => {
        let projectType = document.createElement("div");
        let deleteButton = document.createElement("button");
        projectType.className = "projectType";
        deleteButton.innerHTML = "Delete";
        deleteButton.className = "delete";
        projectType.appendChild(getProject(project));
        projectType.appendChild(deleteButton);
        otherDetails[1].appendChild(projectType);
        deleteButton.addEventListener('click', () => {
            if(confirm("Are you sure?")){
            resume.projects.splice(i, 1);
            if (resume.projects.length === 0)
                detailTitle[1].style.display = "none";
            saveToLS();
            projectType.remove();
            }
        });
    });


    detailsContainer.style.display = "none";
    myResume.style.display = "flex";
    printB.style.display = "inline";
}
function validateDate(){
    if(startDate.value>endDate.value){
        endDate.value='';
        alert("Start Date must me smaller than End Date!");
    }
}
//------------------------------------------------//

editBasicDetails.addEventListener('submit', (event) => {
    event.preventDefault();
    saveBasicDetails();
    saveToLS();
    showDetails();
});
editEducationDetails.addEventListener('submit', (event) => {
    event.preventDefault();
    let educationAchieved = {};
    educationAchieved = addEducationDetails(educationAchieved);
    if (isUpdate.flag) {
        resume.education.splice(isUpdate.key, 1, educationAchieved);
        isUpdate.flag = false;
        isUpdate.key = -1;
    }
    else {
        resume.education.push(educationAchieved);
    }

    saveToLS();
    showDetails();
});
editProjectDetails.addEventListener('submit', (event) => {
    event.preventDefault();
    let project = {};
    project = addProjectDetails(project);
    if (isUpdate.flag) {
        resume.projects.splice(isUpdate.key, 1, project);
        isUpdate.flag = false;
        isUpdate.key = -1;
    }
    else {
        resume.projects.push(project);
    }
    saveToLS();
    showDetails();

});
previewResume.addEventListener('click', () => {
    createResume();
});
printB.addEventListener('click', () => {
    let buttonsInsideResume = document.querySelectorAll(".delete");
    buttonsInsideResume.forEach((btn, i) => {
        console.log(btn);
        btn.style.display = "none";
    });
    printB.style.display = "none";
    print();
    setTimeout(() => {
        myResume.style.display = "none";
        detailsContainer.style.display = "block";
    }, 1000);

});
startDate.addEventListener('change',()=>{
    validateDate();
});
endDate.addEventListener('change',()=>{
    validateDate();
});