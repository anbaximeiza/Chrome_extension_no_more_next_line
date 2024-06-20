function textProcess(rawText){
    var output=rawText.replaceAll(/[\n\r]+/g, " ");
    console.log(output);
    return output;
}

function readClipBoard(){
    try {
        let rawText= readText();
        writeToClipboard(textProcess(rawText));
    } catch (e) {
      if (e instanceof NotAllowedError){
        throwError("Unable to access to clipboard, click allow on the top right to access.")
      } else if(e instanceof NotFoundError){
        throwError("No text in clipboard.")
      }
    } 
}

function throwError(errorMsg){
    errorMsg.innerText = `Error: ${text}`;
}

function writeToClipboard(textString){

}

document.getElementById("from-web").addEventListener("click", function() {
    var rawTextValue = document.getElementById("rawText").value;
    textProcess(rawTextValue);
});

let errorMsg=document.querySelector("#log")



