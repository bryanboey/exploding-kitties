"use strict";
// Deck Class
class Deck {
    constructor() {
        this.cards = [];
        this.reset(); // new deck
    }
    reset() {
        this.cards = [];
        for (let i = 0; i < 5; i++) {
            this.cards.push(new Attack());
            this.cards.push(new Skip());
            this.cards.push(new Favor());
            this.cards.push(new Shuffle());
            this.cards.push(new Nope());
            this.cards.push(new SeeTheFuture());
        }
    }
    get numOfCards() {
        return this.cards.length
    }
    shuffle() {
        for (let i = this.numOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue
        }
    }
    deal() {
        return this.cards.shift();
    }
}

// Base Class
class Card {
    constructor(name = "", image = "") {
        this.name = name;
        this.image = image;
    }
    getHTML() {
        const cardImg = document.createElement('img');
        cardImg.id = this.name;
        cardImg.innerText = this.name;
        cardImg.className = "player-hand card"
        cardImg.src = this.image;
        cardImg.style.width = "87px";
        cardImg.style.borderRadius = "0.5rem";
        return cardImg
    }
}

// Nope 5x
class Nope extends Card {
    constructor() {
        super("Nope", "images/Nope.png");
    }
}
// Attack 4x
class Attack extends Card {
    constructor() {
    super("Attack", "images/Attack.jpeg");
    }
}
// Skip 4x
class Skip extends Card {
    constructor() {
        super("Skip", "images/Skip.png");
    }
}
// Favor 4x
class Favor extends Card {
    constructor() {
        super("Favor", "images/Favor.png");
    }
}
// Shuffle 4x
class Shuffle extends Card {
    constructor() {
        super("Shuffle", "images/Shuffle.png");
    }

}
// See the Future 5x
class SeeTheFuture extends Card {
    constructor() {
        super("SeeTheFuture", "images/SeeTheFuture.jpeg");
    }
}
// Exploding Kitten 4x
class ExplodingKitten extends Card {
    constructor() {
        super("ExplodingKitten", "images/ExplodingKitten.jpeg")
    }
}
// Defuse 6x
class Defuse extends Card {
    constructor() {
        super("Defuse", "images/Defuse.jpg")
    }
}
// Powerless cards 4 * 5 [placeholders for future upgrade]
class PoliteCat extends Card {
    constructor() {
        super("PoliteCat")
    }
}
class OmgCat extends Card {
    constructor() {
        super("OmgCat")
    }
}
class YaasCat extends Card {
    constructor() {
        super("YaasCat")
    }
}
class HeavyBreathingCat extends Card {
    constructor() {
        super("HeavyBreathingCat")
    }
}
class AngryCat extends Card {
    constructor() {
        super("AngryCat")
    }
}

// Exploding Kitties Game
const gameContainer = document.querySelector('.game-container');
const playButton = document.querySelector('#play-button');
const restartButton = document.querySelector('#restart-button');
const drawPile = document.querySelector('.draw-pile');
const cardBackImage = "images/Card Back.png";
const gameMessages = document.querySelector('#game-messages');
const playerTurnMessage = document.querySelector('#player-turn-display');
const deckCounter = document.querySelector('#deck-count');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');
let player1;
let player2;
let currentPlayer;
let nextPlayer;

