import {Cart, saveCart} from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOption } from "../data/delivery_date.js";
import { Orders,saveOrders} from "../data/orders_data.js";
//import { renderTrack } from "./track.js";

function generateId() {
return crypto.randomUUID();
}
function findProduct(id) {
  for(let p of products) {
    if(id === p.id) return p;
  }
}
function findToday(){
  const today = new Date();
  function formatDate(date) {
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ];

    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  }
  return formatDate(today);
}
function findTotal(){
  let tot = 0;
  for (let p of Cart){
    let product = findProduct(p.productId);
    tot += p.quantity * (product.priceCents) / 100 
  }
  return tot.toFixed(2);
}
function createNewOrder(){
  let newOrder = {
        orderPlaced: "",
        total : "",
        orderId : "",
        products_ordered:[]
  };
  newOrder.orderPlaced = findToday()
  newOrder.total = findTotal();
  newOrder.orderId = generateId();
  for(let p of Cart){
    let product = findProduct(p.productId);
    let p_in_cart = {
      productName : product.name,
      productId : p.productId,
      productImage : product.image,
      productQuantity : p.quantity,
      arrivingDate : deliveryOption[p.delivery_type-1].date
    }
    newOrder.products_ordered.push(p_in_cart)
  }
  return newOrder;
}

function CreatePushNewOrder(){
  let newOrder = createNewOrder();
  Orders.push(newOrder);
  saveOrders();
  Cart.length = 0 ;
  saveCart();
}
if (Cart.length>=1) CreatePushNewOrder();

function generateProductHtml(product,orderId){
  let product_html = `
          <div class="product-image-container">
              <img src="${product.productImage}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.productName}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${product.arrivingDate}
              </div>
              <div class="product-quantity">
                Quantity: ${product.productQuantity}
              </div>
              
            </div>

            <div class="product-actions">
                
                <button id ="${(orderId+" "+product.productId)}"class="track-package-button button-secondary">
                  Track package
                </button>
                
            </div>`
  return product_html;
}
function generateOrderContainer(Order){
  let order_container = '<div class="order-container">'
  let order_header_html = `
        <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${Order.orderPlaced}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${Order.total}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${Order.orderId}</div>
            </div>
        </div>`
  let order_details = '<div class="order-details-grid">';
  Order.products_ordered.forEach((item)=>order_details+=generateProductHtml(item,Order.orderId)); 
  order_details += `
  </div>`
  order_container += order_header_html + order_details + `
  </div>`;
  return order_container;
}
function renderOrder(){
  const order_grid = document.querySelector(".orders-grid");
  let orders_html = "";
  let n = Orders.length;
  for(let i=n-1;i>=0;i--){
    let Order = Orders[i];
    orders_html += generateOrderContainer(Order);
  } 
  order_grid.innerHTML = orders_html;
}
if (Orders.length >= 1)renderOrder();


// track product

document.querySelector(".orders-grid").addEventListener("click",(e)=>{
  if(e.target.classList.contains("track-package-button")){
    const id = e.target.id;
    window.location.href = `tracking.html?id=${id}`;
    console.log(id)
  }
})

