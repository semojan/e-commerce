const deletePBtnEs = document.querySelectorAll(".deleteBtn");

async function removeP(event){
    const buttonE = event.target;
    const pid = buttonE.dataset.pid;

    const response = await fetch("/admin/product/" + pid, {
        method: "delete"
    });

    if(!response.ok){
        alert("something went wrong!");
        return;
    }

    buttonE.parentElement.parentElement.parentElement.remove();
}

for (const deletePBtnE of deletePBtnEs){
    deletePBtnE.addEventListener("click", removeP);
}