const btnAtribui10 = document.getElementById('atribui10');
const btnAcrescenta5 = document.getElementById('acrescenta5');
const btnMultiplicarPor3 = document.getElementById('multiplicapor3');
const resultadoElemento = document.getElementById('resultadoElemento');

let resultado = 0;

function exibeResulado() {
    resultadoElemento.textContent = resultado;
}

function atribuirDez() {
    resultado = 10;
    exibeResulado();
}

function acrescentarCinco() {
    resultado += 5;
    exibeResulado();
}

function triplicar() {
    resultado *= 3;
    exibeResulado();
}

btnAtribui10.addEventListener('click', atribuirDez);
btnAcrescenta5.addEventListener('click', acrescentarCinco);
btnMultiplicarPor3.addEventListener('click', triplicar);
