let loginForm = document.getElementById("login-form");



loginForm.addEventListener("submit", e=>{
    e.preventDefault();

    validateAccount();
});


function validateAccount() {
    let username = document.getElementById("mob-num").value;
    let password = document.getElementById("pass").value;
    // let newObject = JSON.parse(window.localStorage.getItem(parseInt(contactNum)));
    // console.log(typeof(contactNum));

    if("UserData" in localStorage){
        let UserData = JSON.parse(localStorage.getItem("UserData"));
        if(username in UserData){
            let User = Object.assign({}, UserData[username]);
            // User = UserData.username;
            console.log(password);
            console.log(UserData[username]);
            if(password == User.Password){
                sessionStore(username);
                location.replace("index.html");
                return true;
            }
            else{
                alert("Incorrect Password!");
                return false;
            }
        }
        else{
            alert("User Not Found!");
            return true;
        }
    }
    else{
        alert("User Not Found!");
        return true;
    }

    

}

function sessionStore(username) {
    window.sessionStorage.setItem("currentUser", username);
}


// validateContact.onblur = function() {
//     let contact = validateContact.value;
//     if(contact.length != 10 ){
//         document.getElementById("contact-error").style.display = "flex";
//     }
//     else {
//         document.getElementById("contact-error").style.display = "none";
//         isContactValid = true;
//     }
// }




