'use strict';
const btnExecutar1 = document.getElementById('executar1');
const btnExecutar2 = document.getElementById('executar2');
const btnExecutar3 = document.getElementById('executar3');
const btnExecutar4 = document.getElementById('executar4');
const btnExecutar5 = document.getElementById('executar5');

const formatadorBrasil = new Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' });

function executa1() {
    const resultado1 = document.getElementById('resultado1');

    let resultadoTexto = 'Resultado: ';

    let x = 1;
    let ultimoResultadoExibido;

    while (x <= 6) {
        resultadoTexto += x + ' ';
        ultimoResultadoExibido = x;

        x++;
    }
    resultado1.textContent = `${resultadoTexto}- Último valor exibido: ${ultimoResultadoExibido}. - Último valor de X: ${x}.`;
}

function executa2() {
    const resultado2 = document.getElementById('resultado2');
    let x = 10;
    while (x < 15) {
        x += 2;
    }
    resultado2.textContent = `X = ${x}.`;
}

function executa3() {
    const resultado3 = document.getElementById('resultado3');
    let y = 0;
    for (let x = 1; x <= 5; x += 2) {
        y = x + 1;
    }
    resultado3.textContent = 'Y = ' + y + '.';
}

function executa4() {
    const resultado4 = document.getElementById('resultado4');

    let sequencia = '';

    for (let i = 5; i >= 1; i--) {
        sequencia += i + ' ';
    }

    resultado4.textContent = sequencia.trim() + '.';
}

function executa5() {
    const resultado5 = document.getElementById('resultado5');
    resultado5.textContent = "Resultado:"

    const nome = document.getElementById('nome').value.trim();
    const salario = parseFloat(document.getElementById('salario').value);

    if (nome === '' || salario < 0 || isNaN(salario)) {
        return;
    }



    const salarioFormatado = formatadorBrasil.format(salario);
    const metadeSalarioFormatado = formatadorBrasil.format(salario / 2);

    resultado5.textContent = `${nome} recebe ${salarioFormatado}. A metade do salário é igual à ${metadeSalarioFormatado}.`;
}

btnExecutar1.addEventListener('click', executa1);
btnExecutar2.addEventListener('click', executa2);
btnExecutar3.addEventListener('click', executa3);
btnExecutar4.addEventListener('click', executa4);
btnExecutar5.addEventListener('click', executa5);
