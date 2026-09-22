'use strict';

const opcaoJogadorElemento = document.getElementById('opcao-jogador');
const opcaoComputadorElemento = document.getElementById('opcao-computador');
const btnJogar = document.getElementById('btn-jogar');
const imagemJogadorElemento = document.getElementById('imagem-jogador');
const imagemComputadorElemento = document.getElementById('imagem-computador');

const mensagemJogadorElemento = document.getElementById('msg-escolha-jogador');
const mensagemComputadorElemento = document.getElementById('msg-escolha-computador');
const resultadoElemento = document.getElementById('resultado');

const IMAGEM_PADRAO_SRC = './assets/img/jokenpo/jokenpo.jpg';
const TESOURA_SRC = './assets/img/jokenpo/tesoura.jpg';
const PEDRA_SRC = './assets/img/jokenpo/pedra.jpg';
const PAPEL_SRC = './assets/img/jokenpo/papel.jpg';

const PEDRA = '1';
const PAPEL = '2';
const TESOURA = '3';

const escolhaString = Object.freeze({
    1: 'Pedra',
    2: 'Papel',
    3: 'Tesoura',
});

function mudarImagem(opcao, imgElemento) {
    if (opcao === PEDRA) {
        imgElemento.src = PEDRA_SRC;
    } else if (opcao === PAPEL) {
        imgElemento.src = PAPEL_SRC;
    } else if (opcao === TESOURA) {
        imgElemento.src = TESOURA_SRC;
    } else {
        imgElemento.src = IMAGEM_PADRAO_SRC;
    }
}

function gerarOpcaoComputador() {
    const opcao = String(Math.floor(Math.random() * 3) + 1);
    mudarImagem(opcao, imagemComputadorElemento);
    opcaoComputadorElemento.value = opcao;
    return opcao;
}

function jogar() {
    const opcaoJogador = opcaoJogadorElemento.value;

    if (opcaoJogador === '') return;

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

    mensagemComputadorElemento.innerText = escolhaString[opcaoComputador];
    mensagemJogadorElemento.innerText = escolhaString[opcaoJogador];

    resultadoElemento.innerText = resultado;
}

function resetar() {
    mudarImagem('', imagemComputadorElemento);
    opcaoComputadorElemento.value = '';
    mensagemComputadorElemento.innerText = '';
    mensagemJogadorElemento.innerText = '';
    resultadoElemento.innerText = '';
}

opcaoJogadorElemento.addEventListener('change', function () {
    mudarImagem(opcaoJogadorElemento.value, imagemJogadorElemento);
    resetar();
});
btnJogar.addEventListener('click', jogar);
