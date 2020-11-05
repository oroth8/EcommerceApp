$(document).ready(() => {
    // Getting references to our form and inputs
    const loginForm = $("form.login");
    const usernameInput = $("input#username-input");
    const passwordInput = $("input#password-input");
  
    // When the form is submitted, we validate there's a username and password entered
    loginForm.on("submit", event => {
      event.preventDefault();
      const userData = {
        username: usernameInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.username || !userData.password) {

        // modal jquery to pop up modal when login error occurs
        $("#login-modal").modal({
          show: true
        });
        return;
      }
  
      // If we have a usedrname and password we run the loginUser function and clear the form
      loginUser(userData.username, userData.password);
      usernameInput.val("");
      passwordInput.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(username, password) {
      $.post("/api/login", {
        username: username,
        password: password
      })
        .then(() => {
          window.location.replace("/");
          // If there's an error, log the error
        })
        .catch(err => {
          $("#login-modal").modal({
            show: true
          });
          console.log(err);
        });
    }
  });
  