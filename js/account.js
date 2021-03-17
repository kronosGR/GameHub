const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const postalCode = document.querySelector("#postal-code");
const country = document.querySelector("#country");
const phone = document.querySelector("#phone");
const shipping = document.getElementsByName("shipping");
const form = document.querySelector("#account-form");
const updatedMsg = document.querySelector("#updated-msg");

let user = getLoggedInUser();

if (user == undefined) {
  // not allowed
  window.location.href = "index.html";
} else {
  firstName.value = user.firstName || "";
  lastName.value = user.lastName || "";
  address.value = user.address || "";
  city.value = user.city || "";
  phone.value = user.phone || "";
  postalCode.value = user.postalCode || "";

  setCountriesInSelect(country, user.country);

  firstName.addEventListener("blur", () => {
    const error = document.querySelector("#error-firstname");
    if (firstName.value.length < 2) showError(error);
    else hideError(error);
  });

  lastName.addEventListener("blur", () => {
    const error = document.querySelector("#error-lastname");
    if (lastName.value.length < 2) showError(error);
    else hideError(error);
  });

  address.addEventListener("blur", () => {
    const error = document.querySelector("#error-address");
    if (address.value.length < 2) showError(error);
    else hideError(error);
  });

  city.addEventListener("blur", () => {
    const error = document.querySelector("#error-city");
    if (city.value.length < 2) showError(error);
    else hideError(error);
  });

  phone.addEventListener("blur", () => {
    const error = document.querySelector("#error-phone");
    if (phone.value.length < 2) showError(error);
    else hideError(error);
  });

  postalCode.addEventListener("blur", () => {
    const error = document.querySelector("#error-postalcode");
    if (postalCode.value.length < 2) showError(error);
    else hideError(error);
  });

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    // update the user info

    user.firstName = firstName.value;
    user.lastName = lastName.value;
    user.address = address.value;
    user.city = city.value;
    user.postalCode = postalCode.value;
    user.country = country.value;
    user.phone = phone.value;

    updateUserKey(user.email, "firstName", firstName.value);
    updateUserKey(user.email, "lastName", lastName.value);
    updateUserKey(user.email, "address", address.value);
    updateUserKey(user.email, "city", city.value);
    updateUserKey(user.email, "postal", city.value);
    updateUserKey(user.email, "postalCode", postalCode.value);
    updateUserKey(user.email, "country", country.value);
    updateUserKey(user.email, "phone", phone.value);
    logoutUser();
    login(user);

    showError(updatedMsg);
  });
}
