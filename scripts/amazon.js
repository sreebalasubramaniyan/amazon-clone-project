 // import the var Cart from the file product-details and ../ means go out from the folder
import {products} from '../data/products.js';
import {Cart, saveCart} from '../data/cart.js'
const miss = (x)=>{if(x==40 || 50) return 45;
    else return x;
}

function renderCartLogo(){
    let total_products = 0;
    for(let p of Cart) total_products += p.quantity;
    document.querySelector(".cart-quantity").innerText = total_products;
}
renderCartLogo();

// renderMain Grid
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
            <div class="price">$${(product.priceCents/100).toFixed(2)}</div>
            <div class="quantity">
                <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="added-showing-part">
                
            </div>
            <div class="addto-cart-section">
                <button data-product-name = "${product.name}"data-product-id="${product.id}" class="addto-cart-button js-addto-button">Add to Cart</button>
            </div>
        </div>
`)
}
const grid = document.querySelector(".grid");
grid.innerHTML = product_html;


function addToCart(button){
    const Parent = button.parentElement.parentElement;
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
                quantity : 1,
                delivery_type : 1
            })
        }
        // find out the quantity
        renderCartLogo();
        // showing the added element
        const added_show = Parent.querySelector(".added-showing-part");
        setTimeout(() => {
            added_show.innerHTML = ``;
        },2000);
        added_show.innerHTML = `<img src="https://supersimple.dev/projects/amazon/images/icons/checkmark.png"> Added`;
        saveCart();
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
    })
})

function match(input_text){
    let list_of_products = "";
    let input_arr = input_text.toLowerCase().split(" ");
    products.forEach((product)=>{
        let product_name_arr = product.name.toLowerCase();
        let inter_section = input_arr.filter(element => product_name_arr.includes(element) && element.length > 1);
        if(inter_section.length >= 1) list_of_products += `<div class="container"> 
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
            <div class="quantity">
                <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="added-showing-part">
                
            </div>
            <div class="addto-cart-section">
                <button data-product-name = "${product.name}"data-product-id="${product.id}" class="addto-cart-button js-addto-button">Add to Cart</button>
            </div>
        </div>
`;
    })
    return list_of_products;
}

const search_button = document.querySelector(".search-button")
search_button.addEventListener("click",()=>{
    const input_val = document.querySelector(".input-box").value.toLowerCase();
    if(input_val==="") return;
    let temp = match(input_val);
    let html; 
    if(temp === "") html = "No products matched your search.";
    else html = temp;
    grid.innerHTML = html;

})
// trigeer the search when the enter key is pressed
const input_val = document.querySelector(".input-box");
input_val.addEventListener("keydown",(event)=>{
    if(event.key === "Enter"){
        // Cancel the default action, if it is a form submission
        event.preventDefault();
        // Trigger the button element with a click
        search_button.click();
    }
})

