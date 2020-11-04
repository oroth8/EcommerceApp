$(document).ready(() => {
    // Getting references to our form and input
    const signUpForm = $("form.signup");
    const usernameInput = $("input#username-input");
    const passwordInput = $("input#password-input");
  
    // When the signup button is clicked, we validate the username and password are not blank
    signUpForm.on("submit", event => {
      event.preventDefault();
      const userData = {
        username: usernameInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.username || !userData.password) {
        $("#signup-modal").modal({
          show: true
        });
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.username, userData.password);
      usernameInput.val("");
      passwordInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(username, password) {
      $.post("/api/signup", {
        username: username,
        password: password
      })
        .then(() => {
          window.location.replace("/");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }
    function handleLoginErr(err) {
        _rep=JSON.parse(err.responseText);
        $("#alert .msg").text(_rep.errors[0].message);
      $("#alert").fadeIn(500);
    }
  });
  
  let _rep;