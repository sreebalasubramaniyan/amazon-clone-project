import {Cart} from "../../data/cart.js";
import {products} from "../../data/products.js";
const checkout_items = document.querySelector(".checkout-text");
const order_summary = document.querySelector(".order-summary")
const payment_summary = document.querySelector(".payment-summary");
const today = dayjs()
const day1 = today.add(7,'day').format('dddd, MMMM D');
const day2 = today.add(3,'day').format('dddd, MMMM D');
const day3 = today.add(1,'day').format('dddd, MMMM D');

const deliveryOption = [
    {date:day1,cost:0},
    {date:day2,cost:4.99},
    {date:day3,cost:9.99}
]
console.log(dayjs())
function findProduct(id){
    let res;
    for(let p of products){
        if(p.id===id)
            return p
    }
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
payment_summary.innerHTML = payment_summary_html;
}
renderPaymentSummary()

function renderOrderSummaery(){
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
                                    <button class="update">Update</button>
                                    <button class="delete">Delete</button>
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
        <a href="amazon.html"><button class="empty-button">view products</button></a>
        `
    }
    order_summary.innerHTML = order_summary_html;
}
renderOrderSummaery()

document.querySelector(".order-summary").addEventListener("change",(e)=>{
    let id = (e.target.id);
    let value = Number(e.target.value)
    let found;
    for(let p of Cart){
        if(p.productId==id) found = p;
    }
    found.delivery_type = value;
    let date = deliveryOption[Number(e.target.value)-1].date
    console.log(document.getElementById(`${id}`))
    document.getElementById(`${id}`).querySelector(".delivery_date").innerText = "Delivery date: "+date;
    console.log(Cart)
})
