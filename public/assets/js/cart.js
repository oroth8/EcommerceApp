// create the elements required for the cart page.

function viewCart(){
    // we get the information for the cart from local storage.
    let cart=JSON.parse(localStorage.getItem("limitCart"));
    // We send this information through a post request and try to get back the other required information for the products.
    $.post("/cart", {"limitCart": cart}).done(function(results){
        // Empties the cart body to give us a clean area to work with.
        $("#cart-body").empty();
        // Creates a header display that the user is looking at the cart.
        let newh=$("<h5>");
        newh.text("Your Cart");
        $("#cart-body").append(newh);
        // We will create an unordered list of the item the users has in the cart.
        let newUl=$("<ul>");
        let count=[];
        // if there were no results, we skip to the end.  Otherwise, we fill the unordered list above.
        if(results[0].name){
        for(let i=0; i< results.length; i++){
            count.push(0);
                for(let j=0; j<limitCart.length;j++){
                    if(results[i].id==limitCart[j]){
                        count[i]++;
                    }
                }
            let newLi=$("<li>");
            // each list item is displayed with information for the image, name, price and quantity in cart.
            newLi.html(`<div class="row">
                            <div class="col-2"><img src="${results[i].image_URLs}" class="cart-img"> </div>
                            <div class="col-5 cart-name">Name: ${results[i].name} </div>
                            <div class="col-2"><button type="button" class="close" data-id="${results[i].id}" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button></div>
                            <div class="3"></div>
                        </div>
                        <div class="row  border-bottom border-primary m-bottom-2">
                            <div class="col-2"></div>
                            <div class="col-5">Price: $ ${results[i].price} </div>
                            <div class="col-5">Quantity: ${count[i]}</div>
                        </div>`);
            newUl.append(newLi);
        }
        // attaches the list to the cart body.
        $("#cart-body").append(newUl);
        // When the x is pressed, removes one of the items from the cart.
        $(".close").on("click",function(e){
            e.preventDefault();
            let id=this.dataset.id;
            removeFromCart(id);
            viewCart();
        });
        // Sums the prices of items in cart and displays total price.
        let totalPrice=0;
        for(let i=0; i< results.length; i++){
            totalPrice += Number(results[i].price)*Number(count[i]);
        }
        $("#total-price").html("Total Price : $" + Number(totalPrice).toFixed(2));

        }else{
            // if there were no items in the cart, we show the total price as 0.
            $("#total-price").html("Total Price : $ 0.00" );
        }
    });
};

// runs the view cart function when page is loaded.
viewCart();

// The checkout buttons that represent submitting your purchase.  In here, we reset the user's cart to being empty and send them to a thank you page.  This also sends the user id and products ids for each item order to the database so that this information can be recalled.  It does not, however, charge the user or process the orders since this is not a real ecommerce site.
$("#finalize-checkout").on("click",function(e){
    let count=0;
    $.each(limitCart, function(i, val){
        $.post("/order",{"id": val}).done(function(){
            count++;
            if(count==limitCart.length){
                limitCart=[];
                localStorage.setItem("limitCart", JSON.stringify(limitCart)); 
                window.location.href = "/checkout/thankyou";
            }
        });

    });
    });




