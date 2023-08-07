
let contactError = document.getElementById("contact-error");
let nameError = document.getElementById("name-error");
let emailError = document.getElementById("email-error");
let altContactError = document.getElementById("alt-contact-error");


let signUpForm = document.getElementById("signup-form");
let passForm = document.getElementById("pass-form");



let isContactValid = false;
let isNameValid = false;
let isEmailValid = true;
let isAltContactValid = true;


signUpForm.addEventListener("submit", e => {
    e.preventDefault();

    if (validateSignUpForm()){
        document.getElementById("signup-form").style.display="none";
        document.getElementById("pass-form").style.display="flex"; 
    }else {
        document.getElementById("signup-form").style.display="flex";
        document.getElementById("pass-form").style.display="none"; 
    }
});

// passFieldTwo.addEventListener("onclick", validatePassOne);

passForm.addEventListener("submit", f =>{
    f.preventDefault();

    validatePass();
    storeData();
    
});


function setError(idElement, errorMessage){
    idElement.style.display="flex";
    idElement.innerHTML(errorMessage);
}


function validateSignUpForm() {
    let returnValueContact = true;
    let returnValueName = true;
    let returnValueEmail = true;
    let returnValueAltContact = true;

    // let contactNumber = document.getElementById("mob-num").value.trim();
    // let fullName = document.getElementById("full-name").value.trim();
    // let email = document.getElementById("email").value.trim();
    // let alternateContact = document.getElementById("alt-mob-num").value.trim();

    if(isContactValid){
        returnValueContact = true;
    }
    else{
        contactError.style.display = "flex";
        returnValueContact = false;
    }
    if(isNameValid){
        returnValueName = true;
    }
    else{
        nameError.style.display = "flex";
        returnValueName = false;
    }

    if(isEmailValid) {
        returnValueEmail= true;
    }
    else{
        emailError.style.display="flex";
        returnValueEmail=false;
    }

    if(isAltContactValid) {
        returnValueAltContact = true;
    }
    else{
        altContactError.style.display="flex";
        returnValueAltContact = false;
    }


    if(returnValueContact && returnValueEmail && returnValueName && returnValueAltContact) {
        if("UserData" in localStorage){
            let UserData = JSON.parse(localStorage.getItem("UserData"));
            let username = document.getElementById("mob-num").value;
            if(username in UserData){
                alert("Account Already Exist, LOGIN");
                return false;
            }
            else{
                return true;
            }
        }
        else{
            return true;
        }
        
    }
    else {
        return false;
    }

}

let validateContact = document.getElementById("mob-num");
let validateName = document.getElementById("full-name");
let validateEmail = document.getElementById("email");
let validateAltContact = document.getElementById("alt-mob-num");

validateContact.onblur = function() {
    let contact = validateContact.value;
    if(contact.length != 10 ){
        document.getElementById("contact-error").style.display = "flex";
    }
    else {
        document.getElementById("contact-error").style.display = "none";
        isContactValid = true;
    }
}

validateName.onfocus = function() {
    if (validateContact.value.length == 0 || validateContact.value.length != 10){
        document.getElementById("contact-error").style.display = "flex";
    }
    else {
        document.getElementById("contact-error").style.display = "none";
    }
}

validateName.onblur = function() {
    let name = validateName.value;
    if(name.length == 0 ){
        document.getElementById("name-error").style.display = "flex";
    }
    else {
        document.getElementById("name-error").style.display = "none";
        isNameValid = true;
    }
}

validateEmail.onfocus = function() {
    if (validateContact.value.length == 0){
        document.getElementById("contact-error").style.display = "flex";
    }
    else {
        document.getElementById("contact-error").style.display = "none";
    }

    if(validateName.value.length == 0 ){
        document.getElementById("name-error").style.display = "flex";
    }
    else {
        document.getElementById("name-error").style.display = "none";
    }
}

validateEmail.onblur = function() {
    let email = validateEmail.value;

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.length != 0){
        if(!email.match(mailformat)){
            document.getElementById("email-error").style.display = "flex";
        }
        else{
            document.getElementById("email-error").style.display = "none";
        }
    }
    else{
        document.getElementById("email-error").style.display = "none";
        isEmailValid = true;
    }
    
}

validateAltContact.onfocus = function() {
    if (validateContact.value.length == 0){
        document.getElementById("contact-error").style.display = "flex";
    }
    else {
        document.getElementById("contact-error").style.display = "none";
    }

    if(validateName.value.length == 0 ){
        document.getElementById("name-error").style.display = "flex";
    }
    else {
        document.getElementById("name-error").style.display = "none";
    }

    let email = validateEmail.value;

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.length != 0){
        if(!email.match(mailformat)){
            document.getElementById("email-error").style.display = "flex";
        }
        else{
            document.getElementById("email-error").style.display = "none";
        }
    }
    else{
        document.getElementById("email-error").style.display = "none";
    }
}

