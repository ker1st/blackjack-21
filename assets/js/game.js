//patron modulo
const myModule = (() => {
    'use strict'

    let deck = [];
    const typeCards = ['C', 'D', 'H', 'S'],
           specials = ['A', 'J', 'Q', 'K'];

     //let pointsPlayer = 0;
    //     pointsComputer = 0;
    let playerPoints = [];


    //Events
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const divCardsPlayers = document.querySelectorAll('.divCards'),
          pointsHTML = document.querySelectorAll('small');

    const initPlay = (numPlayer = 2) => {
        deck = setDeck();

        playerPoints = [];

        for(let i = 0 ;i < numPlayer; i++) {
            playerPoints.push(0);
        }

        pointsHTML.forEach( element => element.innerText = 0);
        divCardsPlayers.forEach( elem => elem.innerHTML = '');


        btnPedir.disabled = false;
        btnDetener.disabled = false;        
    }

    const setDeck = () => {
        for (let i = 2; i <= 10; i++) {
            for (let typeCard of typeCards) {
                deck.push(i + typeCard);
            }
        }

        for (let typeCard of typeCards) {
            for (let special of specials) {
                deck.push(special + typeCard);
            }
        }
        return _.shuffle(deck);
    }

    const getCard = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck'
        }
        return deck.pop();
    }

    const cardScoring = (cardValue) => {
        const value = cardValue.substring(0, cardValue.length - 1);
        return (isNaN(value)) ? ((value === 'A') ? 11 : 10) : (value * 1);
    }

    const accumulatePlayerPoints = (card, turn) => {
        playerPoints[turn] = playerPoints[turn] + cardScoring(card);
        pointsHTML[turn].innerText = playerPoints[turn];
        return playerPoints[turn];
    }

    const createCard = (card, turn) =>{
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${card}.png`;
        imgCard.classList.add('card-customize');
        console.log({divCardsPlayers});
        divCardsPlayers[turn].append(imgCard);
    } 

    const detWinner = () => {
        const [minPoints, pointsComputer] = playerPoints;
        setTimeout(() => {
            if (pointsComputer === minPoints) {
                alert('Nadie Gana');
            } else if (minPoints > 21) {
                alert('Gana computadora')
            } else if (pointsComputer > 21) {
                alert('Jugador 1 gana');
            } else {
                alert('computadora gana');
            }
        }, 100)
    }

    //Turno de la computadora
    const computerTurn = (minPoints) => {
        do {
            const requestCard = getCard();

            accumulatePlayerPoints(requestCard, playerPoints.length - 1)
            
            createCard(requestCard, playerPoints.length - 1)
            if (minPoints > 21) {
                break;
            }

        } while ((pointsComputer < minPoints) && (minPoints <= 21));
        detWinner();
    }

    

    //Events
    btnPedir.addEventListener('click', () => {
        const card = getCard();
        const pointsPlayer = accumulatePlayerPoints(card, 0);

        createCard(card, 0);
        // const imgCard = document.createElement('img');
        // imgCard.src = `assets/cards/${card}.png`;//arma la estructuras de las cartas
        // imgCard.classList.add('card-customize');
        // divPlayerDeck.append(imgCard);

        if (pointsPlayer > 21) {
            console.warn('Perdiste, rebasasete los 21 puntos');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            computerTurn(pointsPlayer);
        } else if (pointsPlayer === 21) {
            alert('¡¡Has ganado!!')
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            computerTurn(pointsPlayer);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        computerTurn(pointsPlayer);
    })

    btnNuevo.addEventListener('click', () => {
        initPlay();
    })

    return {
       nuevoJgo : initPlay
    };
})();