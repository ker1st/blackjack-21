/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 **/

let deck        = [];
const typeCards = ['C', 'D', 'H', 'S'];
const specials  = ['A', 'J', 'Q', 'K'];

let pointsPlayer   = 0,
    pointsComputer = 1;

//Events
const btnPedir = document.querySelector('#btnPedir');

const divPlayerDeck = document.querySelector('#player-deck');
const pointsHTML = document.querySelectorAll('small');

const setDeck = () => {
    for(let i = 2; i <= 10; i++) {
        for(let typeCard of typeCards){
            deck.push(i+typeCard);
        }
    }
    
    for(let typeCard of typeCards) {
        for(let special of specials) {
            deck.push(typeCard+special);
        }
    }

    deck = _.shuffle(deck);

    console.log(deck);
    
    
}

setDeck()

const getCard = () => {
    if(deck.length === 0) {
        throw 'No hay cartas en el deck'
    }
    const card = deck.pop();
    return card;
}

getCard()

const cardScoring = (cardValue) => {
    const value = cardValue.substring(0, cardValue.length - 1);
    return (isNaN(value))  ? ((value === 'A') ? 11 : 10) : (value*1);  
}

//Events
btnPedir.addEventListener('click', () => {
    const card = getCard();
    pointsPlayer = pointsPlayer + cardScoring(card);
    pointsHTML[0].innerText = pointsPlayer;

    const imgCard = document.createElement('img');
    imgCard.src   = `assets/cards/${card}.png`;//arma la estructuras de las cartas
    imgCard.classList.add('card-customize');
    divPlayerDeck.append(imgCard);

    if(pointsPlayer > 21) {
        alert('Has perdido')
        console.warn('Perdiste, rebasasete los 21 puntos');
        btnPedir.ariaDisabled = true;
    } else if(pointsPlayer === 21) {
        alert('¡¡Has ganado!!')
    }
});