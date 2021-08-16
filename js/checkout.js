const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const postalCode = document.querySelector("#postal-code");
const country = document.querySelector("#country");
const shipping = document.getElementsByName("shipping");
const payment = document.getElementsByName("payment");
const cartContainer = document.querySelector("#final-list");
const finalShipping = document.querySelector("#shipping");
const finalAmount = document.querySelector("#products-amount");
const finalTotal = document.querySelector("#total-amount");
const finalTotalPayment = document.querySelector("#total-payment");
const payBtn = document.querySelector("#pay");

let user = getLoggedInUser();
let shippingCosts = 3;
let paymentStr = "VISA/mastercard";
let totalItems = 0;
let totalPrice = 0;
let discount = 0;
let totalAmount = 0;

if (user == undefined) {
  const main = document.querySelector(".main-content");
  main.innerHTML = "";
  main.innerHTML = "<h2>Please login to your account first!</h2>";
  main.style.height = "100px";
  main.style.textAlign = "center";
  main.style.padding = "30px";

  main.innerHTML += "<br><a href='login.html'>Login</a>";
  main.innerHTML += "<br> If you do not have an account then ";
  main.innerHTML += "<a href='create-account.html'>Create one</a>";
} else {
  firstName.value = user.firstName || "";
  lastName.value = user.lastName || "";
  address.value = user.address || "";
  city.value = user.city || "";
  postalCode.value = user.postalCode || "";

  // set the option programmatically and select the correct country
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

  postalCode.addEventListener("blur", () => {
    const error = document.querySelector("#error-postalcode");
    if (postalCode.value.length < 2) showError(error);
    else hideError(error);
  });

  // set addeventlistener to shipping radios
  for (let radio of shipping) {
    radio.addEventListener("change", (evt) => {
      shippingCosts = Number(evt.target.value);
      finalShipping.innerHTML = "$" + shippingCosts;
      finalTotalPayment.innerHTML = "$" + (totalPrice + shippingCosts);
    });
  }

  // set addeventlistener to payment options
  for (let radio of payment) {
    radio.addEventListener("change", (evt) => {
      paymentStr = evt.target.value;
    });
  }

  // Show the products in the shopping cart

  showShoppingCart();
  function showShoppingCart() {
    const items = getCart();
    cartContainer.innerHTML = "";
    for (let item of items) {
      cartContainer.innerHTML += `
      <div class="shopping-cart-item-container full-line border-bottom">
        <div class="flex-basis-55 flex"> 
            <img src="${item["game"]["images"][0].thumbnail}" alt="${item["game"]["name"]}" class="thumbnail"/>
            <div class="margin-10 flex flex-direction-col flex-content-center">
                <span class="bold italics block">${item["game"]["name"]}</span>
                <span class="block">Product Number: ${item["game"]["sku"]}</span>
            </div>                                
        </div>
        <div class="flex-basis-15 text-align-right flex flex-direction-col flex-content-center"> 
            <div id="shopping-cart-amount1">
              ${item["amount"]}
            </div>
        </div>
        <div class="flex-basis-15 text-align-right flex flex-direction-col flex-content-center"> 
            <div>
                <span class="inline-block" id="product-price-${item["game"]["id"]}">$${item["game"]["prices"].price}</span>
            </div>
        </div>
        <div class="flex-basis-15 text-align-right flex flex-direction-col flex-content-center"> 
            <div>
                <span class="inline-block" id="product-total-price-${item["game"]["id"]}">$${
        item["game"]["prices"].price * item["amount"]
      }</span>
            </div>
        </div>
      </div>
      `;
      totalItems += Number(item["amount"]);
      totalPrice += item["amount"] * item["game"]["prices"].price;
    }
    finalAmount.innerHTML = totalItems;
    finalTotal.innerHTML = "$" + totalPrice;
    finalShipping.innerHTML = "$" + shippingCosts;
    finalTotalPayment.innerHTML = "$" + (totalPrice + shippingCosts);
  }

  payBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (
      firstName.value.length > 1 &&
      lastName.value.length > 1 &&
      address.value.length > 1 &&
      city.value.length > 1 &&
      postalCode.value.length > 1
    ) {
      // update the user info

      if (document.querySelector("#update-account").checked) {
        user.firstName = firstName.value;
        user.lastName = lastName.value;
        user.address = address.value;
        user.city = city.value;
        user.postalCode = postalCode.value;
        user.country = country.value;

        updateUserKey(user.email, "firstName", firstName.value);
        updateUserKey(user.email, "lastName", lastName.value);
        updateUserKey(user.email, "address", address.value);
        updateUserKey(user.email, "city", city.value);
        updateUserKey(user.email, "postal", city.value);
        updateUserKey(user.email, "postalCode", postalCode.value);
        updateUserKey(user.email, "country", country.value);
        logoutUser();
        login(user);
      }

      window.location.href = `checkout-success.html?paidwith=${paymentStr}&shipping=${shippingCosts}`;
    }
  });
}
