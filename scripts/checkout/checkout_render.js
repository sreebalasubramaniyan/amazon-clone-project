import {Cart} from "../../data/cart.js";
import {products} from "../../data/products.js";
const checkout_items = document.querySelector(".checkout-text");
const order_summary = document.querySelector(".order-summary")
const payment_summary = document.querySelector(".payment-summary");

function findProduct(id){
    let res;
    for(let p of products){
        if(p.id===id)
            return p
    }
}
for(let i=0;i<3;i++){
    let obj = {
        productId:products[i].id, 
        quantity : 1
    }
    Cart.push(obj)
}

function renderPaymentSummary(){
    let payment_summary_html = `
                <div class="ps-title">Order Summary</div>
                <div class="ps-row">
                    <div class="items-text">Items (1):</div>
                    <div class="items_rate">$10.99</div>
                </div>

                <div class="ps-row">
                    <div class="shiping">Shipping & handling:</div>
                    <div class="ship_rate">$0.00</div>
                </div>

                <div class="ps-row">
                    <div class="tax1">Total before tax:</div>
                    <div class="tax1_rate">$10.99</div>
                </div>

                <div class="ps-row">
                    <div class="tax2">Estimated tax(10%):</div>
                    <div class="tax2_rate">$1.09</div>
                </div>

                <div class="ps-row">
                    <div class="order_total">Order total:</div>
                    <div class="total_rate">$11.99</div>
                </div>

                <button class="place-order">Place your order</button>
            `
payment_summary.innerHTML = payment_summary_html;
}
renderPaymentSummary()
function renderOrderSummaery(){
    let order_summary_html = ""
    for (let i=0;i<Cart.length;i++){
            let product = findProduct(Cart[i].productId);
            order_summary_html += `
            <div class="product-summary">
                    <div class="delivery_date">Delivery date: Friday, January 23</div>
                    <div class="details-grid">
                        <div class="image-section">
                            <img src="${product.image}" alt="">
                        </div>
                        <div class="details">
                            <div class="details-section">
                                <div class="name">${product.name}</div>
                                <div class="price">$${((product.priceCents)/100).toFixed(2)}</div>
                                <div class="q_u_b">
                                    <div class="quantity">Quantity: ${Cart[i].quantity}</div>
                                    <button class="update">Update</button>
                                    <button class="delete">Delete</button>
                                </div>
                            </div>
                        </div>

                        <div class="delivery-options">
                            <div class="title">Choose a delivery option</div>
                            <div class="option">
                                <input type="radio">
                                <div class="date_type">
                                    <div class="date">Friday, January 23</div>
                                    <div class="type">FREE Shipping</div>
                                </div>
                            </div>
                            <div class="option">
                                <input type="radio">
                                <div class="date_type">
                                    <div class="date">Friday, January 23</div>
                                    <div class="type">FREE Shipping</div>
                                </div>
                            </div>
                            <div class="option">
                                <input type="radio">
                                <div class="date_type">
                                    <div class="date">Friday, January 23</div>
                                    <div class="type">FREE Shipping</div>
                                </div>
                            </div>
                        </div>

                    </div>
            </div>`
    }
    if(order_summary_html===""){
        order_summary_html = `
        <div>Your cart is empty.</div>
        <a href="amazon.html"><button class="empty-button">view products</button></a>
        `
    }
    order_summary.innerHTML = order_summary_html;
}
renderOrderSummaery()
