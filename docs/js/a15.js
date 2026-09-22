const exibe = document.getElementById('exibe');
const temperatura = document.getElementById('temperatura');
const resultado = document.getElementById('resultado');
const divImagem = document.getElementById('imagem');

function mostrarTemperatura() {
    let vtemperatura = parseFloat(temperatura.value);

    let img = document.createElement('img');

    if (vtemperatura < 0) {
        resultado.innerText = 'SÓLIDO';
        img.src = './assets/img/solido.jpg';
    } else if (vtemperatura < 46) {
        resultado.innerText = 'LÍQUIDO';
        img.src = './assets/img/liquido.jpg';
    } else {
        resultado.innerText = 'GASOSO';
        img.src = './assets/img/gasoso.jpg';
    }

    divImagem.replaceChildren();
    divImagem.appendChild(img);
}

exibe.addEventListener('click', mostrarTemperatura);
