
const API_CONTACT = "https://kronos.kandz.me/wp/wp-json/contact-form-7/v1/contact-forms/5/feedback";

const form = document.querySelector(".contact-main-content form");
const email = document.querySelector("#email");
const username = document.querySelector("#user-name");
const feedback = document.querySelector("#feedback");
const confirmation = document.querySelector(".confirmation");
const button = document.querySelector("#contact--button");

let emailReady = false;
let nameReady = false;
let feedbackReady = false;
button.disabled = true;

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let data = new FormData();
  data.append("your-name", username.value);
  data.append("your-email", email.value);
  data.append("your-subject", "Gamehub");
  data.append("your-message", feedback.value);
  fetch(API_CONTACT, {
    method: "POST",
    body: data,
    redirect: "follow"
  })
  .then (res => res.json())
  .then (json => {
    confirmation.style.display = "block";
  })
  .catch(e => {
    confirmation.style.display = "block";
    confirmation.style.color = "red";
    confirmation.innerHTML = "Something went wrong. We are sorry!";
  })


  confirmation.style.display = "block";
  email.value = "";
  username.value = "";
  feedback.value = "";
  button.disabled = true;
});

email.addEventListener("blur", () => {
  const error = document.querySelector("#error-email");

  if (regEmail.test(email.value)) {
    hideError(error);
    emailReady = true;
  } else {
    showError(error);
    emailReady = false;
  }
  checkForm();  
});

username.addEventListener("blur", () => {
  const error = document.querySelector("#error-username");

  if (username.value.length > 4) {
    hideError(error);
    nameReady = true;
  } else {
    showError(error);
    nameReady = false;
  }
  checkForm();
});

feedback.addEventListener("input", () => {
  const error = document.querySelector("#error-feedback");

  if (feedback.value.length > 9) {
    hideError(error);
    feedbackReady = true;
  } else {
    showError(error);
    feedbackReady = false;
  }
  checkForm();
});

function checkForm(){
  if (feedbackReady && emailReady && nameReady){
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}