(() => {
    let emit = (type, data) => {
        chrome.runtime.sendMessage({from: 'content', type: type, data: data}, () => {});
    }

    let message = (from, type, callback) => {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if(request.from === from && request.type === type) {
                callback(request.data, sender);
            }
        });
    }

    let current;
    let currentStyle = '';
    let active = false;
    let style = '';
    let params = new URL(window.location.href).searchParams;

    let reset = () => {
        active = false;
        document.body.setAttribute('style', style);

        if(current) {
            current.setAttribute('style', currentStyle);
        }
    }

    message('background', 'share', () => {
        active = true;
    });

    message('background', 'share-stop', () => {
        reset();
    });

    window.addEventListener('load', () => {
        style = document.body.getAttribute('style') === null ? '' : document.body.getAttribute('style');
        document.body.setAttribute('style', `${style} cursor: pointer !important;`);

        if(params.get('quantum') === 'true') {
            window.history.replaceState({}, document.title, window.location.pathname);

            if(params.get('f') !== null && params.get('i') !== null) {
                let element = document.querySelectorAll(params.get('f').replace('[ID]', '#'))[params.get('i')];
                let elementStyle = element.getAttribute('style') === null ? '' : element.getAttribute('style');

                element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                setTimeout(() => {
                    element.setAttribute('style', `${elementStyle} transition: all 1s; background: #222e3e !important; color: #f0f6ff !important;`);

                    setTimeout(() => {
                        element.setAttribute('style', `${elementStyle} transition: all 1s;`);

                        setTimeout(() => {
                            element.setAttribute('style', element);
                        }, 1000);
                    }, 1000);
                }, 500)
            }
        }

        window.addEventListener('mousemove', event => {
            if(active) {
                if(current) {
                    current.setAttribute('style', currentStyle);
                }

                current = document.elementFromPoint(event.clientX, event.clientY);
                currentStyle = current.getAttribute('style') === null ? '' : current.getAttribute('style');


                current.setAttribute('style', `${currentStyle} background: #222e3e !important; color: #f0f6ff !important;`)
            }
        });

        window.addEventListener('click', () =>  {
            reset();

            let finder;
            let index;

            if(current.id) {
                finder = `[ID]${current.id}`;
                index = 0;
            } else if(current.classList.length > 0) {
                finder = `.${[...current.classList].join('.')}`;

                [...document.querySelectorAll(finder)].forEach((currentElement, currentIndex) => {
                    if(currentElement === current) {
                        index = currentIndex;
                    }
                });
            } else {
                finder = current.tagName.toLowerCase();

                [...document.querySelectorAll(finder)].forEach((currentElement, currentIndex) => {
                    if(currentElement === current) {
                        index = currentIndex;
                    }
                });
            }

            emit('share-done', {
                finder: finder,
                index: index,
                href: window.location.href
            })
        });
    })
})();