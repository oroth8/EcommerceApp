// Sends to the change by category page.
$("#change-by-category").on("change",function(e){
    e.preventDefault();
    let category=this.value;
    window.location.href = `/admin/Product/change/${category}`;
});
// Sends to the change by id page.
    $("#id-change-submit").on("click",function(e){
    e.preventDefault();
    let id=$("#change-by-id").val();
    window.location.href = `/admin/Product/change/byId/${id}`;
});
//  Sends to the add product page.
$("#add-product").on("click",function(e){
    window.location.href = "/admin/Product/add";
});