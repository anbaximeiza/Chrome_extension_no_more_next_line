function textProcess(rawText){
    var output=rawText.replaceAll(/[\n\r]+/g, " ");
    console.log(output);
    return output;
}

async function readClipBoard(){
    try {
        let rawText= await navigator.clipboard.readText();
        if (!rawText){
            throwError("No text in clipboard.");
            return;
        }
        writeToClipboard(textProcess(rawText));
    } catch (e) {
      if (e instanceof DOMException){
        throwError("Unable to access to clipboard, click allow on the top right to access.")
      } else if(e .name === "NotFoundError"){
        throwError("No text in clipboard.")
      }
    } 
}


const errorMsg=document.querySelector("#log");
function throwError(text){
    console.log("error");
    errorMsg.innerText = `Error: ${text}`;
}

function writeToClipboard(textString){

}

document.getElementById("from-web").addEventListener("click", function() {
    var rawTextValue = document.getElementById("rawText").value;
    textProcess(rawTextValue);
});

document.getElementById("from-clipboard").addEventListener("click", function() {
    readClipBoard();
});




