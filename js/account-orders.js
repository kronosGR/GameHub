const header = document.querySelector("#header");
const ordersCon = document.querySelector("#orders");

const orders = getOrders();


if (orders.length<1){  
  header.innerHTML = "<h2>No orders found</h2>";
  header.style.height = "100px";
  header.style.textAlign = "center";
  header.style.padding = "30px";
} else {
  for (let order of orders){
    const dato = order["date"];
    const id = order["id"];
    const cart = order["cart"]
    let titles;
    
    for (let item of cart){
      console.log(item["game"])
      titles += item["game"]["title"];
      
    }
    ordersCon.innerHTML += titles;
  }
}