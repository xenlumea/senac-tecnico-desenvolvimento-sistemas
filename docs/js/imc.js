const btnCalcular = document.getElementById('calcular');
const resultado = document.getElementById('resultado');
const condicao = document.getElementById('condicao');
const altura = document.getElementById('altura');
const peso = document.getElementById('peso');
const divImagem = document.getElementById('div-imagem');

function calcular() {
    const imc = parseFloat(peso.value) / Math.pow(parseFloat(altura.value), 2);

    if (isNaN(imc) || imc < 0) return;

    resultado.innerText = 'IMC = ' + imc.toFixed(1);

    const imagem = document.createElement('img');
    imagem.classList.add('img-fluid'); // Class Bootstrap

    if (imc < 18.5) {
        // abaixo
        condicao.innerText = 'Abaixo do peso';
        imagem.src = './assets/img/imc/abaixo-do-peso.jpg';
    } else if (imc < 25) {
        //normal
        condicao.innerText = 'Peso normal';
        imagem.src = './assets/img/imc/normal.jpg';
    } else if (imc < 30) {
        //sobrepeso
        condicao.innerText = 'Sobrepeso';
        imagem.src = './assets/img/imc/sobrepeso.jpg';
    } else {
        // obeso
        condicao.innerText = 'Obesidade';
        imagem.src = './assets/img/imc/obeso.jpg';
    }

    divImagem.replaceChildren();
    divImagem.appendChild(imagem);
}

btnCalcular.addEventListener('click', calcular);
