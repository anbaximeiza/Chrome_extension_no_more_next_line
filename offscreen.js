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
    textArea.select();
    console.log("I paste")
    document.execCommand("paste");
    if (typeof textArea.value != 'string'){
        //do sth maybe??
        return;
    }
    let output=textArea.value.replaceAll(/[\n\r]+/g, " ");
    textArea.value=output.replaceAll("  "," ");
    textArea.select();
    document.execCommand('copy');
}