const cartBadgeEs = document.querySelectorAll(".nav-items .badge");
const updateItemFormEs = document.querySelectorAll(".item-management");
const cartTotalPriceE = document.getElementById("totalP");

async function updateItem(event){
    event.preventDefault();
    const form = event.target;
    const pid = form.dataset.pid;
    const newQuantity = form.firstElementChild.value;
    let response;

    try {
        response = await fetch("/cart/update", {
            method: "PATCH",
            body: JSON.stringify({
                pid: pid,
                newQuantity: newQuantity
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch(e){
        alert("something went wrong IN FIRST STEPS!");
        console.log(e);
        return;
    }

    if(!response.ok){
        alert("Something went wrong!");
        return;
    }

    const responseData = await response.json();

    if(responseData.updatedData.updateItemPrice === 0){
        form.parentElement.parentElement.remove();
    } else{
        const cartItemTotalPriceE = form.parentElement.querySelector(".item-price");
        cartItemTotalPriceE.textContent = responseData.updatedData.updatedItemPrice.toFixed(2);
    }

    cartTotalPriceE.textContent = responseData.updatedData.newTotalPrice.toFixed(2);

    for(cartBadgeE of cartBadgeEs){
        cartBadgeE.textContent = responseData.updatedData.newTotalQuantity;
    }
}

for (updateItemFormE of updateItemFormEs){
    updateItemFormE.addEventListener("submit", updateItem);
}