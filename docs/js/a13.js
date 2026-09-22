const btnCalcular = document.getElementById('calcular');
const resultadoMedia = document.getElementById('resultado-media');
const resultadoMensagem = document.getElementById('resultado-mensagem');
const inputNumero1 = document.getElementById('numero1');
const inputNumero2 = document.getElementById('numero2');

function calcular() {
    const media = (parseFloat(inputNumero1.value) + parseFloat(inputNumero2.value)) / 2;
    resultadoMedia.innerText = media.toFixed(2);

    if (media < 6) {
        resultadoMensagem.innerText = 'Menor que 6';
    } else if (media === 6) {
        resultadoMensagem.innerText = 'Ígual a 6';
    } else {
        resultadoMensagem.innerText = 'Maior que 6';
    }

    resultadoMensagem.innerText;
}

btnCalcular.addEventListener('click', calcular);

/*
 13)  Faça um algoritmo que leia dois números. Calcule a média dos dois números e exiba “Menor que 6” se a média for menor que 6; exiba “Maior que 6” se a média for maior que 6; exiba “Igual a 6” se a média for igual a 6.
 */
