import {Cart,saveCart} from "../../data/cart.js";
import {products} from "../../data/products.js";
import { calculatePaymentSummary } from "./checkout_calculate.js";

import {day1,day2,day3,deliveryOption} from "../../data/delivery_date.js";
const checkout_items = document.querySelector(".checkout-text");
const order_summary = document.querySelector(".order-summary")
const payment_summary = document.querySelector(".payment-summary");
function renderCheckoutLogo(){
    let total_products = 0;
    for(let p of Cart) total_products += p.quantity;
    if(document.querySelector(".checkout-number")){
        document.querySelector(".checkout-number").innerText = total_products + " items";
    }
}
renderCheckoutLogo();


export function findProduct(id){
    let res;
    for(let p of products){
        if(p.id===id)
            return p
    }
}
function findProductCart(id){
    let found;
    for(let p of Cart){
        if(p.productId===id) found = p;
    }
    return found;
}

console.log(Cart)
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
if(payment_summary){
    payment_summary.innerHTML = payment_summary_html;
}
}
renderPaymentSummary();

function renderOrderSummary(){
    let order_summary_html = ""
    for (let i=0;i<Cart.length;i++){
            let product = findProduct(Cart[i].productId);
            order_summary_html += `
            <div class="product-summary" id ="${product.id}">
                    <div class="delivery_date">Delivery date: ${day1}</div>
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
                                    <button id = ${product.id} class="update">Update</button>
                                    <button id="${product.id}"class="delete">Delete</button>
                                </div>
                            </div>
                        </div>

                        <div class="delivery-options">
                            <div class="title">Choose a delivery option</div>
                            <div class="option">
                                <input type="radio" name="${"opt:"+product.id}" value="1" id=${product.id} checked>
                                <div class="date_type">
                                    <div class="date">${day1}</div>
                                    <div class="type">FREE Shipping</div>
                                </div>
                            </div>
                            <div class="option">
                                <input type="radio" name="${"opt:"+product.id}" value="2" id=${product.id}>
                                <div class="date_type">
                                    <div class="date">${day2}</div>
                                    <div class="type">$4.99 - Shipping</div>
                                </div>
                            </div>
                            <div class="option">
                                <input type="radio" name="${"opt:"+product.id}" value="3" id=${product.id}>
                                <div class="date_type">
                                    <div class="date">${day3}</div>
                                    <div class="type">$9.99 - Shipping</div>
                                </div>
                            </div>
                        </div>

                    </div>
            </div>`
    }
    if(order_summary_html===""){
        order_summary_html = `
        <div>Your cart is empty.</div>
        <a href="index.html"><button class="empty-button">view products</button></a>
        `
    }
    if(order_summary)order_summary.innerHTML = order_summary_html;
}
renderOrderSummary();
calculatePaymentSummary();

// for live change of delivery date on the top of ordersummary
function changeDeliveryDate(e){
    let id = (e.target.id);
    let value = Number(e.target.value)
    let found = findProductCart(id);
    found.delivery_type = value;
    let date = deliveryOption[Number(e.target.value)-1].date
    console.log(document.getElementById(`${id}`))
    document.getElementById(`${id}`).querySelector(".delivery_date").innerText = "Delivery date: "+date;
    console.log(Cart)
}
document.querySelector(".order-summary").addEventListener("change",(e)=>{
    changeDeliveryDate(e);
    calculatePaymentSummary();
})

function removeFromCart(e){
    console.log(e.target.id)
    let found = findProductCart(e.target.id);
    let idx = Cart.indexOf(found)
    console.log(found,Cart,idx)
    Cart.splice(idx,1);
    console.log(Cart);
}
document.querySelector(".order-summary").addEventListener("click",(e)=>{
        if(e.target.className==="delete"){
            removeFromCart(e);
            saveCart();
            renderOrderSummary();
            renderCheckoutLogo();
            calculatePaymentSummary();
        }

        else if(e.target.className==="update"){
            let found = findProductCart(e.target.id);
        }
})

document.querySelector(".place-order").addEventListener("click",(e)=>{
    if(Cart && Cart.length>0){
        console.log(e)
        window.location.href = "order.html";
        
    }
})
