const form = document.querySelector(".contact-main-content form");
const email = document.querySelector("#email");
const username = document.querySelector("#user-name");
const feedback = document.querySelector("#feedback");
const confirmation = document.querySelector(".confirmation");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  confirmation.style.display = "block";
  email.value = "";
  username.value = "";
  feedback.value = "";
});

email.addEventListener("blur", () => {
  const error = document.querySelector("#error-email");

  if (regEmail.test(email.value)) {
    hideError(error);
  } else {
    showError(error);
  }

  username.addEventListener("blur", () => {
    const error = document.querySelector("#error-username");

    if (username.value.length > 4) {
      hideError(error);
    } else {
      showError(error);
    }
  });

  feedback.addEventListener("blur", () => {
    const error = document.querySelector("#error-feedback");

    if (feedback.value.length > 9) {
      hideError(error);
    } else {
      showError(error);
    }
  });
});
