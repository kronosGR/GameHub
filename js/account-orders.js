const header = document.querySelector("#header");
const ordersCon = document.querySelector("#orders");

const orders = getOrders();


if (orders.length<1){  
  header.innerHTML = "<h2>No orders found</h2>";
  header.style.height = "100px";
  header.style.textAlign = "center";
  header.style.padding = "30px";
} else {
  ordersCon.innerHTML = "";
  for (let order of orders){
    const dato = order["date"];
    const id = order["id"];
    const cart = order["cart"]
    let titles = "";
    
    for (let item of cart){
      let title = item["game"]["title"] 
      titles += title +"<br>";
      
    }
    ordersCon.innerHTML += `
    <a href="#" class="account-grid hover-overlay">
      <span id="odernumber">${id}</span>
      <span id="date">${dato.substring(0,15)}</span>
      <span id="status" class="green" >Sent</span>
      <div id="games">
        ${titles}
      </div>
    </a>

    `
  }
}