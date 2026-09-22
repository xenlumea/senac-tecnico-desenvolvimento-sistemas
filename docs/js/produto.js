'use strict';
const btnCalcular = document.getElementById('calcular');
const btnFechar = document.getElementById('fechar');

const inputPrecoUnitario = document.getElementById('preco-unitario');
const inputEstoque = document.getElementById('estoque');

const radioSetorA = document.getElementById('setor-a');
const radioSetorB = document.getElementById('setor-b');

const resultadosElemento = document.getElementById('resultados');

const tipoProdutoSelect = document.getElementById('tipo-produto');
const imagemProduto = document.getElementById('imagem-produto');

const SRC_IMG_ALIMENTO = './assets/img/produto/alimento.jpg';
const SRC_IMG_BEBIDA = './assets/img/produto/bebida.jpg';
const SRC_IMG_HORTIFRUTI = './assets/img/produto/hortifruti.jpeg';
const SRC_IMG_LIMPEZA = './assets/img/produto/limpeza.jpg';
const SRC_IMG_PADRAO = './assets/img/produto/padrao.jpg';

const ALIMENTO = 'A';
const BEBIDA = 'B';
const HORTIFRUTI = 'H';
const LIMPEZA = 'L';
const PADRAO = 'PADRAO';

function calcular() {
    const precoUnitario = parseFloat(inputPrecoUnitario.value);
    const estoque = parseInt(inputEstoque.value);

    const mensagens = [];

    if (radioSetorA.checked && tipoProdutoSelect.value === LIMPEZA) {
        mensagens.push('Produto de Limpeza do Setor A');
    }

    if (precoUnitario > 10 && (tipoProdutoSelect.value === ALIMENTO || tipoProdutoSelect.value === BEBIDA)) {
        mensagens.push('Produto custa mais de 10 reais de Bebidas ou Alimentos.');
    }

    if (precoUnitario >= 10 && precoUnitario <= 30) {
        mensagens.push('Produto custa de 10 a 30 reais.');
    }

    if (radioSetorA.checked && estoque >= 0 && estoque <= 50) {
        mensagens.push('Produto do Setor A com o estoque de 0 a 50.');
    }

    if (precoUnitario < 10.01) {
        mensagens.push('Produto Barato');
    } else if (precoUnitario < 30.01) {
        mensagens.push('Produto OK');
    } else if (precoUnitario < 60.01) {
        mensagens.push('Produto Caro');
    } else {
        mensagens.push('Produto muito caro');
    }

    const ul = document.createElement('ul');
    ul.classList.add('mx-0', 'px-2');
    mensagens.forEach((mensagem) => {
        const li = document.createElement('li');
        li.style.listStylePosition = 'inside'; // MOVE OS BULLETS PARA DENTRO DO ELEMENTO JUNTO COM O TEXTO PARA MELHOR ESTILIZAÇÃO, ASSIM NÃO FICAM FORA DA BORDA APLICADA
        li.classList.add('border', 'border-dark', 'bg-white', 'px-2', 'py-1', 'my-1');
        li.textContent = mensagem;
        ul.append(li);
    });

    resultadosElemento.innerHTML = '';
    resultadosElemento.appendChild(ul);
}

function mudarImagem(valorTipo) {
    if (valorTipo === ALIMENTO) {
        imagemProduto.src = SRC_IMG_ALIMENTO;
    } else if (valorTipo === BEBIDA) {
        imagemProduto.src = SRC_IMG_BEBIDA;
    } else if (valorTipo === HORTIFRUTI) {
        imagemProduto.src = SRC_IMG_HORTIFRUTI;
    } else if (valorTipo === LIMPEZA) {
        imagemProduto.src = SRC_IMG_LIMPEZA;
    } else {
        imagemProduto.src = SRC_IMG_PADRAO;
    }
}

btnCalcular.addEventListener('click', calcular);
btnFechar.addEventListener('click', () => alert('Botão Fechar clicado!'));

tipoProdutoSelect.addEventListener('change', function () {
    mudarImagem(tipoProdutoSelect.value);
});

/*
const tiposProdutosString = {
    PADRAO: "PADRAO",
    A: "Alimento",
    B: "Bebida",
    H: "Hortifruti",
    L: "Limpeza"
};
*/

/*
const setorA = 'setora';
const setorB = 'setorb';
*/

/*
const tipoProdutos = Object.freeze({
     ALIMENTO: 'A',
    BEBIDA: 'B',
    HORTIFRUTI: 'H',
    LIMPEZA: 'L',
    PADRAO: 'PADRAO'
});
*/
