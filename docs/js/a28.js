/*
28) Faça um algoritmo que leia três números em ordem crescente (por exemplo: 3, 50 e 150). Exiba os números crescentes do primeiro até o valor do meio; depois exiba, em ordem decrescente, os números do terceiro até o valor do meio.
*/

const exibe = document.getElementById('exibe');
const numero1 = document.getElementById('numero1');
const numero2 = document.getElementById('numero2');
const numero3 = document.getElementById('numero3');

const resultado1 = document.getElementById('resultado1');
const resultado2 = document.getElementById('resultado2');

function mostrarIntervalos() {
    const n1 = parseInt(numero1.value);
    const n2 = parseInt(numero2.value);
    const n3 = parseInt(numero3.value);

    let texto = '';

    for (let i = n1; i <= n2; i++) {
        texto = texto + i + ' ';
    }

    resultado1.innerText = texto;

    texto = ''; // Reseta variável

    for (let i = n3; i >= n2; i--) {
        texto = texto + i + ' ';
    }

    resultado2.innerText = texto;
}

exibe.addEventListener('click', mostrarIntervalos);
