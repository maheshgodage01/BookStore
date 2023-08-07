let allItemList = document.getElementById("all-item-list");

if("BookRecord" in localStorage){
    let storeArray = JSON.parse(localStorage.getItem("BookRecord"));
    let CurrentUser = sessionStorage.getItem("currentUser");

    if(CurrentUser in storeArray){
        let CurrentUserData = Object.assign({}, storeArray[CurrentUser]);
        // console.log(CurrentUserData);
        // console.log(Object.keys(CurrentUserData));   
        let dataList = Object.keys(CurrentUserData);  
        for(i in dataList){
            i=dataList[i];
            // console.log(Object.keys(CurrentUserData));     

            // console.log(parseInt(i), CurrentUserData[i]);
            // console.log(typeof(i));
            // console.log(CurrentUserData[i]);
            addItem(i, CurrentUserData[i]);
        }
    }

    // storeArray.forEach(addItem);
}


function addItem(i, item){
    // let storeArray = JSON.parse(localStorage.getItem("BookRecord"));
    // let CurrentUser = sessionStorage.getItem("currentUser");
    // console.log("Current user :"+CurrentUser);

    // let CurrentUserData1 = Object.assign({}, storeArray[CurrentUser]);
    // console.log("CurrentUser Data :" + storeArray[CurrentUser]);

    // let item = Object.assign({}, CurrentUserData1[i]);

    console.log(item);
    console.log(typeof(item));
    
    let itemList = document.getElementById("all-item-list");

    let OneItem = document.createElement("div");
    OneItem.classList.add("one-item");
    OneItem.setAttribute('id', ""+i);
    OneItem.setAttribute('onmouseover', "editItem(this.id)");
    OneItem.setAttribute('onmouseout', "notEditItem(this.id)");

    let btnDiv = document.createElement("div");
    btnDiv.classList.add("update-delete-btn");
    let updateBtn = document.createElement("button");
    updateBtn.classList.add("update-btn");
    updateBtn.setAttribute('id', i+"a");
    updateBtn.setAttribute('onClick', "updateItem(this.id)");
    let updateBtnName = document.createTextNode("UPDATE");
    updateBtn.appendChild(updateBtnName);
    btnDiv.appendChild(updateBtn);
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    // deleteBtn.classList.add(""+i);
    deleteBtn.setAttribute('id', i+"b");
    deleteBtn.setAttribute('onClick', "deleteItem(this.id)");
    let deleteBtnName = document.createTextNode("DELETE");
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

    // console.log(i);
    // i+=1;
}



