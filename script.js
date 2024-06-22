document.addEventListener("DOMContentLoaded", function(){
    let btn3 = document.getElementById("hotkey");
    let status = chrome.storage.local.get("status", function(result){
        if (result.status){
            btn3.innerText = "ShortCut: Ctrl+Alt (status:on)";
            btn3.onclick=turnOff;
        }else {
            btn3.innerText = "ShortCut: Ctrl+Alt (status:off)";
            btn3.onclick=turnOn;
        }
    })
})

function textProcess(rawText){
    var output=rawText.replaceAll(/[\n\r]+/g, " ");
    output=output.replaceAll("  "," ");
    return output;
}

//in pair with write
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
        throwError("Unable to access to clipboard")
      } else if(e .name === "NotFoundError"){
        throwError("No text in clipboard.")
      }
    } 
}

async function writeToClipboard(textString){
    throwError("");//empty the warning so less annoying
    await navigator.clipboard.writeText(textString);
}

//display msg on the extension page
const errorMsg=document.querySelector("#log");
function throwError(text){
    console.log("error");
    errorMsg.innerText = `${text}`;
}


//btn 1
document.getElementById("from-web").addEventListener("click", function() {
    var rawTextValue = document.getElementById("rawText").value;
    document.getElementById("rawText").value=textProcess(rawTextValue);
});
//btn 2
document.getElementById("from-clipboard").addEventListener("click", function() {
        readClipBoard();    
});

//btn 3
const btn3 =document.getElementById("hotkey")

//in pair with turn off, switch button and change status in bg
function turnOn(){
    chrome.runtime.sendMessage({message: "Enabled"});
    btn3.innerText = "ShortCut: Ctrl+Alt (status:on)";
    chrome.storage.local.set({status: true});
    btn3.onclick = turnOff;
}

function turnOff(){
    chrome.runtime.sendMessage({message: "Disabled"});
    btn3.innerText = "ShortCut: Ctrl+Alt (status:off)";
    chrome.storage.local.set({status: false});
    btn3.onclick = turnOn;
}




