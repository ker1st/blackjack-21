(()=>{
    'use strict'
    
    let deck        = [];
    const typeCards = ['C', 'D', 'H', 'S'],
          specials  = ['A', 'J', 'Q', 'K'];

    // let pointsPlayer   = 0,
    //     pointsComputer = 0;
    let pointsPlayer = [0, 0];

    //Events
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');

    const divPlayerDeck   = document.querySelector('#player-deck'),
          divComputerDeck = document.querySelector('#pc-deck'),
          pointsHTML      = document.querySelectorAll('small');

    //Funcion que inicia el juego
    const playInit = (playNumber = 2) => {
        deck = setDeck();
        for(let i = 0; i < playNumber; i++) {
            pointsPlayer.push(0);
        }
        
    }

    const setDeck = () => {
        for(let i = 2; i <= 10; i++) {
            for(let typeCard of typeCards){
                deck.push(i+typeCard);
            }
        }
        
        for(let typeCard of typeCards) {
            for(let special of specials) {
                deck.push(special+typeCard);
            }
        }
        return _.shuffle(deck);
    }


    const getCard = () => {
        if(deck.length === 0) {
            throw 'No hay cartas en el deck'
        }
        return deck.pop();
    }

    const cardScoring = (cardValue) => {
        const value = cardValue.substring(0, cardValue.length - 1);
        return (isNaN(value))  ? ((value === 'A') ? 11 : 10) : (value*1);  
    }

    const savePointsPepple = () => {

    }

    //Turno de la computadora
    const  computerTurn = ( minPoints ) => {
        do {
                const requestCard = getCard();
                pointsComputer = pointsComputer + cardScoring(requestCard);
                pointsHTML[1].innerText = pointsComputer;

                const imgCard = document.createElement('img');
                imgCard.src = `assets/cards/${requestCard}.png`;
                imgCard.classList.add('card-customize');
                divComputerDeck.append(imgCard);
                
                if(minPoints > 21) {
                    break;
                }

        } while((pointsComputer < minPoints) && (minPoints <= 21))

            setTimeout(()=>{
                if(pointsComputer === minPoints) {
                    alert('Nadie Gana');
                }else if (minPoints > 21) {
                    alert('Gana computadora')
                }else if(pointsComputer >21){
                    alert('Jugador 1 gana');
                }else {
                    alert('computadora gana');
                }
            },100)
    } 

    //Eventos
    btnPedir.addEventListener('click', () => {
        const card = getCard();
        pointsPlayer = pointsPlayer + cardScoring(card);
        pointsHTML[0].innerText = pointsPlayer;

        const imgCard = document.createElement('img');
        imgCard.src   = `assets/cards/${card}.png`;//arma la estructuras de las cartas
        imgCard.classList.add('card-customize');
        divPlayerDeck.append(imgCard);

        if(pointsPlayer > 21) {
            console.warn('Perdiste, rebasasete los 21 puntos');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            computerTurn(pointsPlayer);
        } else if(pointsPlayer === 21) {
            console.log('¡¡Has ganado!!')
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            computerTurn(pointsPlayer);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        computerTurn(pointsPlayer);
    })

    btnNuevo.addEventListener('click', () =>{
        console.clear();
        playInit();
        // deck = [];
        // deck = setDeck();

        pointsPlayer   = 0;
        pointsComputer = 0;

        pointsHTML[0].innerText = 0;
        pointsHTML[1].innerText = 0;

        
        
        divComputerDeck.innerHTML = '';
        divPlayerDeck.innerHTML = '';
        
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    })

})()