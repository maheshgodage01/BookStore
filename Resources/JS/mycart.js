let allItemList = document.getElementById("all-item-list");

let screen = document.getElementById("scroll-bg");
let bodyDisplay = document.getElementById("body");
let EmptyCart = document.getElementById("empty-cart");
let NotLoggedIn = document.getElementById("not-logged-in");



if(!("currentUser" in sessionStorage)){
    screen.style.display="none";
    bodyDisplay.classList.add("background");
    NotLoggedIn.style.display="block"

}
else if("Cart" in localStorage){
    let Cart = JSON.parse(localStorage.getItem("Cart"));
    let CurrentUser = sessionStorage.getItem("currentUser");
    if(CurrentUser in Cart){
        screen.style.display="flex";
        bodyDisplay.classList.remove("background");
        NotLoggedIn.style.display="none";
        EmptyCart.style.display="none";
    }
    else{
        screen.style.display="none"
        bodyDisplay.classList.add("background");
        EmptyCart.style.display="block";
        NotLoggedIn.style.display="none";

    }
    // screen.style.display="none"
    // bodyDisplay.classList.add("background");
}
else{
    screen.style.display="none"
    bodyDisplay.classList.add("background");
    EmptyCart.style.display="block";
    NotLoggedIn.style.display="none";
}
window.Amount=0;
if("currentUser" in sessionStorage){
    console.log("currentuser");
    let CurrentUser = sessionStorage.getItem("currentUser");
    if("Cart" in localStorage){
        console.log("mycart");

        let Cart = JSON.parse(localStorage.getItem("Cart"));
        if(CurrentUser in Cart){
            let myCart = Cart[CurrentUser];
            console.log(myCart);
            let allUserItems = JSON.parse(sessionStorage.getItem("allUserItems"));
            // console.log(keys);
            Amount=0;
            myCart.forEach(key=>{
                Amount += addItem(key, allUserItems[key]);
                
                let TotalAmount = document.getElementById("final-amount");
                let finalAmount = document.createTextNode("₹" + Amount.toFixed(2)+"/-");
                TotalAmount.replaceChild(finalAmount, TotalAmount.childNodes[0]);

            });
        }
        

    }
    // else{
    //     document.querySelector("body").classList.add("background");
    // }





    // let storeArray = JSON.parse(localStorage.getItem("BookRecord"));
    // // let CurrentUser = sessionStorage.getItem("currentUser");

    // if(CurrentUser in storeArray){
    //     let CurrentUserData = Object.assign({}, storeArray[CurrentUser]);
    //     // console.log(CurrentUserData);
    //     // console.log(Object.keys(CurrentUserData));   
    //     let dataList = Object.keys(CurrentUserData);  
    //     for(i in dataList){
    //         i=dataList[i];
    //         // console.log(Object.keys(CurrentUserData));     

    //         // console.log(parseInt(i), CurrentUserData[i]);
    //         // console.log(typeof(i));
    //         // console.log(CurrentUserData[i]);
    //         addItem(i, CurrentUserData[i]);
    //     }
    // }

    // storeArray.forEach(addItem);
}


