const btnSomar = document.getElementById('somar');
const resultadoElemento = document.getElementById('resultado');
const inputNumero1 = document.getElementById('numero1');
const inputNumero2 = document.getElementById('numero2');

function somar() {
    let soma = parseFloat(inputNumero1.value) + parseFloat(inputNumero2.value);
    resultadoElemento.innerText = soma;
}

btnSomar.addEventListener('click', somar);
