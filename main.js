// card types = 1. unique, 2. action
// each card * 4
const uniqueCards = ["polite cat", "omg cat", "yaas cat", "heavy breathing cat", "angry cat"]
const actionCards = [
    { skip: "end your turn without drawing card" },
    { attack: "end your turn, next player plays 2 turns" },
    { nope: "denies a player's action play" },
    { seeTheFuture: "privately peek the first 3 cards from draw pile" },
    { shuffle: "shuffle the draw pile" },
    { defuse: "defuses exploding kitten" },
    { explodingKitten: "if no defuse card, you dead" }
]

// 1. deal 1 'defuse' card to each player
// 2. if playerlist < 3 { push 2 defuse into deck} 
// 3. shuffle deck = draw pile
// 4. deal 7 cards to each players from the draw pile
// 5. insert playerlist.length-1 'exploding kitten' to the deck
// 6. shuffle deck = draw pile
// 7. random player starts

// Deck of cards
class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards;
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
}

// Action Cards
class SkipCard {
    constructor(name = "Skip") {
        this.name = name;
    }
    skip(player) {
        return player.skipTurn = true;
    }
}

class AttackCard {
    constructor(name = "Attack") {
    this.name = name;
    }
    attack(nextPlayer) {
        return nextPlayer.extraTurn = nextPlayer.extraTurn + 1
    }
}

class ShuffleCard {
    constructor(name = "Shuffle") {
        this.name = name;
    }
    shuffle() {
        return deck.shuffle()
    }
}

class DefuseCard {
    constructor(name = "Defuse") {
        this.name = name;
    }
}

class ExplodeCard {
    constructor(name = "Explode") {
        this.name = name;
    }
}
// Unique Cards
class Card {
    constructor(name = "") {
        this.name = name;
    }
}

class PoliteCat extends Card {
    constructor(name = "") {
        super()
    }
}

// Player Class 
class Player {
    constructor(name = "", hand = [ new DefuseCard() ]) {
        this.name = name;
        this.hand = hand;
        this.skipTurn = false;
        this.extraTurn = 0;
        
    }
}

// Creating Players
const playerList = []
playerList.push(new Player("Bryan"))
playerList.push(new Player("Cindy"))
console.log(playerList)

// Creating Deck of Cards 
const cardArr = [];
function freshDeck() {
    for (let i = 0; i < 4; i++) {
        cardArr.push(new SkipCard());
        cardArr.push(new AttackCard());
        cardArr.push(new ShuffleCard());
    }
    if (playerList.length < 3 === true) {
        for (let j = 0; j < 3; j++) {
            cardArr.push(new DefuseCard())
        }
    }
    return cardArr;
}

const deck = new Deck()
console.log(deck.shuffle())
console.log(deck.cards)

// dealing the next 7 cards
function dealCardsFromPile() {
    if (playerList.length-1 === 1) {
        for (let i = 0; i < 7; i++) {
            playerList[0].hand.push(deck.cards.shift());
            playerList[1].hand.push(deck.cards.shift());
        }
    }
}

dealCardsFromPile()
console.log(playerList[0].hand)
console.log(playerList[1].hand)
console.log(deck.cards)

// after dealing player cards, insert explode cards and shuffle
function insertExplodeCards() {
    x = playerList.length
    for (let i = 0; i < playerList.length-1; i++) {
        cardArr.push(new ExplodeCard());
    }
    return cardArr;
}

insertExplodeCards();
deck.shuffle();
console.log(deck.cards);





function start() {
    console.log("game started");
}