function addItem(i, item){
    console.log(i)
    console.log(item);
    if(item == undefined){
        return 0;
    }

    // let storeArray = JSON.parse(localStorage.getItem("BookRecord"));
    // let CurrentUser = sessionStorage.getItem("currentUser");
    // console.log("Current user :"+CurrentUser);

    // let CurrentUserData1 = Object.assign({}, storeArray[CurrentUser]);
    // console.log("CurrentUser Data :" + storeArray[CurrentUser]);

    // let item = Object.assign({}, CurrentUserData1[i]);

    // console.log(item);
    // console.log(typeof(item));
    
    let itemList = document.getElementById("all-item-list");

    let OneItem = document.createElement("div");
    OneItem.classList.add("one-item");
    OneItem.setAttribute('id', ""+i);
    OneItem.setAttribute('onmouseover', "editItem(this.id)");
    OneItem.setAttribute('onmouseout', "notEditItem(this.id)");

    let btnDiv = document.createElement("div");
    btnDiv.classList.add("update-delete-btn");
    // let updateBtn = document.createElement("button");
    // updateBtn.classList.add("update-btn");
    // updateBtn.setAttribute('id', i+"a");
    // updateBtn.setAttribute('onClick', "updateItem(this.id)");
    // let updateBtnName = document.createTextNode("UPDATE");
    // updateBtn.appendChild(updateBtnName);
    // btnDiv.appendChild(updateBtn);
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    // deleteBtn.classList.add(""+i);
    deleteBtn.setAttribute('id', i+"b");
    deleteBtn.setAttribute('onClick', "deleteItem(this.id)");
    let deleteBtnName = document.createTextNode("REMOVE");
    deleteBtn.appendChild(deleteBtnName);
    btnDiv.appendChild(deleteBtn);

    OneItem.appendChild(btnDiv);


    let imgContainer = document.createElement("div");
    imgContainer.classList.add("all-items-item");
    let imgSrc = document.createElement("img");
    imgSrc.setAttribute('src',item.ImageFile);
    imgContainer.appendChild(imgSrc);
    OneItem.appendChild(imgContainer);


    let priceContainer = document.createElement("div");
    priceContainer.classList.add("price");

    let price = document.createElement("div");
    price.classList.add("item-price");

    let rupee = document.createTextNode("₹");
    let mrpSpan = document.createElement("div");
    mrpSpan.appendChild(rupee);
    // price.appendChild(mrpSpan);

    let priceCalculate = item.MRP - ((item.MRP/100)*item.Discount);
    let actualPrice = document.createTextNode("₹"+priceCalculate);

    price.appendChild(actualPrice);
    priceContainer.appendChild(price);


    let mrp = document.createElement("div");
    mrp.classList.add("item-mrp");
    let mrpText = document.createTextNode("MRP");
    mrp.appendChild(mrpText);
    // mrpSpan.innerHTML="₹" + item.MRP;
    let mrpDiv = document.createElement("span");
    mrpDiv.classList.add("item-mrp-line-through");
    // console.log(item.MRP);
    let mrpPrice = item.MRP;
    let Mrpval = document.createTextNode(mrpPrice);
    mrpDiv.appendChild(Mrpval);

    mrpSpan.appendChild(mrpDiv);

    mrp.appendChild(mrpSpan);
    priceContainer.appendChild(mrp);

    OneItem.appendChild(priceContainer);

    itemList.appendChild(OneItem);

    let ItemListCheckout = document.getElementById("item-list");
    let listItemContainer = document.createElement("li");
    let itemName = document.createElement("span");
    let Book = document.createTextNode(item.Title);
    itemName.appendChild(Book);
    listItemContainer.appendChild(itemName);

    let itemAmount = document.createElement("span");
    let Amount = document.createTextNode("₹"+priceCalculate);
    // Amount.setAttribute('style', "\"font-weight: 600;\"");
    itemAmount.appendChild(Amount);

    listItemContainer.appendChild(Amount);
    ItemListCheckout.appendChild(listItemContainer);

    return priceCalculate;
    // console.log(i);
    // i+=1;
}


function deleteItem(id){
    let elementId = id.slice(0, -1);
    console.log(id);
    // let elementId = parseInt(id);
    console.log(elementId);
    // let storeArray = JSON.parse(localStorage.getItem("BookRecord"));
    let CurrentUser = sessionStorage.getItem("currentUser");
    // console.log(CurrentUser);
    // let CurrentUserData = Object.assign({}, storeArray[CurrentUser]);
    // console.log(CurrentUserData);
    let Cart = JSON.parse(localStorage.getItem("Cart"));

    let myCart = Cart[CurrentUser];
    if(myCart.includes(elementId)){

        let index = myCart.indexOf(elementId);
        myCart.splice(index, 1);
        // myCart.remove(elementId);
        console.log("MyCart:"+myCart);
        Cart[CurrentUser] = myCart;
        localStorage.setItem("Cart", JSON.stringify(Cart));
        location.reload();
    }
    else{
        console.log(elementId+":not found");
    }

}

