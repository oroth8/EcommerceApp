$("#back-to-product").on("click",function(e){
    e.preventDefault();
    window.open(`/admin/Product/`);
});

$(".change-submit").on("click",function(e){
    e.preventDefault();
    let cat=this.dataset.cat;
    let value=$(`#id-${cat}`).val();
    let body={ "value": value, "cat": cat };
    $.post(window.location.href, body).done(function(){
        location.reload();
    });
});