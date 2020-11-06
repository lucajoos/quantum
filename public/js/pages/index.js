(() => {
    let clicks = 0;
    let originalWidth;
    let originalHeight;

    state.once('ready', () => {
        document.querySelector('.index--sync').addEventListener('click', () => {
            show('pages/sync.html').once('done', () => {
                script('node_modules/qr-scanner/qr-scanner.umd.min.js');
                script('js/pages/sync.js');
            });
        });

        document.querySelector('.index--share').addEventListener('click', () => {
            show('pages/share.html').once('done', () => {
                script('js/pages/share.js');
            });
        });

        document.querySelector('.-settings').addEventListener('click', () => {
            show('pages/settings.html').once('done', () => {
                script('js/pages/settings.js');
            });
        });

        document.querySelector('.icon').addEventListener('click', () => {
            originalWidth = window.innerWidth;
            originalHeight = window.innerHeight;

            clicks++;

            switch(clicks) {
                case 1:
                    document.querySelector('.icon').classList.add('-big');
                    break;
                case 2:
                    document.querySelector('.icon').classList.remove('-big');
                    document.querySelector('.icon').classList.add('-bigger');
                    break;
                case 3:
                    document.querySelector('.icon').classList.remove('-bigger');
                    document.querySelector('.icon').classList.add('-explosion');

                    setTimeout(() => {
                        new ConfettiGenerator({"target":"canvas","max":"85","size":"1","animate":true,"props":["circle","square","line"],"colors":[[239,71,111],[71,117,245],[5,176,130],[255,209,102]],"clock":"45","rotate":true,"width":originalWidth,"height":originalHeight,"start_from_edge":true,"respawn":false}).render();

                        setTimeout(() => {
                            document.querySelector('.icon').classList.remove('-explosion');
                        }, 1000);

                        clicks = 0;
                    }, 200)
            }
        })
    });
})();