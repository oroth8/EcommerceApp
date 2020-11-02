$(".change-submit").on("click",function(e){
    e.preventDefault(); 
    let value=$(`#${this.dataset.id}-input`).val();
    let body={
        "id": this.dataset.id,
        "value": value
        };     
   $.post(window.location.href, body).done(function(){
       location.reload();
   }); 

     });

$("#back-to-product").on("click",function(e){
e.preventDefault();
window.open(`/admin/Product/`);
});