function textProcess(rawText){
    console.log("gagaga")
    var output=rawText.replaceAll(/[\n\r]+/g, " ");
    console.log(output);
}



document.getElementById("from-web").addEventListener("click", function() {
    var rawTextValue = document.getElementById("rawText").value;
    textProcess(rawTextValue);
});



