import { Orders,saveOrders } from "../data/orders_data.js";
import { daysBetween } from "../data/delivery_date.js";

function findProductFromOrders(Orderid){
  for (let p of Orders) if (p.orderId === Orderid) return p;
}
function findItemFromProducts(productId,order){
  for(let p of order.products_ordered) if (p.productId == productId) return p;
}
const params = new URLSearchParams(window.location.search);
const arr = params.get("id").split(" ");
console.log(arr[0]);
const order = findProductFromOrders(arr[0]);
const product = (findItemFromProducts(arr[1],order));
renderTrack(product);

function renderTrack(product){
  console.log(product);
  const html = `
        <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="order.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${product.arrivingDate}
        </div>

        <div class="product-info">
          ${product.productName}
        </div>

        <div class="product-info">
          Quantity: ${product.productQuantity}
        </div>

        <img class="product-image" src="${product.productImage}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
  `
  document.querySelector(".main").innerHTML = html;
  let rem_days = (daysBetween(product.arrivingDate));
  let status;
  console.log(rem_days)
  let progress = document.querySelector(".progress-bar")
  let container = document.querySelector(".progress-labels-container");
    if(rem_days < 0) {
      progress.style.cssText += "width:100%";
      container.lastElementChild.classList.add("current-status")
    }
    else if(rem_days>=1 && rem_days <=3){
      progress.style.cssText += "width:75%";
      container.firstElementChild.nextElementSibling.classList.add("current-status")
    }
    else {
      progress.style.cssText += "width:10%";
      container.firstElementChild.classList.add("current-status")
    }
}

