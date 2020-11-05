// Variable to enable saving to cart
var limitCart=JSON.parse(localStorage.getItem("limitCart"));
if(limitCart===null){
  limitCart=[];
  localStorage.setItem("limitCart",JSON.stringify(limitCart));
}

// When an add to cart button is pressed, the id is sent to this function to be saved into local storage for later recall.
function addToCart(id){
    limitCart.push(id);
    localStorage.setItem("limitCart", JSON.stringify(limitCart)); 
    updateCartCount();
}

// When a remove from cart button is pressed, the id is sent to this function to be removed from the local storage.
function removeFromCart(id){
    limitCart.splice(limitCart.indexOf(id),1);
    localStorage.setItem("limitCart", JSON.stringify(limitCart)); 
    updateCartCount();
}

// Listens for any buttons with the add to cart class.  When pressed calls the addtocart function.
$(".add-to-cart").on("click",function(e){
    e.preventDefault();
    addToCart(this.dataset.id);

});
// Listens for any buttons with the remove from cart class.  When pressed calls the removefromcart function.
$(".remove-from-cart").on("click",function(e){
    e.preventDefault();
    removeFromCart(this.dataset.id);

})

// add a listener to the cart button in the navbar to view the cart.
$("#cart-view").on("click",viewCart);

// Determines the number of items in teh cart and displays this as a badge next to cart icon.
function updateCartCount(){
    $("#cart-count").text(limitCart.length);
}
// When document loads, checks for the cart count.
$(document).ready(updateCartCount);