function editItem(id) {
    // let intVal = parseInt(id);
    let oneItem=document.getElementById(id);
    console.log(id);
    // let updateId = id+"a";
    // console.log(updateId);
    let deleteId = id+"b";
    oneItem.style.opacity= "0.9";
    // let updateBtn = document.getElementById(updateId);
    let deleteBtn =  document.getElementById(deleteId);
    // updateBtn.style.display="flex";
    // updateBtn.style.opacity="1";
    deleteBtn.style.display= "flex";
    deleteBtn.style.opacity="1";
}

function notEditItem(id){
    // let intVal = parseInt(id);
    let oneItem=document.getElementById(id);
    // console.log(intVal+1);
    // let updateId = id+"a";
    let deleteId = id+"b";
    // let updateBtn = document.getElementById(updateId);
    let deleteBtn =  document.getElementById(deleteId);
    // updateBtn.style.display="none";
    deleteBtn.style.display= "none";

    oneItem.style.opacity="1";
}





let profileBtn = document.getElementById("profile");
let loginPopUp = document.getElementById("login-popup");
let profilePopup = document.getElementById("user-popup");

profileBtn.addEventListener("mouseover", profileBtnPopup);
profileBtn.addEventListener("mouseout", closePopup);
loginPopUp.addEventListener("mouseover", popup);
loginPopUp.addEventListener("mouseout", closePopup);
profilePopup.addEventListener("mouseover", popup);
profilePopup.addEventListener("mouseout", closePopup);

let login = false;
function profileBtnPopup(){
    let userName = loginCheck();
    // console.log(typeof(userName));

    if(userName == null){
        // console.log("null");
        profilePopup.style.display = "none";
        loginPopUp.style.display="flex";
    }
    else {
        console.log("inside");
        loginPopUp.style.display="none";
        profilePopup.style.display = "flex";
    }
}

function popup() {
    if(login){
        loginPopUp.style.display="none";
        profilePopup.style.display = "flex";
    }
    else {
        profilePopup.style.display = "none";
        loginPopUp.style.display="flex";

    }
}

function closePopup() {
    loginPopUp.style.display="none";
    profilePopup.style.display = "none";
}

function loginCheck() {
    let userName = null;
    if("currentUser" in sessionStorage){
        console.log("yes")
        login = true;
        userName = window.sessionStorage.getItem("currentUser");
        let userNameField = document.getElementById("user-profile-profile");
        let contactField = document.getElementById("contact");

        if("UserData" in localStorage){
            let UserData = JSON.parse(localStorage.getItem("UserData"));
            if(userName in UserData){
                let User = Object.assign({}, UserData[userName]);
                // User = UserData.username;
                userNameField.innerHTML=User.FullName;
                contactField.innerHTML=User.Contact;
            }
            
        }
    }

    return userName;
}

function myStorePage(){
    location.assign("admin.html");
}
function wishListPage() {
    location.assign("wishlist.html");
}
function cartPage() {
    location.assign("mycart.html")
}



