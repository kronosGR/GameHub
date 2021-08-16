const regForm = document.querySelector("#registration-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const retypePassword = document.querySelector("#retype-password");

regForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const user = new User();
  user.email = email.value;
  user.password = password.value;

  // get users from local storage
  const users =JSON.parse(localStorage.getItem(USERS_LOC)) || [];

  // add the user to the list and save it again
  users.push(user);
  localStorage.setItem(USERS_LOC, JSON.stringify(users));
  
  // add the user as loggedin user
  login(user);

  // redirect to the user account
  window.location.href = "account.html";
  
});

email.addEventListener("focusout", (evt) => {
  const error = document.querySelector("#error-email");
  
  if (regEmail.test(email.value)) {
    hideError(error);
  } else {
    showError(error);
  }
});

password.addEventListener("focusout", (evt) => {
  const error = document.querySelector("#error-password");
  if (password.value.length < 8) {
    showError(error);
  } else {
    hideError(error);
  }
});

retypePassword.addEventListener("focusout", (evt) => {
  const error = document.querySelector("#error-password-re");
  if (password.value === retypePassword.value) {
    hideError(error);
  } else {
    showError(error);
  }
});
