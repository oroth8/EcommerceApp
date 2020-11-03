function viewCart(){
    let cart=JSON.parse(localStorage.getItem("limitCart"));
    $.post("/cart", {"limitCart": cart}).done(function(results){
        $("#cart-body").empty();
        let newh=$("<h5>");
        newh.text("Your Cart");
        $("#cart-body").append(newh);
        let newUl=$("<ul>");
        if(results[0].name){
        for(let i=0; i< results.length; i++){
            let newLi=$("<li>");
            newLi.html(`<img src="${results[i].img_URLs}" class="cart-img"> Name: ${results[i].name} Price: ${results[i].price} <button type="button" class="close" data-id="${results[i].id}" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>`);
            newUl.append(newLi);
        }
        $("#cart-body").append(newUl);
        $(".close").on("click",function(e){
            e.preventDefault();
            let id=this.dataset.id;
            removeFromCart(id);
            viewCart();
        });
        let totalPrice=0;
        for(let i=0; i< results.length; i++){
            totalPrice += Number(results[i].price);
        }
        $("#total-price").html("Total Price : " + totalPrice);

        }
    });
};

viewCart();
$("#reload-cart").on("click",viewCart);

