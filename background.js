function badgeDisplay(message,actionResult){

    let color;
    let text;
    if (actionResult){
        color = "#46f05f";
        text= "OK!";
    } else {
        color = "#d10d0d";
        text = "ERR!"
    }
    chrome.action.setBadgeText({ text: text });
    chrome.action.setBadgeBackgroundColor({ color: color});
    chrome.action.setTitle({title:message});
    badgeRemove(3000);
}

function badgeRemove(time){
    setTimeout(() => {
        chrome.action.setBadgeText({ text: '' });
    }, time);
}

chrome.runtime.onMessage.addListener(function (request) {
    //handeling hotkey
    if (request.message === 'Disabled') {
        turnOff();
    } else  if (request.message === "Enabled"){
        createOffscreen();
    } else if (request.feedback === "NotStringError"){
        badgeDisplay("No text in clipboard",false);
    } else if (request.feedback === "complete"){
        badgeDisplay("Done!",true);
    } else {
        badgeDisplay("Error:"+request.feedback,false);
    }

})

async function createOffscreen() {
    const offscreenUrl = 'offscreen.html';
    try {
        await chrome.offscreen.createDocument({
            url: offscreenUrl,
            reasons: ['CLIPBOARD'],
            justification: 'Handle clipboard processing in the background'
        });
    } catch (e) {//ignore the error when already created
        return true;
    }
}

function turnOff() {//close the offscreen document
    chrome.runtime.sendMessage({ message: "turnOff" });
}

//when command receive
chrome.commands.onCommand.addListener(function (command) {
    if (chrome.storage.session.get("status")) {// if the hot key is enabled
        if (command === "process") {
            console.log("command reveive");
            chrome.runtime.sendMessage({ message: "process" });
            console.log('sent process');
        }
    }
});