let profileBtn = document.getElementById("profile");
let loginPopUp = document.getElementById("login-popup");
let profilePopup = document.getElementById("user-popup");

profileBtn.addEventListener("mouseover", profileBtnPopup);
profileBtn.addEventListener("mouseout", closePopup);
loginPopUp.addEventListener("mouseover", popup);
loginPopUp.addEventListener("mouseout", closePopup);
profilePopup.addEventListener("mouseover", popup);
profilePopup.addEventListener("mouseout", closePopup);



// window.allBooks = JSON.parse(sessionStorage.getItem("allUserItems"));



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

let userProfile = document.getElementById("user-profile");
userProfile.addEventListener("click", ()=>{
    location.replace("user-profile.html")
})


if("BookRecord" in localStorage){
    let allUserItems={};
    let storeItem = JSON.parse(localStorage.getItem("BookRecord"));
    // console.log(Object.keys(storeItem));
    let userList = Object.keys(storeItem);
    userList.forEach(User => {
        let UserItemData = storeItem[User];
        let UserItems = Object.keys(UserItemData);
        // console.log(User);
        // console.log(UserItemData);
        UserItems.forEach(UserItem =>{
            // console.log(UserItemData);
            let key = User+"-"+UserItem;
            allUserItems[key]=UserItemData[UserItem];
        });
        // let UserItems = Object.keys(storeItem[User]);
        // console.log(userItems);
    });
    console.log("all items:");
    console.log(allUserItems);
    // window.allUserItems = allUserItems;
    sessionStorage.setItem("allUserItems", JSON.stringify(allUserItems));


    let allKeys = Object.keys(allUserItems);

    allKeys.forEach(key =>{
        showItem(key, allUserItems[key]);
    });

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

let myStore = document.getElementById("my-store");
let wishList = document.getElementById("wishlist");
let cart = document.getElementById("cart");

// myStore.addEventListener("click", myStorePage);
// wishList.addEventListener("click", )

function myStorePage(){
    location.assign("admin.html");
}
function wishListPage() {
    location.assign("wishlist.html");
}
function cartPage() {
    location.assign("mycart.html")
}

function addToCart(id) {
    let key = id.slice(0,-1);
    console.log(id);
    console.log(typeof(key));
    console.log(key);
    if("currentUser" in sessionStorage){
        let CurrentUser = sessionStorage.getItem("currentUser");
        if("Cart" in localStorage){
            let Cart = JSON.parse(localStorage.getItem("Cart"));
            // let myCart = 
            let myCart = Cart[CurrentUser];
            if(myCart.includes(key)){
                alert("already in cart");
            }
            else{
                myCart.push(key);
            Cart[CurrentUser] = myCart;
            localStorage.setItem("Cart",JSON.stringify(Cart));
                console.log("added to cart");
            }
            // myCart.push(key);
            // Cart[CurrentUser] = myCart;
            // localStorage.setItem("Cart",JSON.stringify(Cart));
        }
        else{
            let Cart = {};
            let myCart = [];
            if(myCart.includes(key)){
                alert("Already in cart");
            }else{
                myCart.push(key);
                Cart[CurrentUser] = myCart;

                localStorage.setItem("Cart",JSON.stringify(Cart));
                console.log("Added to Cart");
            }
            
        }

    }else{
        alert("Please LOGIN!");
    }
}

function addToWishlist(id){
    console.log("Added to wishlist");
}



function clickedItem(i){
    if(i==undefined){
        return 0;
    }
    let allBooks = JSON.parse(sessionStorage.getItem("allUserItems"));
    let key = i.slice(0, -1);
    console.log(key)
    let item = allBooks[key]
    console.log(item);
    let mainBook = document.getElementById("one-book");
    let mainContainer = document.createElement("div");
    mainContainer.classList.add("clicked-book");

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("item-elements");
    let imgFile = document.createElement("img");
    imgFile.setAttribute('src', item.ImageFile);
    imgFile.setAttribute('width', "250px");
    imgContainer.appendChild(imgFile);
    mainContainer.appendChild(imgContainer);

    let bookDetails = document.createElement("div");
    bookDetails.classList.add("book-details");
    bookDetails.classList.add("item-elements");

    let bookNameDiv = document.createElement("div");
    bookNameDiv.classList.add("book-name");
    let bookName = document.createTextNode(item.Title);
    bookNameDiv.appendChild(bookName);
    bookDetails.appendChild(bookNameDiv);

    let bookDetailsOther = document.createElement("div");
    bookDetailsOther.setAttribute('style', "display: flex; flex-direction: row;");

    let authorDescription = document.createElement("div");
    authorDescription.classList.add("item-elements");
    let authorNameDiv = document.createElement("div");
    authorNameDiv.classList.add("author");
    let authorName = document.createTextNode("AUTHOR:"+item.Author);
    authorNameDiv.appendChild(authorName);
    authorDescription.appendChild(authorNameDiv);
    let descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("book-description");
    let bookDescription = document.createTextNode(item.Description);
    descriptionDiv.appendChild(bookDescription);
    authorDescription.appendChild(descriptionDiv);
    bookDetailsOther.appendChild(authorDescription);

    let purchaseContainer = document.createElement("div");
    purchaseContainer.classList.add("price-index");

    let priceDiv = document.createElement("div");
    priceDiv.classList.add("price-price-index");
    let priceCalculate = item.MRP - ((item.MRP/100)*item.Discount);
    let price = document.createTextNode("₹"+priceCalculate);
    priceDiv.appendChild(price);
    purchaseContainer.appendChild(priceDiv);

    let priceDiscount = document.createElement("div");
    priceDiscount.classList.add("price-discount1");
    let discountDiv = document.createElement("div");
    discountDiv.classList.add("off");
    let off = document.createTextNode("("+item.Discount+"%OFF)");
    discountDiv.appendChild(off);
    priceDiscount.appendChild(discountDiv);
    let mrpDiv = document.createElement("div");
    mrpDiv.classList.add("mrp");
    let mrpPrice = document.createElement("s");
    let mrpPriceS = document.createTextNode("₹"+item.MRP);
    mrpPrice.appendChild(mrpPriceS);
    let mrp = document.createTextNode("MRP");
    mrpDiv.appendChild(mrp);
    mrpDiv.appendChild(mrpPrice);
    priceDiscount.appendChild(mrpDiv);
    
    purchaseContainer.appendChild(priceDiscount);


    let buyBtn = document.createElement("div");
    let addToCart = document.createElement("button");
    addToCart.classList.add("add-to-cart-btn");
    let btnName = document.createTextNode("ADD TO CART");
    addToCart.appendChild(btnName);
    buyBtn.appendChild(addToCart);
    let addToWishlist = document.createElement("button");
    addToWishlist.classList.add("main-suggested-add-to-wishlist");
    let wishlistBtn = document.createElement("img");
    wishlistBtn.setAttribute('src',"./Resources/Images/heart-icon-pink.png");
    wishlistBtn.setAttribute('width', "35px");
    addToWishlist.appendChild(wishlistBtn);
    buyBtn.appendChild(addToWishlist);

    purchaseContainer.appendChild(buyBtn);
    bookDetailsOther.appendChild(purchaseContainer);
    bookDetails.appendChild(bookDetailsOther);
    mainContainer.appendChild(bookDetails);

    mainBook.replaceChild(mainContainer, mainBook.children[0]);


    location.assign("index.html#")

}