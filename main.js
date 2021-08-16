// Exploding Kitties Game
class Deck {
    constructor() {
        this.cards = [];
        this.reset(); // new deck
    }
    reset() {
        this.cards = [];
        for (let i = 0; i < 4; i++) {
            this.cards.push(new Attack());
            this.cards.push(new Skip());
            this.cards.push(new Favor());
            this.cards.push(new Shuffle());
            this.cards.push(new PoliteCat());
            this.cards.push(new OmgCat());
            this.cards.push(new YaasCat());
            this.cards.push(new HeavyBreathingCat());
            this.cards.push(new AngryCat());
        }
        for (let i = 0; i < 5; i++) {
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
        console.log("shuffled!");
    }
    deal() {
        return this.cards.shift();
    }
}

// Base Class
class Card {
    constructor(name = "") {
        this.name = name;
    }
    getHTML() {
        const cardDiv = document.createElement('div');
        cardDiv.innerText = this.name
        cardDiv.className = "card"
        return cardDiv
    }
}

// Nope 5x
class Nope extends Card {
    constructor() {
        super("Nope");
    }
}
// Attack 4x
class Attack extends Card {
    constructor() {
    super("Attack");
    }
}
// Skip 4x
class Skip extends Card {
    constructor() {
        super("Skip");
    }
}
// Favor 4x
class Favor extends Card {
    constructor() {
        super("Favor");
    }
}
// Shuffle 4x
class Shuffle extends Card {
    constructor() {
        super("Shuffle");
    }

}
// See the Future 5x
class SeeTheFuture extends Card {
    constructor() {
        super("SeeTheFuture");
    }
}
// Exploding Kitten 4x
class ExplodingKitten extends Card {
    constructor() {
        super("ExplodingKitten")
    }
}
// Defuse 6x
class Defuse extends Card {
    constructor() {
        super("Defuse")
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

// function fillInPlayerInfo(name) {
//     let playerInfo = {
//         name: name.value,
//         hand: [ new Defuse() ],
//         createH2() {
//             const userH2 = document.createElement('h2');
//             userH2.innerText = name.value;
//             return userH2
//         }
//     }
// }

const p1 = document.querySelector('.player-one-column');
const p2 = document.querySelector('.player-two-column');
let player1
let player2
let currentPlayer;
let playerList = [player1, player2];

class Game {
    constructor(deck) {
        this.deck = deck;
        this.playerList = []
        this.skipPlayer = false;
        this.extraTurn = false;
        this.currentPlayer = turnEnd();
    }

    start(e) {
        console.log(deck)
        e.preventDefault()
        
        player1 = { name: "Player 1", hand: [ new Defuse() ], column: document.querySelector('#p1')}
        player2 = { name: "Player 2", hand: [ new Defuse() ], column: document.querySelector('#p2')}
        // create deck
        deck.reset();
        deck.cards.push(new Defuse());
        deck.shuffle();

        // deal players 7 cards each
        for (let i = 0; i < 7; i++) {
            player1.hand.push(deck.deal());
            player2.hand.push(deck.deal());
        }

        // insert exploding kitten card and reshuffle
        deck.cards.unshift(new ExplodingKitten());
        deck.shuffle();
        
        displayPlayerCards(player1, p1)
        displayPlayerCards(player2, p2)
        console.log(deck.cards)

        //player 1 to start
        currentPlayer = player1
        console.log(currentPlayer)

        seeTheFuture()
    }
    drawCard() {
        if (this.skipPlayer === true) {
            turnEnd()
            this.skipPlayer = false;
            seeTheFuture()
        } else if (this.extraTurn === true) {
            let columnToAppend;
            columnToAppend = currentPlayer.column
            currentPlayer.hand.push(deck.deal())
            let drawnCard = currentPlayer.hand[currentPlayer.hand.length-1].getHTML()
            checkDrawnCard(drawnCard, currentPlayer, columnToAppend)
            seeTheFuture()
        } else {
            let columnToAppend;
            columnToAppend = currentPlayer.column
            currentPlayer.hand.push(deck.deal())
            let drawnCard = currentPlayer.hand[currentPlayer.hand.length-1].getHTML()
            checkDrawnCard(drawnCard, currentPlayer, columnToAppend)
            turnEnd()
            seeTheFuture()
        }
    }
}
const endButton = document.querySelector('#endturn-button');
const deck = new Deck();
const game = new Game(deck)

function displayPlayerCards(player, column) {

    console.log(player.hand)
    for (const card of player.hand) {
        const playerCard = document.createElement('div');
        playerCard.className = "player-hand card";
        playerCard.innerText = card.name
        column.append(playerCard)
        playerCard.addEventListener('click', onClickDiscard)
    }
}

const discardedCardsArray = [];
function onClickDiscard(e) {
    const discardPile = document.querySelector('.discard-pile');
    if (e.target.innerText === "Defuse") {
        alert("you can't use Defuse Card!")
    } else {
        let object = e.target.innerText
        discardedCardsArray.push(object);
        e.target.className = "discarded card"
        discardPile.append(e.target);
        console.log("discarded array: " + discardedCardsArray)
        console.log(e.target)
        return checkDiscardCard(object)
    }
}
function checkDiscardCard(object) {
    switch (object) {
        case "Shuffle":
            deck.shuffle();
            break;
        case "Skip":
            game.skipPlayer = true;
            break;
        case "SeeTheFuture":
            stfToggle()
            console.log("checkdiscardcard")
            break;
    }
}

const stfContainer = document.querySelector('.stf-container')
function seeTheFuture() {
    console.log("stf called")
    const stfCards = document.querySelectorAll('.stf')
    if (stfCards !== null) {
        for (const items of stfCards) {
            items.remove();
        }
    }

    const stf1 = document.createElement('div')
    stf1.className = "stf card"
    stf1.id = "stf-1"
    stf1.innerText = deck.cards[0].name

    const stf2 = document.createElement('div')
    stf2.className = "stf card"
    stf2.innerText = deck.cards[1].name
    stf2.id = "stf-2"

    const stf3 = document.createElement('div')
    stf3.className = "stf card"
    stf3.innerText = deck.cards[2].name
    stf3.id = "stf-3"

    stfContainer.append(stf1, stf2, stf3)

    stfContainer.style.display = "none"
}
function stfToggle() {
    if (stfContainer.style.display === "none") {
        stfContainer.style.display = "block"
    } else {
        stfContainer.style.display = "none"
    }
}

function checkDrawnCard(drawnCard, player, columnToAppend) {
    if (drawnCard.innerText === "ExplodingKitten" && player.hand.findIndex(x => x.name === "Defuse") !== -1) {
        player.hand.splice(player.hand.findIndex(x => x.name === "Defuse"), 1);
        console.log(`${player.name} used [Defuse Card] on [Exploding Kitty]`)
        player.hand.splice(player.hand[player.hand.length-1], 1);
        deck.cards.unshift(new ExplodingKitten); //placeholder => to create function to insert user input
        deck.shuffle();
    } else if (drawnCard.innerText === "ExplodingKitten" && player.hand.findIndex(x => x.name === "Defuse") === -1) {
        console.log(`${player.name} died from [Exploding Kitty]`)
    } else {
        drawnCard.className = "player-hand card"
        columnToAppend.append(drawnCard);
        drawnCard.addEventListener('click', onClickDiscard)
    }
    console.log(player.hand)
}

function turnEnd() {
    endButton.style.display = "none";
    if (currentPlayer === player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1
    }
    console.log(currentPlayer)
    return currentPlayer
}
// function checkToEndTurn() {
//     endButton.style.display = "block"
//     endButton.addEventListener('click', turnEnd)
// }

const playButton = document.querySelector('#play-button');
playButton.addEventListener('click', game.start);

const drawPile = document.querySelector('.draw-pile');
drawPile.addEventListener('click', (currentPlayer) => {
    game.drawCard(currentPlayer)
})