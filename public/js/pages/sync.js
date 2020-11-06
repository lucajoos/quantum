(() => {
    state.once('ready', () => {
        let banner = document.querySelector('.banner');
        document.querySelector('.-back').addEventListener('click', () => {
            back();
        });

        QrScanner.hasCamera().then(hasCamera => {
            if(hasCamera) {
                const qr = new QrScanner(document.querySelector('.video'), result => {
                    if(typeof chrome === 'undefined') {
                        window.location.href = result;
                    } else {
                        chrome.tabs.create({
                            url: result
                        });
                    }
                });

                qr.start();
            } else {
                if(banner.classList.contains('-hidden')) {
                    banner.classList.remove('-hidden');
                    document.querySelector('.video').remove();
                }

                banner.querySelector('.banner--dismiss').addEventListener('click', () => {
                    if(!banner.classList.contains('-hidden')) {
                        banner.classList.add('-hidden');

                        setTimeout(() => {
                            banner.classList.add('-out');
                        }, 500);
                    }
                })
            }
        })
    })
})();