const btnCalcular = document.getElementById('calcular');
const btnFechar = document.getElementById('fechar');

// INICIO INPUTS
const inputNome = document.getElementById('nome');
let inputRadioSexo = null;
const inputSelectPensao = document.getElementById('opcao-pensao');
const inputSalarioBruto = document.getElementById('salario-bruto');
const inputHorasExtras = document.getElementById('horas-extras');
const inputNumeroFaltas = document.getElementById('numero-faltas');
const inputNumeroDependentes = document.getElementById('numero-dependentes');

// COMPROVANTES PROVENTOS
const identificacao = document.getElementById('identificacao');
const resultadoSalarioBruto = document.getElementById('resultado-salario-bruto');
const resultadoSalarioFamilia = document.getElementById('resultado-salario-familia');
const resultadoHorasExtras = document.getElementById('resultado-horas-extras');
const resultadoProventos = document.getElementById('resultado-proventos');

// COMPROVANTES DESCONTOS
const resultadoFaltas = document.getElementById('resultado-faltas');
const resultadoPensaoAlimenticia = document.getElementById('resultado-pensao-alimenticia');
const resultadoINSS = document.getElementById('resultado-inss');
const resultadoDescontos = document.getElementById('resultado-descontos');

// Salário Líquido
const resultadoSalarioLiquido = document.getElementById('salario-liquido');

const LIMITE_SALARIO_FAMILIA = 1906.04;

function exibirIdentificacao() {
    let pronome = '';
    if (inputRadioSexo.value === 'f') {
        pronome = 'Sra.';
    } else {
        pronome = 'Sr.';
    }

    tratamento = pronome + ' ' + inputNome.value;
    identificacao.textContent = tratamento;
}

function calcularSalario() {
    inputRadioSexo = document.querySelector('input[name="sexo"]:checked');
    if (inputRadioSexo === null) {
        return;
    }

    const proventoSalarioBruto = parseFloat(inputSalarioBruto.value);

    const salarioPorDia = proventoSalarioBruto / 30;
    const salarioPorHora = proventoSalarioBruto / 200;

    // INICIO PROVENTOS
    const proventoHorasExtras = salarioPorHora * parseInt(inputHorasExtras.value);

    let proventoSalarioFamilia = 0.0;
    if (proventoSalarioBruto <= LIMITE_SALARIO_FAMILIA) {
        proventoSalarioFamilia = 65.0 * parseInt(inputNumeroDependentes.value);
    }
    const totalProventos = proventoSalarioBruto + proventoSalarioFamilia + proventoHorasExtras;
    // FIM PROVENTOS

    // INICIO DESCONTOS
    const qtdFaltas = parseInt(inputNumeroFaltas.value);
    const descontoFaltas = qtdFaltas * salarioPorDia;

    let descontoPensaoAlimenticia = 0.0;

    if (inputSelectPensao.value === 'sim') {
        descontoPensaoAlimenticia = proventoSalarioBruto * 0.3;
    }

    let descontoINSS = 0.0;

    if (proventoSalarioBruto < 1621) {
        descontoINSS = (7.5 / 100) * proventoSalarioBruto;
    } else if (proventoSalarioBruto <= 2902) {
        descontoINSS = (9.0 / 100) * proventoSalarioBruto;
    } else {
        descontoINSS = (12.0 / 100) * proventoSalarioBruto;
    }

    const totalDescontos = descontoFaltas + descontoPensaoAlimenticia + descontoINSS;
    // FIM DESCONTOS

    const salarioLiquido = totalProventos - totalDescontos;

    exibirIdentificacao();

    resultadoSalarioBruto.value = proventoSalarioBruto.toFixed(2);
    resultadoSalarioFamilia.value = proventoSalarioFamilia.toFixed(2);
    resultadoHorasExtras.value = proventoHorasExtras.toFixed(2);
    resultadoProventos.value = totalProventos.toFixed(2);

    resultadoFaltas.value = descontoFaltas.toFixed(2);
    resultadoPensaoAlimenticia.value = descontoPensaoAlimenticia.toFixed(2);
    resultadoINSS.value = descontoINSS.toFixed(2);
    resultadoDescontos.value = totalDescontos.toFixed(2);

    resultadoSalarioLiquido.value = salarioLiquido.toFixed(2);
}

function fecharFolha() {
    alert('Botão fechar clicado!');
}

btnCalcular.addEventListener('click', calcularSalario);
btnFechar.addEventListener('click', fecharFolha);

/*
47) Faça um programa que leia:

    Nome do funcionário		Sexo (radiobutton Feminino/Masculino)
    Pensão (combobox Sim/Não)	Salário
    Horas Extras			Número de Faltas
    Número Dependentes

ATENÇÃO: Para cada tipo de cálculo, crie variáveis pertinentes ao objetivo do cálculo. Alguns cálculos precisam de mais de uma variável para ser calculado;

a - Calcule o valor total do salário família, multiplicando o valor do salário família (65,00) pela quantidade de filhos dependentes. O valor do salário família só será pago se o salário mínimo for até 1906,04;

b - Exiba o nome do funcionário com o pronome de acordo com o Sexo:
Sr. José da Silva   ou Sra. Maria de Souza.

c - No cálculo de horas extras: primeiro, calcule o valor da hora do funcionário (salário do funcionário dividido por 200 horas). Depois, multiplique o valor da hora extra com a quantidade de horas informadas.

d -	Valor de faltas:  divida o salário informado por 30 dias. Multiplique o valor do dia pelo número de faltas.

e -	Pensão Alimentícia: Se a informação for Sim, calcule 30% do salário informado.

f - Calcule o INSS de acordo com a tabela abaixo:
                Salário até 1621 reais     	=         	  7,5%
                De 1621,01 até 2902 reais  	=         	  9,0%
                Acima de 2902 reais       	=         	12,0%
e - Calcule o total dos proventos e o total dos descontos. Calcule o salário líquido (Provento - Desconto)
Exiba todos os valores no comprovante, de acordo com a imagem.
*/
