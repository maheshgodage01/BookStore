let TotalAmount = JSON.parse(sessionStorage.getItem("TotalAmount"));
console.log(TotalAmount);
console.log(TotalAmount);

let amountContainer = document.getElementById("final-amount");



let rent = document.getElementById("radio-11");
let buy = document.getElementById("radio-22");

amountContainer.innerHTML="₹"+TotalAmount+"/-"
rent.addEventListener("click", ()=>{
    console.log("clicked");
    TotalAmount = TotalAmount - ((TotalAmount/100)*70);
    amountContainer.innerHTML="₹"+TotalAmount.toFixed(2)+"/-"
});

buy.addEventListener("click", ()=>{
    TotalAmount = JSON.parse(sessionStorage.getItem("TotalAmount"));
    amountContainer.innerHTML="₹"+TotalAmount+"/-"
});


// if(rent.checked){
//     amountContainer.innerHTML="₹"+TotalAmount+"/-"
// }
// else if(buy.checked){
//     let priceCalculate = TotalAmount - ((TotalAmount/100)*70);
//     amountContainer.innerHTML="₹"+priceCalculate+"/-"
// }

let placeOrder = document.getElementById("place-order");

placeOrder.addEventListener("click", ()=>{
    alert("Order Placed!");
    if("allOrders" in localStorage){
        let allOrders = JSON.parse(localStorage.getItem("allOrders"));
        let currentUser = sessionStorage.getItem("currentUser");
        let Cart = JSON.parse(localStorage.getItem("Cart"));
        let myCart = Cart[currentUser];
        if(currentUser in allOrders){
            let myOrders = allOrders[currentUser];
            while(myCart.length!=0){
                let key = myCart.shift();
                let orderId = Math.floor(Math.random() * (9 * (Math.pow(10, 5)))) + (Math.pow(10, 5));
                myOrders.push(key+"-"+orderId);
                if("pendingOrders" in localStorage){
                    let pendingOrders = JSON.parse(localStorage.getItem("pendingOrders"));
                    pendingOrders.push(key+"-"+orderId);
                    localStorage.setItem("pendingOrders", JSON.stringify(pendingOrders));
                }
                else{
                    let pendingOrders = [];
                    pendingOrders.push(key+"-"+orderId);
                    localStorage.setItem("pendingOrders", JSON.stringify(pendingOrders));
                }
                
                notifyAdmin(key,orderId);
                console.log(key);
            }
            console.log(myCart);
            console.log(myOrders);
            allOrders[currentUser]=myOrders;
            Cart[currentUser]=myCart;

            localStorage.setItem("allOrders", JSON.stringify(allOrders))
            localStorage.setItem("Cart", JSON.stringify(Cart));
        }
        else{
            let myOrders=[];
            while(myCart.length!=0){
                let key = myCart.shift();
                let orderId = Math.floor(Math.random() * (9 * (Math.pow(10, 5)))) + (Math.pow(10, 5));
                myOrders.push(key+"-"+orderId);
                if("pendingOrders" in localStorage){
                    let pendingOrders = JSON.parse(localStorage.getItem("pendingOrders"));
                    pendingOrders.push(key+"-"+orderId);
                    localStorage.setItem("pendingOrders", JSON.stringify(pendingOrders));
                }
                else{
                    let pendingOrders = [];
                    pendingOrders.push(key+"-"+orderId);
                    localStorage.setItem("pendingOrders", JSON.stringify(pendingOrders));
                }
                
                notifyAdmin(key,orderId);
                console.log(key);
            }
            console.log(myCart);
            console.log(myOrders);
            allOrders[currentUser]=myOrders;
            Cart[currentUser]=myCart;

            localStorage.setItem("allOrders", JSON.stringify(allOrders))
            localStorage.setItem("Cart", JSON.stringify(Cart));
        }
    }
    else{
        let allOrders = {};
        let myOrders=[];
        let currentUser = sessionStorage.getItem("currentUser");
        let Cart = JSON.parse(localStorage.getItem("Cart"));
        let myCart = Cart[currentUser];
        console.log(myCart.length)
        while(myCart.length!=0){
            let key = myCart.shift();
            let orderId = Math.floor(Math.random() * (9 * (Math.pow(10, 5)))) + (Math.pow(10, 5));
            myOrders.push(key+"-"+orderId);
            if("pendingOrders" in localStorage){
                let pendingOrders = JSON.parse(localStorage.getItem("pendingOrders"));
                pendingOrders.push(key+"-"+orderId);
                localStorage.setItem("pendingOrders", JSON.stringify(pendingOrders));
            }
            else{
                let pendingOrders = [];
                pendingOrders.push(key+"-"+orderId);
                localStorage.setItem("pendingOrders", JSON.stringify(pendingOrders));
            }

            
            notifyAdmin(key,orderId);
            console.log(key);
        }
        console.log(myCart);
        console.log(myOrders);
        allOrders[currentUser]=myOrders;
        Cart[currentUser]=myCart;

        localStorage.setItem("allOrders", JSON.stringify(allOrders))
        localStorage.setItem("Cart", JSON.stringify(Cart));
    }

    location.assign("mycart.html");
});

function notifyAdmin(key, orderId){
    let admin = parseInt(key);

    if("allClients" in localStorage){
        let allAdmin = JSON.parse(localStorage.getItem("allClients"));
        let currentUser = sessionStorage.getItem("currentUser");
        
        if(admin in allAdmin){
            let adminItems = allAdmin[admin];
            adminItems.push(key+"-"+orderId);
            console.log(key+"-"+orderId);

            allAdmin[admin]= adminItems;
        
            localStorage.setItem("allClients", JSON.stringify(allAdmin));
        }
        else{
            let adminItems = [];
            let currentUser = sessionStorage.getItem("currentUser");

            adminItems.push(key+"-"+orderId);
            allAdmin[admin]= adminItems;
        
            localStorage.setItem("allClients", JSON.stringify(allAdmin));
        }
    }
    else{
        let allAdmin={};
        let adminItems = [];
        let currentUser = sessionStorage.getItem("currentUser");
        

        adminItems.push(key+"-"+orderId);
        allAdmin[admin]= adminItems;
    
        localStorage.setItem("allClients", JSON.stringify(allAdmin));
    }

//     if("allOrderId" in localStorage){
//         let allOrderId = localStorage.getItem("allOrderId");
//         let orderId= Math.floor(Math.random() * (9 * (Math.pow(10, 5)))) + (Math.pow(10, 5));

//     }
}