///// GAME CLASS
class Game {
    constructor(deck) {
        this.deck = deck;
        this.skipPlayer = false;
        this.extraTurn = false;
        this.currentPlayer = "";
    }
    start(e) {
        e.preventDefault();
        playButton.style.display = "none";
        discardPile.innerHTML = "";
        if (document.querySelector('#ExplodingKitten') !== null) {
            document.querySelector('#ExplodingKitten').remove();
        }
        deckCounter.innerText = "";
        
        player1 = { name: "Player 1", hand: [ new Defuse() ], column: document.querySelector('#p1')}
        player2 = { name: "Player 2", hand: [ new Defuse() ], column: document.querySelector('#p2')}
        
        // create deck
        deck.reset();
        deck.cards.push(new Defuse());
        deck.shuffle();

        // deal players 4 cards each
        for (let i = 0; i < 4; i++) {
            player1.hand.push(deck.deal());
            player2.hand.push(deck.deal());
        }

        // insert exploding kitten card and reshuffle
        deck.cards.unshift(new ExplodingKitten());
        deck.shuffle();

        updatePlayerHandDiv(player1)
        updatePlayerHandDiv(player2)

        // Player 1 to start; player2 + turnEnd function to enable
        currentPlayer = player2

        gameMessages.innerText = `Game started! Player 1 goes first.`
        seeTheFuture()
        drawPile.addEventListener('click', game.drawCard)
        restartButton.style.display = "block";
        restartButton.addEventListener('click', () => {
            window.location.reload()
        })
        turnEnd()
    }
    drawCard() {
        gameMessages.innerText = ""
        let columnToAppend;
        if (game.extraTurn === true) {
            columnToAppend = currentPlayer.column
            currentPlayer.hand.push(deck.deal())
            let drawnCard = currentPlayer.hand[currentPlayer.hand.length-1].getHTML()
            checkDrawnCard(drawnCard, currentPlayer, columnToAppend)
            seeTheFuture()
            game.extraTurn = false;
        } else {
            columnToAppend = currentPlayer.column
            currentPlayer.hand.push(deck.deal())
            let drawnCard = currentPlayer.hand[currentPlayer.hand.length-1].getHTML()
            checkDrawnCard(drawnCard, currentPlayer, columnToAppend)
            seeTheFuture()
        }
        // gameMessages.innerText = `${nextPlayer.name} ended turn by drawing a card`
        deckCounter.innerText = `${deck.numOfCards} card(s) remaining`
    }
    playAgain() {
        playButton.innerText = "Play again?"
        playButton.style.display = "block"
    }
}

const deck = new Deck();
const game = new Game(deck)

function updatePlayerHandDiv(player) {
    player.column.innerHTML = "";
    for (const card of player.hand) {
        player.column.append(card.getHTML())
    }
}

const discardedCardsArray = [];
const discardPile = document.querySelector('.discard-pile');
function onClickDiscard(e) {
    let object = e.target
    let x = object.id

    switch (x) {
        case "Defuse": 
            alert("you can't use Defuse Card!");
            break;
        case "Shuffle":
            deck.shuffle();
            gameMessages.innerText = `[${currentPlayer.name}] SHUFFLE! Deck reshuffled.`
            seeTheFuture();
            appendDiscardedCards(object)
            break;
        case "Skip":
            if (game.extraTurn === true) {
                gameMessages.innerText = `[${currentPlayer.name}] SKIP! Only need to draw one.`
                game.extraTurn = false;
                appendDiscardedCards(object);
            } else { 
                gameMessages.innerText = `[${currentPlayer.name}] SKIP!`
                appendDiscardedCards(object)
                turnEnd();
            }
            seeTheFuture();
            break;
        case "SeeTheFuture":
            gameMessages.innerText = `[${currentPlayer.name}] SEE THE FUTURE`
            stfToggle()
            appendDiscardedCards(object)
            break;
        case "Attack":
            gameMessages.innerText = `[${currentPlayer.name}] ATTACK! ${nextPlayer.name} draw 2 turns`
            appendDiscardedCards(object)
            turnEnd();
            game.extraTurn = true;
            seeTheFuture();
            break;
        case "Nope":
            if (discardedCardsArray[0] === "Attack") {
                gameMessages.innerText = `[${currentPlayer.name}] NOPE! AWW YOU MISSED!`
                appendDiscardedCards(object)
                turnEnd();
                game.extraTurn = false;
            } else if (discardedCardsArray[0] === "Skip" && discardedCardsArray[1] === "Attack") {
                alert("Invalid move. Skip was used against Attack.");
            } else if (discardedCardsArray[0] === "Skip") {
                gameMessages.innerText = `[${currentPlayer.name}] NOPE! SKIPPER NO SKIPPING!`
                appendDiscardedCards(object);
                turnEnd();
            } else {
                alert("You can only use Nope against Attack or Skip cards!")
            }
            break;
        case "Favor":
            const cardToSteal = nextPlayer.hand[Math.floor(Math.random() * nextPlayer.hand.length)];
            currentPlayer.hand.push(
                nextPlayer.hand.splice(nextPlayer.hand.indexOf(cardToSteal), 1)[0]); // stealing card
            appendDiscardedCards(object);
            updatePlayerHandDiv(currentPlayer);
            updatePlayerHandDiv(nextPlayer);
            turnEnd();
            turnEnd(); // turnEnd twice to get class styles and back to correct player
            break;
    }
}

