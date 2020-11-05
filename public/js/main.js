let state = onceupon();
let render;
let scripts = [];
let previousScripts = [];
let last = '';

let emit = (type, data) => {
    chrome.runtime.sendMessage({from: 'popup', type: type, data: data}, () => {});
}

let message = (from, type, callback) => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if(request.from === from && request.type === type) {
            callback(request.data, sender);
        }
    });
}

let fetch = (file, method) => {
    if(typeof file === 'string') {
        let request = new XMLHttpRequest();
        let events = onceupon();

        request.addEventListener('readystatechange', () => {
            if(request.readyState === 4 && request.status === 200) {
                events.fire('data', request.responseText);
            }
        });

        request.open(typeof method === 'string' ? method : 'GET', file);
        request.send();

        return {
            on: events.on,
            once: events.once
        };
    } else {
        throw new Error('Quantum: Invalid type of file parameter');
    }
}

let script = file => {
    let element = document.createElement('script');

    element.setAttribute('src', file)
    scripts.push(element);

    document.head.appendChild(element);
};

let show = (file, method) => {
    scripts.forEach(currentScript => {
        currentScript.remove();
    });

    let events = onceupon();

    try {
        fetch(file, method).once('data', data => {
            last = render.getAttribute('render');
            previousScripts = [...scripts];

            scripts = [];

            render.innerHTML = data;
            render.setAttribute('render', file);

            events.fire('done', true);
        });
    } catch(e) {
        console.error(e);
    }

    return {
        on: events.on,
        once: events.once
    }
}

let back = method => {
    if(last.length > 0) {
        let pageScripts = [...previousScripts];

        return show(last, method).once('done', () => {
            pageScripts.forEach(currentScript => {
                script(currentScript.getAttribute('src'))
            });
        })
    } else {
        throw new Error(`Quantum: Can't go back`)
    }
}

window.addEventListener('load', () => {
    render = document.querySelector('.render');

    if(!render) {
        render = document.createElement('div');
        render.classList.add('render');
        document.body.appendChild(render);
    }

    state.fire('ready');
});

state.once('ready', () => {
    try {
        show('pages/index.html').once('done', () => {
            script('js/pages/index.js');
        });
    } catch(e) {
        console.error(e);
    }
})