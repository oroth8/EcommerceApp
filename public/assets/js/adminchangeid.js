// Sends back to main product view with options.
$("#back-to-product").on("click",function(e){
    e.preventDefault();
    window.location.href =`/admin/Product/`;
});

// Takes in input from user and sends to server to submit change in database.
$(".change-submit").on("click",function(e){
    e.preventDefault();
    let cat=this.dataset.cat;
    let value=$(`#id-${cat}`).val();
    let body={ "value": value, "cat": cat };
    $.post(window.location.href, body).done(function(){
        location.reload();
    });
});