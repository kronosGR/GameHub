const email = document.querySelector("#email");
const oldPassword = document.querySelector("#old-password");
const password = document.querySelector("#new-password");
const passwordRetype = document.querySelector("#new-password2");
const form = document.querySelector(".game-grid-item2");
const updatedMsg = document.querySelector("#updated-msg");

let user = getLoggedInUser();

if (user == undefined) {
  // not allowed
  window.location.href = "index.html";
} else {
  email.value = user.email || "";

  email.addEventListener("blur", () => {
    const error = document.querySelector("#error-email");
    if (regEmail.test(email.value)) hideError(error);
    else showError(error);
  });

  oldPassword.addEventListener("blur", () => {
    const error = document.querySelector("#error-oldpass");
    if (oldPassword.value != user.password) showError(error);
    else hideError(error);
  });

  password.addEventListener("blur", () => {
    const error = document.querySelector("#error-pass");
    if (password.value.length < 8) showError(error);
    else hideError(error);
  });

  passwordRetype.addEventListener("blur", () => {
    const error = document.querySelector("#error-passretype");
    if (passwordRetype.value != password.value) showError(error);
    else hideError(error);
  });

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    user.email = email.value;
    user.password = password.value;

    updateUserKey(user.email, "email", email.value);
    updateUserKey(user.email, "password", password.value);
    logoutUser();
    login(user);

    updatedMsg.innerHTML = "Account updated!";
    showMsg(updatedMsg);
  });
}
