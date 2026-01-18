export let Orders = JSON.parse(localStorage.getItem("ordered_items"));
if(!Orders){
    Orders = []; 
}
export function saveOrders(){
    // localStorage only converts the string 
    // we need to conver the [] into string
    localStorage.setItem("ordered_items",JSON.stringify(Orders))
}