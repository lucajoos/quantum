window.addEventListener('load', () => {
    let url = new URL(window.location.href).searchParams;
    let href = `${url.get('href')}${url.get('href').includes('?') ? '&' : '?'}f=${url.get('finder')}&i=${url.get('index')}&quantum=true`;

    window.history.replaceState({}, 'Quantum', '/');

    document.querySelector('.qr').setAttribute('src', `http://chart.apis.google.com/chart?chs=500x500&cht=qr&chld=L&chl=${encodeURIComponent(href)}`);

    let input = document.querySelector('.input');
    input.value = href;

    let copy = true;

    document.querySelector('.copy').addEventListener('click', () => {
        if(copy) {
            input.focus();
            input.select();

            document.execCommand('copy');

            document.querySelector('.copy').classList.remove('-important');
            document.querySelector('.copy').classList.add('-done');

            document.querySelector('.copy').innerHTML = 'Copied!';

            let i = document.createElement('i');

            i.classList.add('fas');
            i.classList.add('fa-check');

            document.querySelector('.copy').prepend(i);

            copy = false;
        }
    });

    document.querySelector('.close').addEventListener('click', () => {
        window.close();
    });
})