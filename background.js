let HKstatus = 'dis';

chrome.runtime.onMessage.addListener(function (request) {
    //handeling hotkey
    if (request.message === 'Disabled') {
        HKstatus = 'dis';
        console.log(HKstatus)
        turnOff();
    } else {
        HKstatus = 'en';
        console.log(HKstatus)
        createOffscreen();
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
    if (HKstatus === "en") {
        if (command === "process") {
            console.log("command reveive");
            chrome.runtime.sendMessage({ message: "process" });
            console.log('sent process');
            
        }
    }
});