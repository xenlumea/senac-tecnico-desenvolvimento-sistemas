const inputValorEmprestimo = document.getElementById('valor-emprestimo');
const inputNumeroPrestracoes = document.getElementById('numero-prestacoes');
const inputPercentualJuros = document.getElementById('percentual-juros');

const resultadoMontanteSimples = document.getElementById('montante-simples');
const resultadoPrestacaoSimples = document.getElementById('prestacao-simples');
const resultadoMontanteComposto = document.getElementById('montante-composto');
const resultadoPrestacaoComposto = document.getElementById('prestacao-composto');

const btnCalcular = document.getElementById('calcular');
const btnFechar = document.getElementById('fechar');

const formatadorBrasil = new Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' });

function estaValido(...numerosArray) {
    for (let i = 0; i < numerosArray.length; i++) {
        if (isNaN(numerosArray[i]) || numerosArray[i] < 0) {
            return false;
        }
    }

    return true;
}

function calcularJuros() {
    const valorEmprestimo = parseFloat(inputValorEmprestimo.value);
    const numeroDePrestacoes = parseFloat(inputNumeroPrestracoes.value);
    const percentualJuros = parseFloat(inputPercentualJuros.value);

    if (numeroDePrestacoes <= 0) return;

    const numeroEstaoValidos = estaValido(valorEmprestimo, numeroDePrestacoes, percentualJuros);

    if (numeroEstaoValidos === false) return;

    const jurosSimples = valorEmprestimo * numeroDePrestacoes * (percentualJuros / 100);
    const montanteSimples = valorEmprestimo + jurosSimples;
    const prestacaoSimples = montanteSimples / numeroDePrestacoes;

    const montanteComposto = valorEmprestimo * (1 + percentualJuros / 100) ** numeroDePrestacoes;
    const prestacaoComposto = montanteComposto / numeroDePrestacoes;

    resultadoMontanteSimples.value = formatadorBrasil.format(montanteSimples);
    resultadoPrestacaoSimples.value = formatadorBrasil.format(prestacaoSimples);

    resultadoMontanteComposto.value = formatadorBrasil.format(montanteComposto);
    resultadoPrestacaoComposto.value = formatadorBrasil.format(prestacaoComposto);
}

btnCalcular.addEventListener('click', calcularJuros);
btnFechar.addEventListener('click', () => alert('Botão fechar clicado!'));
