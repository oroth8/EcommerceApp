// Takes in user input and sends it to server to change information for the item.
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
