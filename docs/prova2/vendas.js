const btnCalcular = document.getElementById('calcular');
const imagemProduto = document.getElementById('imagem-produto');
const radiosContainer = document.getElementById('radios');

/* ENTRADAS */
const inputPrecoProduto = document.getElementById('preco-produto');
const inputQuantidade = document.getElementById('quantidade-produto');
const inputPorcentagemDesconto = document.getElementById('porcentagem-desconto');

/* SAÍDAS */
const valorBruto = document.getElementById('valor-bruto');
const valorDesconto = document.getElementById('valor-desconto');
const valorLiquido = document.getElementById('valor-liquido');

const BOLO = 'bolo';
const PUDIM = 'pudim';
const QUITANDA = 'quitanda';
const TORTA = 'torta';

const SRC_IMG_LOGO = './assets/img/logo/logo-ia-600px.jpg';
const SRC_IMG_BOLO = './assets/img/produtos/bolo.jpg';
const SRC_IMG_PUDIM = './assets/img/produtos/pudim.jpg';
const SRC_IMG_QUITANDA = './assets/img/produtos/quitanda.jpg';
const SRC_IMG_TORTA = './assets/img/produtos/torta.jpg';

// FORMATADOR
const formatarMoeda = new Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format;

function calcular() {
    const produtoEscolhido = document.querySelector('input[name=produto]:checked');

    const precoProduto = parseFloat(inputPrecoProduto.value);
    const quantidade = parseInt(inputQuantidade.value);
    const porcentagemDesconto = parseFloat(inputPorcentagemDesconto.value);

    const resultadoValorBruto = precoProduto * quantidade;
    const resultadoValorDesconto = resultadoValorBruto * (porcentagemDesconto / 100);
    const resultadoValorLiquido = resultadoValorBruto - resultadoValorDesconto;

    if (produtoEscolhido.value === BOLO) {
        imagemProduto.src = SRC_IMG_BOLO;
    } else if (produtoEscolhido.value === PUDIM) {
        imagemProduto.src = SRC_IMG_PUDIM;
    } else if (produtoEscolhido.value === QUITANDA) {
        imagemProduto.src = SRC_IMG_QUITANDA;
    } else if (produtoEscolhido.value === TORTA) {
        imagemProduto.src = SRC_IMG_TORTA;
    }

    valorBruto.value = formatarMoeda(resultadoValorBruto);
    valorDesconto.value = formatarMoeda(resultadoValorDesconto);
    valorLiquido.value = formatarMoeda(resultadoValorLiquido);
}

btnCalcular.addEventListener('click', calcular);