function appendDiscardedCards(object) {
    discardedCardsArray.unshift(object.id);
    object.className = "discarded card"
    discardPile.append(object);
    currentPlayer.hand.splice(currentPlayer.hand.findIndex(x => x.name === object.id), 1)
}

// Generate See The Future Cards
const stfContainer = document.querySelector('.stf-container');
function seeTheFuture() {
    const stfCards = document.querySelectorAll('.stf')
    if (stfCards !== null) {
        for (const items of stfCards) {
            items.remove();
        }
    }
    let stfArr = [...deck.cards].slice(0,3)
    for (let i = 0; i < stfArr.length; i++) {
        const stfDiv = document.createElement('div');
        stfDiv.className = "stf";
        stfDiv.id = "stf-" + i;
        stfDiv.append(stfArr[i].getHTML());
        stfDiv.style.display = "none"
        stfContainer.append(stfDiv);
    }
}

function stfToggle() {
    const selectSTF = document.querySelectorAll('.stf');
    for (const item  of selectSTF) {
        if (item.style.display === "none") {
            item.style.display = "block"
        } else {
            item.style.display = "none"
        }
    }
}
const explodingKittenDiv = document.querySelector('#exploding');
// Check Drawn Cards
function checkDrawnCard(drawnCard, player, columnToAppend) {

    if (drawnCard.id === "ExplodingKitten" && player.hand.findIndex(x => x.name === "Defuse") !== -1) {
        player.hand.splice(player.hand.findIndex(x => x.name === "Defuse"), 1); // remove from array
        player.hand.splice(player.hand.findIndex(x => x.name === "ExplodingKitten"), 1); // remove from array
        const discardDefuse = columnToAppend.querySelector('#Defuse')
        discardDefuse.className = "discarded card"
        
        explodingKittenDiv.append(drawnCard, new Defuse().getHTML());
        setTimeout(function() {
            explodingKittenDiv.querySelector('#ExplodingKitten').remove();
            explodingKittenDiv.querySelector('#Defuse').remove();
            discardDefuse.style.opacity = "1"
            discardPile.append(discardDefuse); // append to discard pile
        }, 2500);
        // game message
        gameMessages.innerText = `${currentPlayer.name} drew the exploding kitten and defused it!`
        deck.cards.unshift(new ExplodingKitten); // future upgrade: get user input to insert
        deck.shuffle();
        turnEnd();
    } else if (drawnCard.id === "ExplodingKitten" && player.hand.findIndex(x => x.name === "Defuse") === -1) {
        explodingKittenDiv.append(drawnCard);
        gameMessages.innerText = `${currentPlayer.name} drew the exploding kitten and KABOOM! ${nextPlayer.name} wins!`
        drawPile.removeEventListener('click', game.drawCard)
        return game.playAgain();
    } else {
        updatePlayerHandDiv(currentPlayer)
        if (game.extraTurn === false) {
            turnEnd()
        }
    }
}

// Complete turns
function turnEnd() {
    
    if (currentPlayer === player1) {
        currentPlayer = player2;
        nextPlayer = player1;

        p2.addEventListener('click', onClickDiscard);
        for (const item of p2.children) {
            item.style.backgroundColor = "rgb(255, 121, 30, 1)"
            item.style.opacity = "1"
        }
        p1.removeEventListener('click', onClickDiscard);
        for (const item of p1.children) {
            item.style.backgroundColor = "grey"
            item.style.opacity = "0.6"
        }
        playerTurnMessage.innerHTML = `Player 2's turn <span class="p2-turn"> >></span>`

    } else {
        currentPlayer = player1
        nextPlayer = player2
        
        p1.addEventListener('click', onClickDiscard);
        for (const item of p1.children) {
            item.style.backgroundColor = "rgb(255, 121, 30, 1)"
            item.style.opacity = "1"
        }
        
        p2.removeEventListener('click', onClickDiscard);
        for (const item of p2.children) {
            item.style.backgroundColor = "grey"
            item.style.opacity = "0.6"
        }
        playerTurnMessage.innerHTML = `<span class="p1-turn"><< </span> Player 1's turn`
    }
    return { currentPlayer, nextPlayer }
}

playButton.addEventListener('click', game.start);

const modal = document.getElementById('modal-01');
const modalButton = document.getElementById('modal-button');
const modalCloseButton = document.getElementById('modal-close-button');

modalButton.addEventListener('click', () => {
    modal.style.display = "block";
});

modalCloseButton.addEventListener('click', () => {
    modal.style.display = "none";
});

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}