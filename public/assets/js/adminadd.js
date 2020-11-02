$("#back-to-product").on("click",function(e){
    e.preventDefault();
    window.open(`/admin/Product/`);
});

$("#add-submit").on("click",function(e){
    e.preventDefault();
    let body={};
    body["brand"]=$("#id-brand").val();
    body["name"]=$("#id-name").val();
    body["category"]=$("#id-category").val();
    body["subCategory"]=$("#id-subCategory").val();
    body["price"]=Number($("#id-price").val());
    body["image_URLs"]=$("#id-image_URLs").val();

    $.post("/admin/Product/add", body).done(function(){
        window.open("/admin/Product");
    })

})