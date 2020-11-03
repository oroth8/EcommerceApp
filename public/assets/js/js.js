// Variable to enable saving to cart
var limitCart=JSON.parse(localStorage.getItem("limitCart"));
if(limitCart===null){
  limitCart=[];
  localStorage.setItem("limitCart",JSON.stringify(limitCart));
}

function addToCart(id){
    limitCart.push(id);
    localStorage.setItem("limitCart", JSON.stringify(limitCart)); 
}

function removeFromCart(id){
    limitCart.splice(limitCart.indexOf(id),1);
    localStorage.setItem("limitCart", JSON.stringify(limitCart)); 
}



// $("#reload-cart").on("click",viewCart);
// $("#view-cart").on("click",viewCart);