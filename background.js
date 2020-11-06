let emit = (type, data) => {
    chrome.tabs.query({ active: true }, (tabs) => {
        tabs.forEach(tab => {
            try {
                chrome.tabs.sendMessage(tab.id, {from: 'background', type: type, data: data}, () => {});
            } catch(e) {
                console.log(e);
            }
        });
    });

    try {
        chrome.runtime.sendMessage({from: 'background', type: type, data: data}, () => {});
    } catch(e) {
        console.log(e)
    }
}

let message = (from, type, callback) => {
    try {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if(request.from === from && request.type === type) {
                callback(request.data, sender);
            }
        });
    } catch(e) {
        console.log(e)
    }
}

message('popup', 'share', theme => {
    emit('share', theme);
})

message('popup', 'share-stop', () => {
    emit('share-stop');
})

message('content', 'share-done', data => {
    chrome.tabs.create({ url: chrome.extension.getURL(`preview/index.html?${Object.entries(data).map(e => e.join('=')).join('&')}`)});
});