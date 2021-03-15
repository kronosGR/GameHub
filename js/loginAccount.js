const logForm = document.querySelector("#login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

logForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const user = getUser(email.value, password.value);
  if (user != null) {
    login(user);
    window.location.href = "account.html";
  } else {
    const error = document.querySelector("#error-login");
    error.classList.add("error-login");
    error.classList.remove("none");
  }
});
