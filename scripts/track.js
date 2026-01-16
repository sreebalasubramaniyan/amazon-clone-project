import { getOrders } from "./order.js";

// Get order ID from URL parameters
function getOrderIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('orderId');
}

// Find order by ID
function findOrderById(orderId) {
  const orders = getOrders();
  return orders.find(order => order.orderId === orderId);
}

// Calculate delivery progress (0-100%)
function calculateProgress() {
  const stages = ['Preparing', 'Shipped', 'Delivered'];
  const currentStage = Math.floor(Math.random() * 3); // Random stage for demo
  return {
    currentStage: currentStage,
    percentage: ((currentStage + 1) / stages.length) * 100
  };
}

// Generate tracking HTML
function generateTrackingHTML() {
  const orderId = getOrderIdFromURL();
  const order = findOrderById(orderId);

  if (!order) {
    return `
      <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="checkout.html">
          View all orders
        </a>
        <div class="product-info">Order not found</div>
      </div>
    `;
  }

  const firstItem = order.items[0];
  const progress = calculateProgress();
  const stages = ['Preparing', 'Shipped', 'Delivered'];

  let trackingHTML = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="checkout.html">
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
  `;

  // Generate progress labels
  stages.forEach((stage, index) => {
    const isCurrentStage = index === progress.currentStage ? 'current-status' : '';
    trackingHTML += `
      <div class="progress-label ${isCurrentStage}">
        ${stage}
      </div>
    `;
  });

  trackingHTML += `
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${progress.percentage}%"></div>
      </div>
    </div>
  `;

  return trackingHTML;
}

// Render tracking page
document.addEventListener('DOMContentLoaded', () => {
  const mainContainer = document.querySelector('.main');
  
  if(mainContainer) {
    mainContainer.innerHTML = generateTrackingHTML();
  }
});