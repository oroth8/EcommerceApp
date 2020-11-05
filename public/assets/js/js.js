// Variable to enable saving to cart
var limitCart=JSON.parse(localStorage.getItem("limitCart"));
if(limitCart===null){
  limitCart=[];
  localStorage.setItem("limitCart",JSON.stringify(limitCart));
}

function addToCart(id){
    limitCart.push(id);
    localStorage.setItem("limitCart", JSON.stringify(limitCart)); 
    updateCartCount();
}

function removeFromCart(id){
    limitCart.splice(limitCart.indexOf(id),1);
    localStorage.setItem("limitCart", JSON.stringify(limitCart)); 
    updateCartCount();
}


$(".add-to-cart").on("click",function(e){
    e.preventDefault();
    addToCart(this.dataset.id);
    getItemQuantity(this.dataset.id);
});

$(".remove-from-cart").on("click",function(e){
    e.preventDefault();
    removeFromCart(this.dataset.id);
    getItemQuantity(this.dataset.id);
})

// $("#reload-cart").on("click",viewCart);
$("#cart-view").on("click",viewCart);

function updateCartCount(){
    $("#cart-count").text(limitCart.length);
}
$(document).ready(updateCartCount);

function getItemQuantity(id){
    let count=0;
    for(let i=0; i<limitCart.length; i++){
        if(limitCart[i]==id){
            count++;
        }
    }
    $("#quantity").text(count);
}

