function viewCart(){
    let cart=JSON.parse(localStorage.getItem("limitCart"));
    $.post("/cart", {"limitCart": cart}).done(function(results){
        $("#cart-body").empty();
        let newh=$("<h5>");
        newh.text("Your Cart");
        $("#cart-body").append(newh);
        let newUl=$("<ul>");
        let count=[];
        if(results[0].name){
        for(let i=0; i< results.length; i++){
            count.push(0);
                for(let j=0; j<limitCart.length;j++){
                    if(results[i].id==limitCart[j]){
                        count[i]++;
                    }
                }
            let newLi=$("<li>");
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
        $("#cart-body").append(newUl);
        $(".close").on("click",function(e){
            e.preventDefault();
            let id=this.dataset.id;
            removeFromCart(id);
            viewCart();
        });
        let totalPrice=0;
        for(let i=0; i< results.length; i++){
            totalPrice += Number(results[i].price)*Number(count[i]);
        }
        $("#total-price").html("Total Price : $" + Number(totalPrice).toFixed(2));

        }else{
            $("#total-price").html("Total Price : $ 0.00" );
        }
    });
};

viewCart();


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




