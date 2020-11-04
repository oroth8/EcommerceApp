//  Sends back to main product view.
$("#back-to-product").on("click",function(e){
    e.preventDefault();
    window.location.href =`/admin/Product/`;
});

// Takes in info and sends it to server to create new item.
$("#add-submit").on("click",function(e){
    e.preventDefault();
    let body={};
    body["brand"]=$("#id-brand").val();
    body["name"]=$("#id-name").val();
    body["category"]=$("#id-category").val();
    body["subCategory"]=$("#id-subCategory").val();
    body["price"]=Number($("#id-price").val());
    body["image_URLs"]=$("#id-image_URLs").val();
    body["createdAt"]= new Date(Date.now()).toISOString();
    body["updatedAt"]= new Date(Date.now()).toISOString();

    $.post("/admin/Product/add", body).done(function(){
        window.location.href ="/admin/Product";
    })

})