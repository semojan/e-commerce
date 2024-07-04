const previewE = document.querySelector("#imageInput img");
const inputE = document.querySelector("#imageInput input");

inputE.onchange = function(){
    const files = inputE.files;
    console.log(files)


    if(!files || files.legth === 0){
        previewE.style.display = "none";
        return;
    }

    previewE.src = URL.createObjectURL(files[0]);
    previewE.style.display = "block";
}