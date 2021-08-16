const container = document.querySelector("#list");
const finalShipping = document.querySelector("#shipping");
const finalAmount = document.querySelector("#products-amount");
const finalTotal = document.querySelector("#total-amount");
const finalTotalPayment = document.querySelector("#total-payment");
const paidWidEl = document.querySelector("#paid-with");

const params = new URLSearchParams(window.location.search);
const paidWith = params.get("paidwith");
const shippingCosts = params.get("shipping");

let totalItems = 0;
let totalPrice = 0;
let discount = 0;
let totalAmount = 0;

// save the shopping cart to orders
addOrder(getCart());

// list the items

showShoppingCart();

// empty the shopping cart and update
emptyCart()
updateCart();

function showShoppingCart() {
  const items = getCart();
  container.innerHTML = "";
  for (let item of items) {
    container.innerHTML += `
    <div class="shopping-cart-item-container full-line border-bottom">
      <div class="flex-basis-55 flex"> 
          <img src="${item["game"]["images"][0].thumbnail}" alt="${
      item["game"]["name"]
    }" class="thumbnail"/>
          <div class="margin-10 flex flex-direction-col flex-content-center">
              <span class="bold italics block">${item["game"]["name"]}</span>
              <span class="block">Product Number: ${
                item["game"]["sku"]
              }</span>
          </div>                                
      </div>
      <div class="flex-basis-15 text-align-right flex flex-direction-col flex-content-center"> 
          <div id="shopping-cart-amount1">
            ${item["amount"]}
          </div>
      </div>
      <div class="flex-basis-15 text-align-right flex flex-direction-col flex-content-center"> 
          <div>
              <span class="inline-block" id="product-price-${
                item["game"]["id"]
              }">$${item["game"]["prices"].price}</span>
          </div>
      </div>
      <div class="flex-basis-15 text-align-right flex flex-direction-col flex-content-center"> 
          <div>
              <span class="inline-block" id="product-total-price-${
                item["game"]["id"]
              }">$${item["game"]["prices"].price * item["amount"]}</span>
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
  finalTotalPayment.innerHTML = "$" + (totalPrice + Number(shippingCosts));
  paidWidEl.innerHTML = paidWith;

  const user = getLoggedInUser();
  document.querySelector("#full-name").innerHTML =
    user.firstName + " " + user.lastName;
    document.querySelector("#address").innerHTML = user.address;
    document.querySelector("#city").innerHTML = user.city;
    document.querySelector("#postal-code").innerHTML = user.postalCode;
    document.querySelector("#country").innerHTML = user.country;

}
