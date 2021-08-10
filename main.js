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

// Base Class
class Card {
    constructor(name = "") {
        this.name = name;
    }
    getHTML() {
        const cardDiv = document.createElement('div');
        cardDiv.innerText = this.name;
    }
}

// Different Cards inherits class Card
class SkipCard extends Card {
    constructor() {
        super("Skip");
    }
    skip() {
        console.log("skip my own turn.");
    }
}

class AttackCard extends Card {
    constructor() {
    super("Attack");
    }
    attack(nextPlayer) {
        console.log(`Skip my own turn. ${nextPlayer} has to play 2 turns.`);
        // return nextPlayer.extraTurn = nextPlayer.extraTurn + 1;
    }
}

class ShuffleCard extends Card {
    constructor() {
        super("Shuffle");
    }
    shuffle() {
        return deck.shuffle()
    }
}

class NopeCard extends Card {
    constructor() {
        super("Nope");
    }
    nope() {
        console.log("nope!")
    }
}

class SeeTheFutureCard extends Card {
    constructor() {
        super("See the Future");
    }
    seeTheFuture() {
        console.log("have a little peek...");
    }
}

class DefuseCard extends Card {
    constructor() {
        super("Defuse");
    }
}

class ExplodeCard extends Card {
    constructor() {
        super("Explode")
    }
}

class PoliteCat extends Card {
    constructor() {
        super("Polite Cat")
    }
}
class OmgCat extends Card {
    constructor() {
        super("Omg Cat")
    }
}
class YaasCat extends Card {
    constructor() {
        super("Yaas Cat")
    }
}
class HeavyBreathingCat extends Card {
    constructor() {
        super("Heavy Breathing Cat")
    }
}
class AngryCat extends Card {
    constructor() {
        super("Angry Cat")
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
        cardArr.push(new NopeCard());
        cardArr.push(new SeeTheFutureCard());
        cardArr.push(new PoliteCat());
        cardArr.push(new OmgCat());
        cardArr.push(new YaasCat());
        cardArr.push(new HeavyBreathingCat());
        cardArr.push(new AngryCat());
    }
    if (playerList.length < 3 === true) {
        for (let j = 0; j < 3; j++) {
            cardArr.push(new DefuseCard())
        }
    }
    return cardArr;
}

const deck = new Deck()
deck.shuffle()
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