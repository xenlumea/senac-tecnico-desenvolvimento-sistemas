const pontosSpan = document.getElementById('pontos');
const listaQuestoes = document.getElementById('lista-questoes');

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
