const addItemBtnE = document.querySelector("header .btn");
const cartBadgeE = document.querySelector(".nav-items .badge");

addItemBtnE.onclick = async function (event) {
    const pid = addItemBtnE.dataset.pid;
    let response;
    try {
        response = await fetch("/cart/add-item", {
            method: "POST",
            body: JSON.stringify({
                pid: pid
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (e) {
        alert("Something went wrong with fetch!");
        console.log(e)
        return;
    }

    if (!response.ok) {
        alert("Something went wrong!");
        return;
    }

    const responseData = await response.json();

    const newTotalQuantity = responseData.newTotal;
    cartBadgeE.textContent = newTotalQuantity;
}
