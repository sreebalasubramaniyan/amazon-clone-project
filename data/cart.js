import { products } from "./products.js";

// it can be accessed from outside files
// for export and import work we need to give type as module in script element
// Cart Container
export let Cart = JSON.parse(localStorage.getItem("cart_item"));
if(!Cart){
    Cart = []; 
}
export function saveCart(){
    // localStorage only converts the string 
    // we need to conver the [] into string
    localStorage.setItem("cart_item",JSON.stringify(Cart))
}