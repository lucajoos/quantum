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
});