validateAltContact.onblur = function() {
    if(validateAltContact.value.length != 0) {
        altContactError.style.display = "flex";
    }
    else {
        altContactError.style.display= "none";
        isAltContactValid = true;
    }
}








// ------------------------------------------------------------------


let isPassOneValid = false;


function validatePass() {
    let passFieldOne = document.getElementById("pass-field-one");
    let passFieldTwo = document.getElementById("pass-field-two");
    let returnValue = false;
    let passError1 = document.getElementById("pass-error1");
    let passError2 = document.getElementById("pass-error2");

    
    if (passFieldOne.value.length == 0) {
        passError1.innerHTML = "Enter Password";
        passError2.innerHTML="";

        return false;
    }else{
        passError1.innerHTML = "";
        if(passFieldOne.value != passFieldTwo.value) {
            passError2.innerHTML="Password Doesn't Match";
            returnValue = false;
        }
        else{
            passError2.innerHTML="";
            let contactNum = document.getElementById("mob-num").value;
            window.sessionStorage.setItem("currentUser", contactNum);
            window.location.replace("index.html");
            return true;
        }
    
    }
    return false;

}

function storeData() {
    let contactNum = document.getElementById("mob-num").value;
    let name = document.getElementById("full-name").value;
    let email = document.getElementById("email").value;
    let altContact = document.getElementById("alt-mob-num").value;

    let password = document.getElementById("pass-field-one").value;
    let UserDataObject = {};
    if("UserData" in localStorage){
        UserDataObject = JSON.parse(localStorage.getItem("UserData"));
    }

    // let UserDataArray = [];
    const myObj = {
        Contact : contactNum,
        FullName : name,
        Email : email,
        AlternateContact : altContact,
        Password : password
    }
    UserDataObject[contactNum]=myObj;

    window.localStorage.setItem("UserData", JSON.stringify(UserDataObject));
    window.sessionStorage.setItem("currentUser", contactNum);

}
    






// ----------------------------------------------------

// let passLength = document.getElementById("8-char");
// let upperCase = document.getElementById("uppercase");
// let lowerCase = document.getElementById("lowercase");
// let numInPass = document.getElementById("one-num");
// let specialCharPass = document.getElementById("special-char");


// function validatePass() {
//     let returnValue = true;
//     let passError1 = document.getElementById("pass-error1");

    
//     if (passOne.length < 8) {
//         passError1.innerHTML = "Enter valid Password";
//         returnValue = false;
//     }else if (passOne.length == 0){
//         passError1.innerHTML = "Enter password";
//         returnValue = false;
//     }
//     else {
//         passError1.innerHTML="";
//     }

//     return returnValue;
// }



// function PassOneValid() {

//     let passOne = document.getElementById("pass-field-one").value;
//     var lowerCase = /[a-z]/g;
//     var upperCase = /[A-Z]/g;
//     var numbers = /[0-9]/g;

//     if(passOne.length == 0){
//         document.getElementById("pass-error1").innerHTML = "Enter Password";
//     }
//     else{
//         document.getElementById("pass-error1").innerHTML = "";
//     }

//     if(passOne.match(lowerCase)){
//         lowerCase.classList.remove("invalid");
//         lowerCase.classList.add("valid");
//     }
//     else{
//         lowerCase.classList.add("invalid");
//         lowerCase.classList.remove("valid");
//     }

//     if(passOne.match(upperCase)){
//         upperCase.classList.remove("invalid");
//         upperCase.classList.add("valid")
//     }
//     else{
//         upperCase.classList.add("invalid");
//         upperCase.classList.remove("valid");
//     }

//     if(passOne.match(numbers)){
//         numbers.classList.remove("invalid");
//         numbers.classList.add("valid");
//     }
//     else{
//         numbers.classList.add("invalid");
//         numbers.classList.remove("valid");
//     }

//     if(passOne.length >= 8){
//         passLength.classList.remove("invalid");
//         passLength.classList.add("valid");
//     }
//     else{
//         passLength.classList.add("valid");
//         passLength.classList.remove("invalid");
//     }
// }

// passFieldOne.onfocus = function(){
//     document.getElementById("pass-terms").style.display="block";
// }

// passFieldTwo.addEventListener("onclick", PassOneValid);

// // passFieldOne.onkeyup = PassOneValid();


// passFieldTwo.onfocus = function() {
//     let pass1 = document.getElementById("pass-field-one");
//     let passErrorOne = document.getElementById("pass-error1");
//     if(pass1.value.length == 0){
//         // passErrorOne.style.display="flex";
//         passErrorOne.innerHTML="Enter Password";
//     }
//     else{
//         // passErrorOne.style.display="flex";
//         passErrorOne.innerHTML="Enter Valid Password";
//     }
// }

// passFieldTwo.onblur = function() {
//     let passErrorOne = document.getElementById("pass-error1");
//     passErrorOne.style.display="none";
// }

