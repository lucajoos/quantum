(() => {
    let re = () => {
        emit('share-stop');
        back();
    };

    state.once('ready', () => {
        document.querySelector('.-back').addEventListener('click', () => {
            re();
        });

        document.querySelector('.cancel').addEventListener('click', () => {
            re();
        });

        document.querySelector('.close').addEventListener('click', () => {
            window.close();
        });

        emit('share', localStorage.getItem('quantum-theme') !== null ? localStorage.getItem('quantum-theme') : 'true');
    })
})();