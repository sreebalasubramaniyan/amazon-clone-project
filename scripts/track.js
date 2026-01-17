import { getOrders } from "./order.js";

function getOrderIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('orderId');
}

function findOrderById(orderId) {
  const orders = getOrders();
  return orders.find(order => order.orderId === orderId);
}

function calculateProgress(orderDate, deliveryDate) {
  const stages = ['Preparing', 'Shipped', 'Delivered'];
  
  const order = new Date(orderDate);
  const delivery = new Date(deliveryDate);
  const today = new Date();
  
  order.setHours(0, 0, 0, 0);
  delivery.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const totalDays = Math.ceil((delivery - order) / (1000 * 60 * 60 * 24));
  const daysPassed = Math.ceil((today - order) / (1000 * 60 * 60 * 24));
  
  let currentStage = 0;
  let percentage = 0;
  
  if (daysPassed < 1) {
    currentStage = 0;
    percentage = 25;
  } else if (daysPassed < totalDays - 1) {
    currentStage = 1;
    percentage = 50;
  } else if (daysPassed < totalDays) {
    currentStage = 1;
    percentage = 75;
  } else {
    currentStage = 2;
    percentage = 100;
  }
  
  return { currentStage, percentage, daysPassed, totalDays };
}

function generateTrackingHTML() {
  const orderId = getOrderIdFromURL();
  const order = findOrderById(orderId);

  if (!order) {
    return `
      <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>
        <div class="product-info">Order not found</div>
      </div>
    `;
  }

  const firstItem = order.items[0];
  const progress = calculateProgress(order.orderDate, firstItem.deliveryDate);
  const stages = ['Preparing', 'Shipped', 'Delivered'];

  let trackingHTML = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${firstItem.deliveryDate}
      </div>

      <div class="product-info">
        ${firstItem.productName}
      </div>

      <div class="product-info">
        Quantity: ${firstItem.quantity}
      </div>

      <img class="product-image" src="${firstItem.productImage}" alt="${firstItem.productName}">

      <div class="progress-labels-container">
        ${stages.map((stage, index) => `
          <div class="progress-label ${index === progress.currentStage ? 'current-status' : ''}">
            ${stage}
          </div>
        `).join('')}
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${progress.percentage}%"></div>
      </div>
      
      <div class="tracking-info">
        <p>Days since order: ${progress.daysPassed} / ${progress.totalDays}</p>
        <p>Status: ${stages[progress.currentStage]}</p>
      </div>
    </div>
  `;

  return trackingHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  const mainContainer = document.querySelector('.main');
  if(mainContainer) {
    mainContainer.innerHTML = generateTrackingHTML();
  }
});