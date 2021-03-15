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
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(email.value)) {
    error.classList.add("none");
    error.classList.remove("error");
  } else {
    error.classList.add("error");
    error.classList.remove("none");
  }
});

password.addEventListener("focusout", (evt) => {
  const error = document.querySelector("#error-password");
  if (password.value.length < 8) {
    error.classList.add("error");
    error.classList.remove("none");
  } else {
    error.classList.add("none");
    error.classList.remove("error");
  }
});

retypePassword.addEventListener("focusout", (evt) => {
  const error = document.querySelector("#error-password-re");
  if (password.value === retypePassword.value) {
    error.classList.add("none");
    error.classList.remove("error");
  } else {
    error.classList.add("error");
    error.classList.remove("none");
  }
});
