const form = document.querySelector('.form_login');
const input = document.querySelector('.input_login');
const botao = document.querySelector('.botao_login');

const habilitar = ({target}) => {
    if (target.value.length > 1) {
        botao.removeAttribute('disabled');
    }
    else{
        botao.setAttribute('disabled', '');
    }
}

const submitBotao = (event) => {
    event.preventDefault();

    localStorage.setItem('jogador', input.value);
    window.location = 'pages/jogo.html';
}

input.addEventListener('input', habilitar);
form.addEventListener('submit', submitBotao);
