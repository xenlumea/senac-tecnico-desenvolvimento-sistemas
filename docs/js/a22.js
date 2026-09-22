// 22)  Faça um algoritmo que leia um nome qualquer e exiba-o 10 vezes.
const exibe = document.getElementById('exibe');
const nome = document.getElementById('nome');
const resultado = document.getElementById('resultado');

function mostrarNome() {
    if (nome.value.trim() === '') {
        return;
    }

    let p = document.createElement('p');
    p.innerText = nome.value;
    resultado.replaceChildren();

    for (i = 1; i <= 10; i++) {
        let p = document.createElement('p');
        p.innerText = nome.value;
        resultado.appendChild(p);
    }
}

exibe.addEventListener('click', mostrarNome);
