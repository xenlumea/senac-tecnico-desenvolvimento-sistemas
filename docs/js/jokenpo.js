'use strict';

const btnPedra = document.getElementById('botao-pedra');
const btnPapel = document.getElementById('botao-papel');
const btnTesoura = document.getElementById('botao-tesoura');

const imagemJogadorElemento = document.getElementById('imagem-jogador');
const imagemComputadorElemento = document.getElementById('imagem-computador');

const resultadoElemento = document.getElementById('resultado');

// const IMAGEM_PADRAO_SRC = './assets/img/jokenpo/jokenpo.jpg';
const TESOURA_SRC = './assets/img/jokenpo/tesoura.jpg';
const PEDRA_SRC = './assets/img/jokenpo/pedra.jpg';
const PAPEL_SRC = './assets/img/jokenpo/papel.jpg';

const PEDRA = '1';
const PAPEL = '2';
const TESOURA = '3';

function mudarImagem(opcao, imgElemento) {
    if (opcao === PEDRA) {
        imgElemento.src = PEDRA_SRC;
    } else if (opcao === PAPEL) {
        imgElemento.src = PAPEL_SRC;
    } else if (opcao === TESOURA) {
        imgElemento.src = TESOURA_SRC;
    } /* else {
        imgElemento.src = IMAGEM_PADRAO_SRC;
    } */
}

function gerarOpcaoComputador() {
    const opcao = String(Math.floor(Math.random() * 3) + 1);
    mudarImagem(opcao, imagemComputadorElemento);
    return opcao;
}

const escolhaString = Object.freeze({
    1: 'Pedra',
    2: 'Papel',
    3: 'Tesoura',
});

function jogar(opcaoJogador) {
    const opcaoComputador = gerarOpcaoComputador();

    const jogadorVenceu =
        (opcaoJogador === PEDRA && opcaoComputador === TESOURA) ||
        (opcaoJogador === TESOURA && opcaoComputador === PAPEL) ||
        (opcaoJogador === PAPEL && opcaoComputador === PEDRA);

    let resultado;

    if (jogadorVenceu) {
        resultado = 'JOGADOR VENCEU!';
    } else if (opcaoComputador === opcaoJogador) {
        resultado = 'EMPATE!';
    } else {
        resultado = 'COMPUTADOR VENCEU!';
    }

    resultadoElemento.innerText = resultado;

    // VISUALIZAR NO CONSOLE
    console.clear();
    console.log(
        ' JOGADOR:',
        escolhaString[opcaoJogador],
        '\n',
        'COMPUTADOR:',
        escolhaString[opcaoComputador],
        '\n',
        'RESULTADO:',
        resultado
    );
}

btnPapel.addEventListener('click', function () {
    mudarImagem(PAPEL, imagemJogadorElemento);
    jogar(PAPEL);
});
btnPedra.addEventListener('click', function () {
    mudarImagem(PEDRA, imagemJogadorElemento);
    jogar(PEDRA);
});
btnTesoura.addEventListener('click', function () {
    mudarImagem(TESOURA, imagemJogadorElemento);
    jogar(TESOURA);
});
