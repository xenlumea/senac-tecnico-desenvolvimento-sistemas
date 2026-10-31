const pontosSpan = document.getElementById('pontos');
const listaQuestoes = document.getElementById('lista-questoes');
const btnEnviar = document.getElementById('btn-enviar');
const formRodape = document.getElementById('form-rodape');

function exibeResultado() {
    let resultados = JSON.parse(localStorage.getItem('@senacpro_questoes')) || {
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

    let pontos = 0;

    let contador = 1;
    for (chave in resultados) {
        const acertou = resultados[chave];
        let mensagem = 'ERROU!';

        const li = document.createElement('li');

        if (acertou) {
            pontos++;
            mensagem = 'ACERTOU!';
            li.classList.add('bg-success');
        } else {
            mensagem = 'ERROU!';
            li.classList.add('bg-danger');
        }

        li.textContent = `Questão ${contador} - ${mensagem}`;

        listaQuestoes.appendChild(li);
        contador++;
    }

    pontosSpan.textContent = pontos;
}

exibeResultado();

function enviarContato(e) {
    e.preventDefault();
    btnEnviar.disabled = true;

    formRodape.innerHTML = '<p class="bg-success text-light fs-5 m-1 py-1 w-100">Informações enviadas com sucesso!</p>';
}

btnEnviar.addEventListener('click', enviarContato);
