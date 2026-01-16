import {Cart,saveCart} from "../../data/cart.js";
import {deliveryOption,findProduct} from "./checkout_render.js";
import { products } from "../../data/products.js";
export function calculatePaymentSummary(){
    let items = 0;
    let total_price = 0;
    let shipping = 0;
    let total_before_tax = 0;
    let estimated_tax = 0;
    let total = 0;

    for(let p of Cart){
        items += p.quantity;
        let Product_price = p.quantity * ((findProduct(p.productId).priceCents)/100)
        total_price += Product_price;
        shipping += (deliveryOption[Number(p.delivery_type-1)].cost)
    }
    total_before_tax = total_price + shipping
    estimated_tax = total_before_tax*0.10
    total = total_before_tax + estimated_tax


    total_price = total_price.toFixed(2)
    shipping = shipping.toFixed(2)
    total_before_tax = total_before_tax.toFixed(2)
    estimated_tax = estimated_tax.toFixed(2)
    let grand=total;
    total = total.toFixed(2)

    const paymentSummary = document.querySelector(".payment-summary");
    paymentSummary.querySelector(".items-text").innerText = `Items(${items})`;
    paymentSummary.querySelector(".items_rate").innerText = `$${total_price}`
    paymentSummary.querySelector(".ship_rate").innerText = `$${shipping}`
    paymentSummary.querySelector(".tax1_rate").innerText = `$${total_before_tax}`
    paymentSummary.querySelector(".tax2_rate").innerText = `$${estimated_tax}`
    paymentSummary.querySelector(".total_rate").innerText = `$${total}`
    console.log(grand)
    if(grand==0){
    paymentSummary.querySelector(".place-order").style.opacity = 0.6;
    }
} 