function showItem(i, item){


    if((Object.keys(item)).length == 0){
        return 0;
    }
    let allItemList = document.getElementById("all-items");

    let mainContainer = document.createElement("div");
    mainContainer.classList.add("suggested-item-list");
    mainContainer.setAttribute('id', i);

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("suggested-item-img");
    let imgFile = document.createElement("img");
    imgFile.setAttribute('src', item.ImageFile);
    imgFile.setAttribute('id', i+"i")
    imgFile.setAttribute('onclick', "clickedItem(this.id)")
    imgContainer.appendChild(imgFile);
    mainContainer.appendChild(imgContainer);

    let priceContainer = document.createElement("div");
    priceContainer.classList.add("suggested-item-prices");
    let itemPrice = document.createElement("div");
    itemPrice.classList.add("suggested-item-price");
    let priceSpan = document.createElement("span");
    priceSpan.setAttribute('id', i+"a");
    let priceCalculate = item.MRP - ((item.MRP/100)*item.Discount);
    let price= document.createTextNode("₹"+priceCalculate);
    priceSpan.appendChild(price);
    itemPrice.appendChild(priceSpan);
    priceContainer.appendChild(itemPrice);

    let itemMrpContainer = document.createElement("div");
    itemMrpContainer.classList.add("suggested-item-mrp");
    let mrpText = document.createTextNode("MRP");
    itemMrpContainer.appendChild(mrpText);
    let mrpSpan = document.createElement("span");
    mrpSpan.classList.add("suggested-item-mrp-line-through");
    mrpSpan.setAttribute('id', i+"b");
    let mrpValue = document.createTextNode("₹"+item.MRP);
    mrpSpan.appendChild(mrpValue);
    itemMrpContainer.appendChild(mrpSpan);
    priceContainer.appendChild(itemMrpContainer);

    mainContainer.appendChild(priceContainer);

    let buyBtnContainer = document.createElement("div");
    buyBtnContainer.classList.add("suggested-buy-btn");
    let cartContainer = document.createElement("button");
    cartContainer.classList.add("suggested-add-to-bag");
    cartContainer.setAttribute('id', i+"c");
    cartContainer.setAttribute("onclick", "addToCart(this.id)");
    let carttext = document.createTextNode("Add to Cart");
    cartContainer.appendChild(carttext);
    buyBtnContainer.appendChild(cartContainer);

    let wishlistContainer = document.createElement("button");
    wishlistContainer.classList.add("suggested-add-to-wishlist");
    wishlistContainer.setAttribute('id', i+"d");
    wishlistContainer.setAttribute('onclick', "addToWishlist(this.id)");
    let wishlistIcon = document.createElement("img");
    wishlistIcon.setAttribute('src', "./Resources/Images/heart-icon-pink.png");
    wishlistContainer.appendChild(wishlistIcon);
    buyBtnContainer.appendChild(wishlistContainer);

    mainContainer.appendChild(buyBtnContainer);

    allItemList.appendChild(mainContainer);
}

let logOutBtn = document.getElementById("logout");

logOutBtn.addEventListener("click", ()=>{
    sessionStorage.removeItem("currentUser");
    location.reload();
});


let applyCouponBtn = document.getElementById("apply-coupon-btn");
applyCouponBtn.addEventListener("click", ()=>{
    let couponCode = document.getElementById("coupon-code").value;
    // let Coupons = {
    //     WELCOME: 50,
    //     LUCKY:25,
    //     HELLO:20,
    // };
    // localStorage.setItem("coupons", JSON.stringify(Coupons));
    let allCoupons = JSON.parse(localStorage.getItem("coupons"));
    console.log(allCoupons);

    console.log("Entered");

    if(couponCode in allCoupons){
        let TotalAmount = document.getElementById("final-amount");
        Amount = Amount - ((Amount/100)*allCoupons[couponCode]);
        let finalAmount = document.createTextNode("₹" + Amount.toFixed(2)+"/-");
        TotalAmount.replaceChild(finalAmount, TotalAmount.childNodes[0]);
        delete allCoupons[couponCode];
        localStorage.setItem("coupons", JSON.stringify(allCoupons));
        console.log(allCoupons);
    }
    else{
        location.reload();
    }
    
});



let checkOut = document.getElementById("checkout-btn");
checkOut.addEventListener("click", ()=>{

    if(Amount == 0){
        alert("Cart is Empty!!");
        return 0;
    }
    console.log(window.Amount.toFixed(2));
    sessionStorage.setItem("TotalAmount", JSON.stringify(Amount));
    location.assign("payment.html");
});



//-----------------------------------------------------------


if("currentUser" in sessionStorage){
    let CurrentUser = sessionStorage.getItem("currentUser");
    if("allOrders" in localStorage){
        let allOrders = JSON.parse(localStorage.getItem("allOrders"));
        // let myCart = 
        if(CurrentUser in allOrders){
            let myOrders = allOrders[CurrentUser];
            // console.log(CurrentUser);
            // console.log(myOrders);
            let allUserItems = JSON.parse(sessionStorage.getItem("allUserItems"));

            
            myOrders.forEach(key => {
                // console.log(key)

                let orderId = key.slice(-6);
                let i = key.slice(0,-7)
                console.log(orderId);
                console.log(i)
                // console.log(allUserItems[key]);
                showOrders(orderId,i, allUserItems[i]);
            });
        }
        
    }
}

