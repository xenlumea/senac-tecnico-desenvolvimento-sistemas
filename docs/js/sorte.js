const exibir = document.getElementById('exibir');
const escolha = document.getElementById('escolha');
const resultado = document.getElementById('resultado');
const mensagem = document.getElementById('mensagem');
const img = document.getElementById('imagem');

const ANIMAL = 1;
const HOMEM = 2;
const MULHER = 3;
const CRIANCA = 4;
const IDOSA = 5;

function mostrar() {
    if (escolha.value === '') return;

    const escolhido = parseInt(escolha.value);
    const computador = parseInt(Math.floor(Math.random() * 5) + 1);

    if (computador === ANIMAL) {
        img.src = './assets/img/sorte/animal.jpg';
    } else if (computador === MULHER) {
        img.src = './assets/img/sorte/mulher.jpg';
    } else if (computador === CRIANCA) {
        img.src = './assets/img/sorte/crianca.jpg';
    } else if (computador === IDOSA) {
        img.src = './assets/img/sorte/idosa.jpg';
    } else if (computador === HOMEM) {
        img.src = './assets/img/sorte/homem.jpg';
    }

    if (escolhido === computador) {
        mensagem.innerHTML = '<h2>Parabéns, você acertou!</h2>';
    } else {
        mensagem.innerHTML = '<h2>Você errou!</h2>';
    }
}

exibir.addEventListener('click', mostrar);
