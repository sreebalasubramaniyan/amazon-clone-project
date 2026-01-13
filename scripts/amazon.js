 // import the var Cart from the file product-details and ../ means go out from the folder
import {products} from '../data/products.js';
import {Cart} from '../data/cart.js'
const miss = (x)=>{if(x==40 || 50) return 45;
    else return x;
}
let product_html = ''
for(let product of products){
    product_html += (`<div class="container"> 
            <div class="image-section">
                <img src="${product.image}" alt="" class="product-image">
            </div>
            <div class="details-section limit-text-to-2-lines">
                ${product.name}
            </div>
            <div class="rating-section">
                <img src="https://supersimple.dev/projects/amazon/images/ratings/rating-${miss(product.rating.stars*10)}.png" alt="" class="rating-image">
                <div class="rating-number">${product.rating.count}</div>
            </div>
            <div class="price">$${product.priceCents.toFixed(2)}</div>
            <div class="quantity-d
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                </select>
            </div>
            <div class="addto-cart-section">
                <button data-product-name = "${product.name}"data-product-id="${product.id}" class="addto-cart-button js-addto-button">Add to Cart</button>
            </div>
        </div>
`)
}
// console.log(product_html)
const grid = document.querySelector(".grid");
grid.innerHTML = product_html;

// cart function
function addToCart(button){
    let PId = button.dataset.productId
        let found = false;
        let found_obj = null;
        Cart.forEach((p)=>{
            if(p.productId===PId) {
                found = true;
                found_obj = p;
            }
        })
        if(found){
            found_obj.quantity += 1;
        }
        else{
            Cart.push({
                productId:PId,
                quantity : 1
            })
        }
        const cart_quantity = document.querySelector(".cart-quantity");
        let old = Number(cart_quantity.innerText);
        cart_quantity.innerText = old+1;
}
const add_to_cart_buttons = document.querySelectorAll(".js-addto-button");
add_to_cart_buttons.forEach((button)=>{
    button.addEventListener("click",()=>{
        /* adding a data-"your text" attribute to the button we can acces the dataset from js
            dataset tells the all the data-"" attribute that have been added in the button element

            inside element : data-product-name
            inside js : productName
        */
       addToCart(button);
       console.log(Cart);
    })
})