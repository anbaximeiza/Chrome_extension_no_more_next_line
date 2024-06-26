chrome.runtime.onMessage.addListener(function(request){
    if (request.message === 'turnOff'){
        console.log("close req")
        window.close;
    } else if (request.message === 'process'){
        console.log("process req")
        editByTextArea();
    }
});

const textArea = document.querySelector("#text");
async function editByTextArea(){
    try{
    textArea.select();
    console.log("I paste")
    document.execCommand("paste");
    if (textArea.value === ""){
        chrome.runtime.sendMessage({feedback:"NotStringError"});//send back to background
        return;
    }
    let output=textArea.value.replaceAll(/[\n\r]+/g, " ");
    textArea.value=output.replaceAll("  "," ");
    textArea.select();
    document.execCommand('copy');
    chrome.runtime.sendMessage({feedback:"complete"})
    } catch(e){
        chrome.runtime.sendMessage({feedback:e.message});//send the error to background to be displayed
    }
}