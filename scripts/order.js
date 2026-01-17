import {Cart, saveCart} from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOption } from "../data/delivery_date.js";

function generateId() {
  return crypto.randomUUID();
}

function findProduct(id) {
  for(let p of products) {
    if(id === p.id) return p;
  }
}

// Find delivery option by ID
function findDeliveryOption(deliveryOptionId) {
  for(let option of deliveryOption) {
    if(option.id === deliveryOptionId) return option;
  }
}

// Local Storage Functions
export function getOrders() {
  const orders = localStorage.getItem('orders');
  return orders ? JSON.parse(orders) : [];
}

function saveOrders(orders) {
  localStorage.setItem('orders', JSON.stringify(orders));
}

// Calculate delivery date based on delivery type
function calculateDeliveryDate(deliveryOptionId) {
  const deliveryOpt = findDeliveryOption(deliveryOptionId);
  if(!deliveryOpt) return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  const daysToAdd = deliveryOpt.daysToDeliver;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);
  
  return deliveryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function createOrder(cartItems) {
  const orderDate = new Date();
  const order = {
    orderId: generateId(),
    orderDate: orderDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    orderDateTimestamp: orderDate.getTime(), // Store timestamp for tracking progress
    items: cartItems.map(cartItem => {
      const product = findProduct(cartItem.productId);
      return {
        productId: cartItem.productId,
        productName: product.name,
        productImage: product.image,
        quantity: cartItem.quantity,
        priceCents: product.priceCents,
        deliveryOptionId: cartItem.deliveryOptionId,
        deliveryDate: calculateDeliveryDate(cartItem.deliveryOptionId)
      };
    }),
    totalPrice: cartItems.reduce((sum, item) => {
      const product = findProduct(item.productId);
      return sum + (item.quantity * product.priceCents / 100);
    }, 0).toFixed(2)
  };
  return order;
}

function generateOrdersHTML() {
  const orders = getOrders();
  let ordersHTML = '';
  
  orders.forEach(order => {
    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${order.orderDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${order.totalPrice}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.orderId}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${order.items.map(item => `
            <div class="product-image-container">
              <img src="${item.productImage}" alt="${item.productName}">
            </div>
            <div class="product-details">
              <div class="product-name">${item.productName}</div>
              <div class="product-delivery-date">Arriving on: ${item.deliveryDate}</div>
              <div class="product-quantity">Quantity: ${item.quantity}</div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>
            <div class="product-actions">
              <a href="tracking.html?orderId=${order.orderId}">
                <button class="track-package-button button-secondary">Track package</button>
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });
  
  return ordersHTML;
}

// Render orders to the page
document.addEventListener('DOMContentLoaded', () => {
  const ordersGrid = document.querySelector('.orders-grid');
  
  if(ordersGrid) {
    // If cart has items, save as order and clear cart
    if(Cart.length > 0) {
      const newOrder = createOrder(Cart);
      const orders = getOrders();
      orders.push(newOrder);
      saveOrders(orders);
      
      // Clear cart after saving order
      Cart.length = 0;
      saveCart();
    }
    
    // Display all orders from localStorage
    ordersGrid.innerHTML = generateOrdersHTML();
  }
});