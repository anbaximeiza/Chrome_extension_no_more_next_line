textOn="HotKey: Alt+Z (status: On)";
textOff="HotKey: Alt+Z (status: Off)";

document.addEventListener("DOMContentLoaded", function(){
    let btn3 = document.getElementById("hotkey");
    let status = chrome.storage.session.get("status", function(result){
        if (result.status){
            btn3.innerText = textOn;
            btn3.onclick=turnOff;
        }else {
            btn3.innerText = textOff;
            btn3.onclick=turnOn;
        }
    })

    let checkB = document.getElementById("keepInput");
    let keepStatus = chrome.storage.session.get("keepStatus", function(result){
        if (result.keepStatus){
            let rawText=document.getElementById("rawText");
            checkB.checked = true;
            tempText=chrome.storage.session.get("tempText", function(result){
                if (result.tempText){
                    rawText.value= result.tempText;
                }   
            })
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

const rawText=document.getElementById("rawText");

//btn 1
document.getElementById("from-web").addEventListener("click", function() {
    rawText.value=textProcess(rawText.value);
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
    btn3.innerText = textOn;
    chrome.storage.session.set({status: true});
    btn3.onclick = turnOff;
}

function turnOff(){
    chrome.runtime.sendMessage({message: "Disabled"});
    btn3.innerText = textOff;
    chrome.storage.session.set({status: false});
    btn3.onclick = turnOn;
}

//top right check box
const checkB = document.getElementById("keepInput");
checkB.addEventListener("change", switchCheck)

function switchCheck(){
    if (checkB.checked){
        rawText.addEventListener("change",textStore);
        chrome.storage.session.set({keepStatus:true});
        chrome.storage.session.set({tempText:""})
    } else{
        rawText.removeEventListener("change",textStore)
        chrome.storage.session.set({keepStatus:false});
    }
}

function textStore(){
    chrome.storage.session.set({tempText:rawText.value})
}


   



