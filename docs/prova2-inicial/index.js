const EMAIL = 'admin@gmail.com';
const SENHA = '123';

const btnEntrar = document.getElementById('entrar');
const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('senha');
const elementoAviso = document.getElementById('aviso');

function login() {
    if (inputEmail.value !== EMAIL || inputSenha.value !== SENHA) {
        elementoAviso.style.display = 'block';
        return;
    }

    // window.open('./vendas.html', '_self');
    window.location.href = './vendas.html';
}

function ocultarAviso() {
    elementoAviso.style.display = 'none';
}

inputEmail.addEventListener('focus', ocultarAviso);
inputSenha.addEventListener('focus', ocultarAviso);
btnEntrar.addEventListener('click', login);