function showOrders(orderId, key, item){
    // let allUserItems = JSON.parse(sessionStorage.getItem("allUserItems"));

    // // let orderId = key.slice(-6);
    // // key = key.slice(0,-7);
    // // console.log(orderId);
    // console.log("key.."+key)
    // // console.log(allUserItems[key]);

    // console.log(item);

    if((Object.keys(item)).length == 0){
        return 0;
    }
    let allItemList = document.getElementById("all-items");

    let mainContainer = document.createElement("div");
    mainContainer.classList.add("suggested-item-list");
    mainContainer.setAttribute('id', key);

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("suggested-item-img");
    let imgFile = document.createElement("img");
    imgFile.setAttribute('src', item.ImageFile);
    imgFile.setAttribute('id', key+"i")
    imgFile.setAttribute('onclick', "clickedItem(this.id)")
    imgContainer.appendChild(imgFile);
    mainContainer.appendChild(imgContainer);

    let priceContainer = document.createElement("div");
    priceContainer.classList.add("suggested-item-prices");
    let itemPrice = document.createElement("div");
    itemPrice.classList.add("suggested-item-price");
    let priceSpan = document.createElement("span");
    priceSpan.setAttribute('id', key+"a");
    let priceCalculate = item.MRP - ((item.MRP/100)*item.Discount);
    let price= document.createTextNode("₹"+priceCalculate);
    priceSpan.appendChild(price);
    itemPrice.appendChild(priceSpan);
    priceContainer.appendChild(itemPrice);

    let itemMrpContainer = document.createElement("div");
    itemMrpContainer.classList.add("suggested-item-mrp");
    let mrpText = document.createTextNode("MRP");
    itemMrpContainer.appendChild(mrpText);
    let mrpSpan = document.createElement("span");
    mrpSpan.classList.add("suggested-item-mrp-line-through");
    mrpSpan.setAttribute('id', key+"b");
    let mrpValue = document.createTextNode("₹"+item.MRP);
    mrpSpan.appendChild(mrpValue);
    itemMrpContainer.appendChild(mrpSpan);
    priceContainer.appendChild(itemMrpContainer);

    mainContainer.appendChild(priceContainer);

    let deliverBtnContainer = document.createElement("div");
    // buyBtnContainer.classList.add("suggested-buy-btn");
    let deliverBtn = document.createElement("button");
    deliverBtn.setAttribute('id', key+"-"+orderId);
    let id = key+"-"+orderId;


    // if(orderCheck(id)){
    //     console.log("inside if");
    //     deliverBtn.classList.add("order-completed");
    //     let deliver = document.createTextNode("DELIVERED");
    //     deliverBtn.appendChild(deliver);
    // }
    // else{
    //     console.log("inside else");

        
    // }

    deliverBtn.setAttribute('onClick', "cancelOrder(this.id)");
        deliverBtn.classList.add("deliver-order");
        let deliver = document.createTextNode("CANCEL");
        deliverBtn.appendChild(deliver);

    
    deliverBtnContainer.appendChild(deliverBtn);
    mainContainer.appendChild(deliverBtnContainer);
    

    // let buyBtnContainer = document.createElement("div");
    // buyBtnContainer.classList.add("suggested-buy-btn");
    // let cartContainer = document.createElement("button");
    // cartContainer.classList.add("suggested-add-to-bag");
    // cartContainer.setAttribute('id', i+"c");
    // cartContainer.setAttribute("onclick", "addToCart(this.id)");

    // if("currentUser" in sessionStorage){
    //     let CurrentUser = sessionStorage.getItem("currentUser");
    //     if("Cart" in localStorage){
    //         let Cart = JSON.parse(localStorage.getItem("Cart"));
    //         // let myCart = 
    //         let myCart = Cart[CurrentUser];
    //         if(myCart.includes(i)){
    //             console.log("already in Cart");
    //             let carttext = document.createTextNode("Added to Cart");
    //             cartContainer.appendChild(carttext);
    //         }
    //         else{
    //             let carttext = document.createTextNode("Add to Cart");
    //             cartContainer.appendChild(carttext);
    //         }
           
    //     }
    //     else{
    //         let carttext = document.createTextNode("Add to Cart");
    //         cartContainer.appendChild(carttext);

    //     }
    // }
    // else{
    //     let carttext = document.createTextNode("Add to Cart");
    //     cartContainer.appendChild(carttext);
    // }
    
    // buyBtnContainer.appendChild(cartContainer);

    // let wishlistContainer = document.createElement("button");
    // wishlistContainer.classList.add("suggested-add-to-wishlist");
    // wishlistContainer.setAttribute('id', i+"d");
    // wishlistContainer.setAttribute('onclick', "removeFromWishlist(this.id)");
    // let wishlistIcon = document.createElement("img");

    // if("currentUser" in sessionStorage){
    //     let CurrentUser = sessionStorage.getItem("currentUser");
    //     if("Wishlist" in localStorage){
    //         let Wishlist = JSON.parse(localStorage.getItem("Wishlist"));
    //         // let myCart = 
    //         let myWishlist = Wishlist[CurrentUser];
    //         if(myWishlist.includes(i)){
    //             console.log("already in Wishlist");
    //             wishlistIcon.setAttribute('src', "./Resources/Images/heart-icon-filled.png");
    //         }
    //         else{
    //             wishlistIcon.setAttribute('src', "./Resources/Images/heart-icon-pink.png");
    //         }
           
    //     }
    //     else{
    //         wishlistIcon.setAttribute('src', "./Resources/Images/heart-icon-pink.png");

    //     }
    // }
    // else{
    //     wishlistIcon.setAttribute('src', "./Resources/Images/heart-icon-pink.png");
    // }
    // // wishlistIcon.setAttribute('src', "./Resources/Images/heart-icon-pink.png");
    // // wishlistIcon.setAttribute("onclick", "addToWishlist(this.id)");
    // wishlistContainer.appendChild(wishlistIcon);
    // buyBtnContainer.appendChild(wishlistContainer);

    // mainContainer.appendChild(buyBtnContainer);

    allItemList.appendChild(mainContainer);
}

