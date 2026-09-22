const btnSalvar = document.getElementById('salvar');
const btnCalcularMedia = document.getElementById('calcular-media');
const btnMenorSalario = document.getElementById('btn-menor');
const btnMaiorSalario = document.getElementById('btn-maior');
const btnSomarTotal = document.getElementById('somar-total');
const inputSalarioBruto = document.getElementById('salario-bruto');
const inputTotalSomado = document.getElementById('total-somado');
const inputMenorSalario = document.getElementById('menor');
const inputMaiorSalario = document.getElementById('maior');
const listaDeSalariosElemento = document.getElementById('lista-de-salarios');

const inputMediaCalculada = document.getElementById('media-calculada');

const formatadorBrasil = new Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' });

const salarios = [];

function salvarSalario() {
    const salarioBruto = parseFloat(parseFloat(inputSalarioBruto.value).toFixed(2));
    salarios.push(salarioBruto);

    const li = document.createElement('li');
    li.classList.add('list-group-item', 'p-0');

    const input = document.createElement('input');
    input.classList.add('form-control', 'bg-white');
    input.disabled = true;
    input.name = 'salario-adicionado';
    input.value = formatadorBrasil.format(salarioBruto);

    li.appendChild(input);
    listaDeSalariosElemento.append(li);
}

function somarTotal() {
    let total = 0.0;
    for (i = 0; i < salarios.length; i++) {
        total += salarios[i];
    }

    return total;
}

function calcularMedia() {
    if (salarios.length === 0) {
        media = 0;
    } else {
        media = somarTotal() / salarios.length;
    }

    exibeTotalSomado();
    inputMediaCalculada.value = formatadorBrasil.format(media);
}

function exibeTotalSomado() {
    inputTotalSomado.value = formatadorBrasil.format(somarTotal());
}

function encontraMenorSalario() {
    let menor = salarios[0];

    for (i = 1; i < salarios.length; i++) {
        if (salarios[i] < menor) {
            menor = salarios[i];
        }
    }

    inputMenorSalario.value = formatadorBrasil.format(menor);
}

function encontraMaiorSalario() {
    let maior = salarios[0];

    for (i = 1; i < salarios.length; i++) {
        if (salarios[i] > maior) {
            maior = salarios[i];
        }
    }

    inputMaiorSalario.value = formatadorBrasil.format(maior);
}

btnSalvar.addEventListener('click', salvarSalario);

btnSomarTotal.addEventListener('click', exibeTotalSomado);
btnCalcularMedia.addEventListener('click', calcularMedia);
btnMenorSalario.addEventListener('click', encontraMenorSalario);
btnMaiorSalario.addEventListener('click', encontraMaiorSalario);
