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
            // this.cards.push(new PoliteCat());
            // this.cards.push(new OmgCat());
            // this.cards.push(new YaasCat());
            // this.cards.push(new HeavyBreathingCat());
            // this.cards.push(new AngryCat());
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
        console.log("shuffled!");
    }
    deal() {
        return this.cards.shift();
    }
    test() {
        console.log("i am working");
    }
}

// Base Class
class Card {
    constructor(name = "", image = "") {
        this.name = name;
        this.image = image;
    }
    getHTML() {
        // const cardDiv = document.createElement('div');
        // // cardDiv.innerText = this.name;
        // // cardDiv.id = cardDiv.innerText;
        // cardDiv.id = this.name
        // cardDiv.className = "player-hand card";

        const cardImg = document.createElement('img');
        cardImg.id = this.name;
        cardImg.innerText = this.name;
        cardImg.className = "player-hand card"
        cardImg.src = this.image;
        cardImg.style.width = "116px";
        cardImg.style.borderRadius = "0.5rem";
        // cardDiv.append(cardImg);
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
// Powerless cards 4 * 5
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
const drawPile = document.querySelector('.draw-pile');
const gameMessages = document.querySelector('#game-messages');
const p1 = document.getElementById('p1')
const p2 = document.getElementById('p2')
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
        e.preventDefault()
        playButton.style.display = "none";
        discardPile.innerHTML = ""
        
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
        console.log(player1.hand)
        console.log(deck.cards)

        //player 1 to start
        currentPlayer = player2
        console.log(currentPlayer)
        gameMessages.innerText = `Game started! Player 1 goes first.`
        seeTheFuture()
        drawPile.addEventListener('click', game.drawCard)
        // document.querySelector('#p1').addEventListener('click', onClickDiscard)
        turnEnd()
    }
    drawCard() {
        // if (deck.numOfCards !== 0) ===> consider putting condition 
        let columnToAppend;
        if (game.extraTurn === true) {
            // console.log(this.extraTurn);
            columnToAppend = currentPlayer.column
            currentPlayer.hand.push(deck.deal())
            let drawnCard = currentPlayer.hand[currentPlayer.hand.length-1].getHTML()
            checkDrawnCard(drawnCard, currentPlayer, columnToAppend)
            seeTheFuture()
            game.extraTurn = false;
        } else {
            // console.log(game.currentPlayer)
            columnToAppend = currentPlayer.column
            currentPlayer.hand.push(deck.deal())
            let drawnCard = currentPlayer.hand[currentPlayer.hand.length-1].getHTML()
            console.log(drawnCard)
            checkDrawnCard(drawnCard, currentPlayer, columnToAppend)
            seeTheFuture()
            // turnEnd();
        }
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
        // console.log(card)
        player.column.append(card.getHTML())
    }
    console.log(player.hand)
}

const discardedCardsArray = [];
const discardPile = document.querySelector('.discard-pile');
function onClickDiscard(e) {
    console.log(e.target)
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
                console.log("extra turn false")
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
            console.log("checkdiscardcard")
            appendDiscardedCards(object)
            break;
        case "Attack":
            gameMessages.innerText = `[${currentPlayer.name}] ATTACK! ${nextPlayer.name} draw 2 turns`
            appendDiscardedCards(object)
            turnEnd();
            game.extraTurn = true;
            console.log(game.extraTurn)
            break;
        case "Nope":
            console.log(discardedCardsArray)
            if (discardedCardsArray[0] === "Attack") {
                console.log('entered here')
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
    console.log("discarded array: " + discardedCardsArray)
    console.log(currentPlayer.hand)
    console.log('could it be this?')
}

// Create See The Future Cards
const stfWrapper = document.querySelector('.stf-wrapper')
function seeTheFuture() {
    console.log("stf called")
    const stfCards = document.querySelectorAll('.stf')
    if (stfCards !== null) {
        for (const items of stfCards) {
            items.remove();
        }
    }
    let stfArr = [...deck.cards].slice(0,3)
    console.log(stfArr)
    for (let i = 0; i < stfArr.length; i++) {
        const stfDiv = document.createElement('div');
        stfDiv.className = "stf card";
        stfDiv.id = "stf-" + i;
        stfDiv.innerText = stfArr[i].name;
        stfWrapper.append(stfDiv);
    }
    stfWrapper.style.display = "none"
}
function stfToggle() {
    if (stfWrapper.style.display === "none") {
        stfWrapper.style.display = "block"
    } else {
        stfWrapper.style.display = "none"
    }
}

// Check Drawn Cards
function checkDrawnCard(drawnCard, player, columnToAppend) {

    if (drawnCard.id === "ExplodingKitten" && player.hand.findIndex(x => x.name === "Defuse") !== -1) {
        player.hand.splice(player.hand.findIndex(x => x.name === "Defuse"), 1);
        columnToAppend.querySelector('#Defuse').remove()
        console.log(`${player.name} used [Defuse Card] on [Exploding Kitty]`)
        player.hand.splice(player.hand.findIndex(x => x.name === "ExplodingKitten"), 1);
        // game message
        gameMessages.innerText = `${currentPlayer.name} drew the exploding kitten and defused it!`
        deck.cards.unshift(new ExplodingKitten); //placeholder => to create function to insert user input
        deck.shuffle();
        turnEnd();
    } else if (drawnCard.id === "ExplodingKitten" && player.hand.findIndex(x => x.name === "Defuse") === -1) {
        gameMessages.innerText = `${currentPlayer.name} drew the exploding kitten and exploded. ${nextPlayer.name} wins!`
        drawPile.removeEventListener('click', game.drawCard)
        console.log(`${player.name} died from [Exploding Kitty]`)
        return game.playAgain();
    } else {
        updatePlayerHandDiv(currentPlayer)
        if (game.extraTurn === false) {
            turnEnd()
        }
        console.log("entered")
    }
}

function turnEnd() {
    console.log(`current turn is ${currentPlayer.name}`)
    if (currentPlayer === player1) {
        currentPlayer = player2;
        nextPlayer = player1;

        p2.addEventListener('click', onClickDiscard);
        for (const item of p2.children) {
            item.style.backgroundColor = "rgb(255, 121, 30, 0.9)"
            item.style.opacity = "1"
        }
        p1.removeEventListener('click', onClickDiscard);
        for (const item of p1.children) {
            item.style.backgroundColor = "grey"
            item.style.opacity = "0.5"
        }

    } else {
        currentPlayer = player1
        nextPlayer = player2
        
        p1.addEventListener('click', onClickDiscard);
        for (const item of p1.children) {
            item.style.backgroundColor = "rgb(255, 121, 30, 0.9)"
            item.style.opacity = "1"
        }
        
        p2.removeEventListener('click', onClickDiscard);
        for (const item of p2.children) {
            item.style.backgroundColor = "grey"
            item.style.opacity = "0.5"

        }
    }
    console.log(player1.hand)
    console.log(player2.hand)
    return { currentPlayer, nextPlayer }
    
}

playButton.addEventListener('click', game.start);

