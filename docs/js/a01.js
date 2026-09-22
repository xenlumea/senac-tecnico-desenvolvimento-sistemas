const exibe = document.getElementById('exibe');

function exibir() {
    let nome = document.getElementById('nome').value;
    let resultado = document.getElementById('resultado');
    resultado.textContent = nome;
}

exibe.addEventListener('click', exibir);
