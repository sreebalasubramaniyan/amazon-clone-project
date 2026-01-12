// Cart Container
import {Cart} from '../data/product-details'; // import the var Cart from the file product-details and ../ means go out from the folder
const add_to_cart_buttons = document.querySelectorAll(".js-addto-button");
add_to_cart_buttons.forEach((button)=>{
    button.addEventListener("click",()=>{
        /* adding a data-"your text" attribute to the button we can acces the dataset from js
            dataset tells the all the data-"" attribute that have been added in the button element

            inside element : data-product-name
            inside js : productName
        */
        Pname = button.dataset.productName
        let found = false;
        let found_obj = null;
        Cart.forEach((p)=>{
            if(p.ProductName===Pname) {
                found = true;
                found_obj = p;
            }
        })
        if(found){
            found_obj.quantity += 1;
        }
        else{
            Cart.push({
                ProductName:Pname,
                quantity : 1
            })
        }
        const cart_quantity = document.querySelector(".cart-quantity");
        old = Number(cart_quantity.innerText);
        cart_quantity.innerText = old+1;
    })
})