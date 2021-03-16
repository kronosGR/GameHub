const itemsContainer = document.querySelector(".container-white section");
const shoppingCartTotalContainer = document.querySelector(".shopping-cart-total");
const checkoutDiv = document.querySelector("#checkout-div");
const checkoutBtn = document.querySelector("#checkout-btn");

let totalItems = 0;
let totalPrice = 0;
let discount = 0;
let totalAmount = 0;

showShoppingCart();

checkoutBtn.addEventListener("click", (evt) => {
  evt.preventDefault();

  // TODO update the shopping cart of each item in the html

  const inputs = document.querySelectorAll("input[type='number'");
  for(let input of inputs){
    const id = input.getAttribute("data-id");
    const amount = input.value;
    updateAmountInShoppingCart(id, amount);
    window.location.href = "checkout.html"
  }
})

function showShoppingCart(){
  const items = getCart();
  itemsContainer.innerHTML = "";
  if (items.length > 0){
    for(let item of items){
      itemsContainer.innerHTML += `
      <div class="shopping-cart-item-container full-line border-bottom">
        <div class="flex-basis-55 flex"> 
            <img src="${item['game']['thumb']}" alt="${item['game']['title']}" class="thumbnail"/>
            <div class="margin-10 flex flex-direction-col flex-content-center">
                <span class="bold italics block">${item['game']['title']}</span>
                <span class="block">Product Number: ${item['game']['productNumber']}</span>
            </div>                                
        </div>
        <div class="flex-basis-15 text-align-right flex flex-direction-col flex-content-center"> 
            <div id="shopping-cart-amount1">
              <input type="number" data-id="${item['game']['id']}" id="amount-${item['game']['id']}" value="${item['amount']}" class="width-40 text-align-right">
              <button data-id="${item['game']['id']}" id="delete-${item['game']['id']}" class="red">X</button>
            </div>
        </div>
        <div class="flex-basis-15 text-align-right flex flex-direction-col flex-content-center"> 
            <div>
                <span class="inline-block" id="product-price-${item['game']['id']}">$${item['game']['price']}</span>
            </div>
        </div>
        <div class="flex-basis-15 text-align-right flex flex-direction-col flex-content-center"> 
            <div>
                <span class="inline-block" id="product-total-price-${item['game']['id']}">$${item['game']['price'] * item['amount']}</span>
            </div>
        </div>
      </div>
      `
      totalItems += item['amount'];
      totalPrice += (item['amount'] * item['game']['price']);
    }
    
    // get all the input boxes and add eventlistener
    const inputsArray = document.querySelectorAll('input[type="number"]');
    for(let input of inputsArray){
      const id = input.getAttribute("data-id");
      input.addEventListener("input", (evt) => {   
        let value = input.value;    
          
        if (value < 0){
          value = 0;
          evt.target.value = value;
        }
        const itemTotal = document.querySelector(`#product-total-price-${id}`);
        const itemPrice = document.querySelector(`#product-price-${id}`);
        itemTotal.innerHTML = "$" + (value * (itemPrice.innerHTML.replace("$","")));
        updateTotal();
      })
    }

    // get all delete buttons and add eventlistener
    const deleteBtns = document.querySelectorAll('button[id~="delete');
    for (let btn of deleteBtns){
      const id = btn.getAttribute("data-id");
      btn.addEventListener("click", (evt) => {
        evt.preventDefault();

        deleteItemFromCart(id);
        updateCart();
        showShoppingCart();
        updateTotal();
      })
    }

    shoppingCartTotalContainer.innerHTML = `
      <div class="full-line flex flex-justify-content-end">
        <div class="flex-basis-60 flex"> 
            <div class="flex-basis-35 bold">
                Total
            </div>                                
            <div class="flex-basis-10 text-align-right italics">
                <span id="products-amount" >${totalItems}</span>
            </div>                                
            <div class="flex-basis-55 text-align-right italics">                                    
                <span id="total-amount1" >$${totalPrice}</span>
            </div>
        </div>
      </div>
      <div class="full-line flex flex-justify-content-end">
        <div class="flex-basis-60 flex"> 
            <div class="flex-basis-30 bold">
                Discount
            </div>                                
            <div class="flex-basis-10 text-align-right italics">
            </div>                                
            <div class="flex-basis-60 text-align-right italics">                                    
                <span id="discount" >$${discount}</span>
            </div>
        </div>
      </div>
      <div class="full-line flex flex-justify-content-end">
        <div class="flex-basis-60 flex"> 
            <div class="flex-basis-60 bold">
                Total Amount
            </div>                                
            <div class="flex-basis-10 text-align-right italics">
            </div>                                
            <div class="flex-basis-30 text-align-right italics">                                    
                <span id="total-amount2" >$${totalPrice - discount}</span>
            </div>
        </div>
      </div>
    `
  } else {
    itemsContainer.innerHTML = "<h2>No items in your shopping cart</h2>";
    itemsContainer.style.height = "100px";
    itemsContainer.style.textAlign = "center";
    itemsContainer.style.padding = "30px";
    shoppingCartTotalContainer.style.display = "none";
    checkoutDiv.style.display = "none";
  }
}

/**
 * updates the values for the total amounts
 */
function updateTotal(){
  totalItems = 0;
  totalPrice = 0;
  const inputs = document.querySelectorAll("input[type='number'");
  for(let input of inputs){
    const id = input.getAttribute("data-id");
    const amount = input.value;
    const price = document.querySelector("#product-price-"+id).innerHTML.slice(1);
    totalItems += Number(amount);
    totalPrice += (amount * price);
    totalAmount = totalPrice- discount;    

    document.querySelector("#products-amount").innerHTML = totalItems;
    document.querySelector("#total-amount1").innerHTML = "$" + totalPrice;
    document.querySelector("#total-amount2").innerHTML = "$" + totalAmount;
  }
}

