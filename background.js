let emit = (type, data) => {
    chrome.tabs.query({ active: true }, (tabs) => {
        console.log(tabs)
        tabs.forEach(tab => {
            try {
                chrome.tabs.sendMessage(tab.id, {from: 'background', type: type, data: data}, () => {});
            } catch(e) {
                console.log(e);
            }
        });
    });

    chrome.runtime.sendMessage({from: 'background', type: type, data: data}, () => {});
}

let message = (from, type, callback) => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if(request.from === from && request.type === type) {
            callback(request.data, sender);
        }
    });
}

message('popup', 'share', () => {
    emit('share');
})

message('popup', 'share-stop', () => {
    emit('share-stop');
})

message('content', 'share-done', data => {
    chrome.tabs.create({ url: chrome.extension.getURL(`preview/index.html?${Object.entries(data).map(e => e.join('=')).join('&')}`)});
});