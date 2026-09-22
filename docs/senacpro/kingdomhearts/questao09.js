const alternativasLabels = [...document.getElementsByTagName('label')];
const mensagemDiv = document.getElementById('mensagem');
const btnConfirmar = document.getElementById('confirmar-alternativa');
const pontuacaoSpan = document.getElementById('total-pontos');

const OPCAO_CORRETA = 'marluxia'

function salvarResultadosLocalStorage(obj) {
    localStorage.setItem('@senacpro_questoes', JSON.stringify(obj));
}

function pegarResuldadosLocalStorage() {
    let resultados = JSON.parse(localStorage.getItem('@senacpro_questoes'));

    if (resultados === null) {
        resultados = {
            q1: false,
            q2: false,
            q3: false,
            q4: false,
            q5: false,
            q6: false,
            q7: false,
            q8: false,
            q9: false,
            q10: false,
        };

        salvarResultadosLocalStorage(resultados);
    }

    return resultados;
}

function calculaPontuacao() {
    const resultados = pegarResuldadosLocalStorage();
    let pontos = 0;

    for (chave in resultados) {
        if (resultados[chave]) {
            pontos++;
        }
    }

    pontuacaoSpan.textContent = pontos;
}

function jogadorErrou() {
    mensagemDiv.innerHTML = '<p class="bg-danger text-light fs-5">VOCÊ ERROU!</p>';
    mensagemDiv.style.display = 'block';

    const resultados = pegarResuldadosLocalStorage();
    resultados.q9 = false;
    salvarResultadosLocalStorage(resultados);
}

function jogadorAcertou() {
    mensagemDiv.innerHTML = '<p class="bg-success text-light fs-5">VOCÊ ACERTOU!</p>';
    mensagemDiv.style.display = 'block';

    const resultados = pegarResuldadosLocalStorage();
    resultados.q9 = true;
    salvarResultadosLocalStorage(resultados);
}

function jogar() {
    const opcaoEscolhida = document.querySelector('input[type=radio]:checked').value;

    if (opcaoEscolhida == null) {
        return;
    } else if (opcaoEscolhida !== OPCAO_CORRETA) {
        jogadorErrou();
    } else {
        jogadorAcertou();
    }
    revelaOpcoes();

    btnConfirmar.disabled = true;
    calculaPontuacao();
}

function removeSelecionadoCSSdoLabel() {
    alternativasLabels.forEach(function (elemento) {
        elemento.classList.remove('selecionado');
    });
}

function adicionaSelecionadoCSSNoLabel() {
    removeSelecionadoCSSdoLabel();
    const opcaoEscolhida = document.querySelector('input[type=radio]:checked');
    opcaoEscolhida.parentNode.classList.add('selecionado');
}

function revelaOpcoes() {
    alternativasLabels.forEach((elemento) => {
        const inputRadio = elemento.children[0];

        elemento.parentElement.classList.remove('border-light');
        if (inputRadio.value === OPCAO_CORRETA) {
            elemento.classList.add('opcao-correta');
        } else {
            elemento.classList.add('opcao-incorreta');
        }

        inputRadio.removeEventListener('change', adicionaSelecionadoCSSNoLabel);
    });
}

calculaPontuacao();

alternativasLabels.forEach((elemento) =>
    elemento.children[0].addEventListener('change', adicionaSelecionadoCSSNoLabel)
);

btnConfirmar.addEventListener('click', jogar);
