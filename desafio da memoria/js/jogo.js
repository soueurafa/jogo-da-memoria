var card1 = '';
var card2 = '';

var erros = 0;

const spanJogador = document.querySelector('.jogador')
const grid = document.querySelector('.grid') 

const pokemons = [
    'eevee',
    'gardevoir',
    'gengar',
    'greninja',
    'lucario',
    'pikachu',
    'piplup',
    'snorlax',
    'squirtle',
    'tyranitar',
];

const finalizarJogo = () => {
    const cardsDesabilitados = document.querySelectorAll('.cards_desabilitados');
    const jogarNovamente = document.querySelector('.jogarNovamente');

    if (cardsDesabilitados.length === 20){
        setTimeout(() => {
            alert(`Parabéns ${spanJogador.innerHTML}, você acertou todos errando ${erros} vezes!`)
        }, 1000),
        setTimeout(() => {
            jogarNovamente.classList.remove('sumirBotao');
        }, 3000)
    }
} 

const comparar = () => {
    const pokemon1 = card1.getAttribute('data_pokemon'); 
    const pokemon2 = card2.getAttribute('data_pokemon'); 

    if (pokemon1 === pokemon2){
        setTimeout(() => {
            card1.firstChild.classList.add('cards_desabilitados');
            card2.firstChild.classList.add('cards_desabilitados');

            card1 = '';
            card2 = '';

            finalizarJogo();
        }, 800)

        
    }
    else {
        setTimeout(() => {
            card1.classList.remove('revelar');
            card2.classList.remove('revelar');

            card1 = '';
            card2 = '';

            erros = erros + 1;

        }, 1000)
    }
}


const revelar = ({target}) => {

    if (target.parentNode.className.includes('revelar')){
        return;
    }

    if (card1 === '') {
    target.parentNode.classList.add('revelar');
    card1 = target.parentNode;
    }
    else if(card2 === ''){
    target.parentNode.classList.add('revelar');
    card2 = target.parentNode;

    comparar();
    }
}

const criarCard = (pokemon) => {

    const card = document.createElement('div')
    const frente = document.createElement('div')
    const dorso = document.createElement('div')

    frente.style.backgroundImage = `url('../images/${pokemon}.png')`;

    card.className = 'card';
    frente.className = 'frente carta';
    dorso.className = 'dorso carta';

    grid.appendChild(card);
    card.appendChild(frente);
    card.appendChild(dorso);
    
    card.addEventListener('click', revelar);
    card.setAttribute('data_pokemon', pokemon);
    
    return card;
}

const criarJogo = () => {

    const duplicarPokemons = [ ...pokemons, ...pokemons]

    const arrayAleatorio = duplicarPokemons.sort(() => Math.random() - 0.5); 

    arrayAleatorio.forEach((pokemon) => {
        
        const card = criarCard(pokemon);
        grid.appendChild(card);
        setTimeout(()=>{
            card.classList.add('revelar')
        },1000);
        setTimeout(()=>{
            card.classList.remove('revelar')
        },2500);
    });  
}

window.onload = () =>{

    let nomeJogador = localStorage.getItem('jogador')

    spanJogador.innerHTML = nomeJogador;
    
    criarJogo();
}

