// -+==`^`==+----------------------------------+==`^`==+
// -+==`^`==+                                  +==`^`==+
// -+==`^`==+    Code to make sure that the    +==`^`==+
// -+==`^`==+    images all display either     +==`^`==+
// -+==`^`==+    the proper src, or a nice     +==`^`==+
// -+==`^`==+    placeholder.                  +==`^`==+
// -+==`^`==+----------------------------------+==`^`==+
$('document').ready(checkImages);

function checkImages(){
    $("img").on("error",(e)=>{
        e.currentTarget.src="/assets/img/logotext.png";
   
        // Thanks to
        // https://css-tricks.com/snippets/jquery/better-broken-image-handling/
    });
};