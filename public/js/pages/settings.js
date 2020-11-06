state.once('ready', () => {
    document.querySelector('.switch').querySelector('input').checked = localStorage.getItem('quantum-theme') !== null ? localStorage.getItem('quantum-theme') === 'true' : true

    document.querySelector('.-back').addEventListener('click', () => {
        back();
    });

    document.querySelector('.checkbox').addEventListener('change', () => {
        changeTheme(document.querySelector('.checkbox').checked);
    });
})