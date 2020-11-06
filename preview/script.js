window.addEventListener('load', () => {
    let url = new URL(window.location.href).searchParams;
    let theme = url.get('theme');
    let href = `${url.get('href')}${url.get('href').includes('?') ? '&' : '?'}f=${url.get('finder')}&i=${url.get('index')}&quantum=true`;

    window.history.replaceState({}, 'Quantum', '/');

    document.querySelector('.qr').setAttribute('src', `http://chart.apis.google.com/chart?chco=161821&chs=500x500&cht=qr&chld=L&chl=${encodeURIComponent(href)}`);

    if(theme !== 'true') {
        document.body.classList.add('-light');
    }

    let input = document.querySelector('.input');
    input.value = href;

    let copy = true;

    new ConfettiGenerator({"target":"confetti","max":"80","size":"1","animate":true,"props":["circle"],"colors":[theme === 'true' ? [43,46,62] : [115,134,158]],"clock":"3","rotate":false,"width":window.width,"height":window.height,"start_from_edge":false,"respawn":true}).render();

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