let completedOrders = JSON.parse(localStorage.getItem("completedOrders"));
completedOrders.forEach(key=>{
    let item = document.getElementById(key);
    if(!(item == undefined)){
        console.log(item);
        console.log(key);
        item.classList.remove("deliver-order");
        item.classList.add("order-completed");
        item.innerHTML="DELIVERED";
        item.removeAttribute("onClick");
    }
    
});


function orderCheck(id){
    let completedOrders = JSON.parse(localStorage.getItem("completedOrders"));
    completedOrders.forEach(key=>{
        if(key == id){
            console.log("true", key)
            return true;
        }
    });
    
    // return false;
}

function cancelOrder(id){
    console.log("Order Cancel");
    console.log(id);
    let user = parseInt(id);

    let CurrentUser = sessionStorage.getItem("currentUser");


    let allOrders = JSON.parse(localStorage.getItem("allOrders"));
    let myOrders = allOrders[CurrentUser];
    let index = myOrders.indexOf(id);
    myOrders.splice(index, 1);
    allOrders[CurrentUser]=myOrders;
    localStorage.setItem("allOrders", JSON.stringify(allOrders));

    let allAdmins = JSON.parse(localStorage.getItem("allClients"));
    let UserOrders = allAdmins[user];
    index = UserOrders.indexOf(id);
    UserOrders.splice(index, 1);
    allAdmins[user]=UserOrders;
    localStorage.setItem("allClients", JSON.stringify(allAdmins));

    let item = document.getElementById(id);
    item.style.backgroundColor="#ababab";
    item.style.fontSize="15px";
    item.innerHTML="ORDER CANCELED";
}