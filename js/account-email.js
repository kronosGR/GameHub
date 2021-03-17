const email = document.querySelector("#email");
const oldPassword = document.querySelector("#old-password");
const password = document.querySelector("#new-password");
const passwordRetype = document.querySelector("#new-password2");
const updateBtn = document.querySelector("#update-account");
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
    const error = document.querySelector("#error-lastname");
    if (lastName.value.length < 2) showError(error);
    else hideError(error);
  });

  password.addEventListener("blur", () => {
    const error = document.querySelector("#error-address");
    if (address.value.length < 2) showError(error);
    else hideError(error);
  });

  passwordRetype.addEventListener("blur", () => {
    const error = document.querySelector("#error-city");
    if (city.value.length < 2) showError(error);
    else hideError(error);
  });
}