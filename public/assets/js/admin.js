$("#change-by-category").on("change",function(e){
    e.preventDefault();
    let category=this.value;
    window.open(`/admin/Product/change/${category}`);
});
    $("#id-change-submit").on("click",function(e){
    e.preventDefault();
    let id=$("#change-by-id").val();
    window.open(`/admin/Product/change/byId/${id}`);
});
$("#add-product").on("click",function(e){
    window.open("/admin/Product/add");
})