state.once('ready', () => {
    document.querySelector('.-back').addEventListener('click', () => {
        emit('share-stop');
        back();
    });

    document.querySelector('.close').addEventListener('click', () => {
        window.close();
    });

    emit('share');
})