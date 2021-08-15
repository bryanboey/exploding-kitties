// Exploding Kitties Game
class Deck {
    constructor() {
        this.deck = [];
        this.reset(); // new deck
    }
    reset() {
        this.deck = [];
        for (let i = 0; i < 4; i++) {
            this.deck.push(new AttackCard());
            this.deck.push(new SkipCard());
            this.deck.push(new FavorCard());
            this.deck.push(new ShuffleCard());
            this.deck.push(new PoliteCat());
            this.deck.push(new OmgCat());
            this.deck.push(new YaasCat());
            this.deck.push(new HeavyBreathingCat());
            this.deck.push(new AngryCat());
        }
        for (let i = 0; i < 5; i++) {
            this.deck.push(new NopeCard());
            this.deck.push(new SeeTheFutureCard());
        }
    }
    get numOfCards() {
        return this.deck.length
    }
    shuffle() {
        for (let i = this.numOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.deck[newIndex];
            this.deck[newIndex] = this.deck[i];
            this.deck[i] = oldValue
        }
        console.log("shuffled!");
    }
    deal() {
        return this.deck.shift();
    }
}

// Base Class
class Card {
    constructor(name = "") {
        this.name = name;
    }
}

// Nope 5x
class NopeCard extends Card {
    constructor() {
        super("Nope");
    }
}
// Attack 4x
class AttackCard extends Card {
    constructor() {
    super("Attack");
    }
}
// Skip 4x
class SkipCard extends Card {
    constructor() {
        super("Skip");
    }
}
// Favor 4x
class FavorCard extends Card {
    constructor() {
        super("Favor");
    }
}
// Shuffle 4x
class ShuffleCard extends Card {
    constructor() {
        super("Shuffle");
    }
}
// See the Future 5x
class SeeTheFutureCard extends Card {
    constructor() {
        super("See the Future");
    }
}
// Exploding Kitten 4x
class ExplodingKittenCard extends Card {
    constructor() {
        super("Explode")
    }
}
// Defuse 6x
class DefuseCard extends Card {
    constructor() {
        super("Defuse")
    }
}
// Powerless cards 4 * 5
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

function createPlayerInfo(name) {
    let playerInfo = {
        name: name.value,
        hand: [ new DefuseCard() ],
        createEle() {
            const playerOneH2 = document.createElement('h2');
            playerOneH2.innerText = name.value
            return playerOneH2
        },
    }
    return playerInfo
}

function start(e) {
    e.preventDefault();
    // create players
    getPlayerOne = document.querySelector('#player-one');
    getPlayerTwo = document.querySelector('#player-two');
    playerOne = createPlayerInfo(getPlayerOne)
    playerTwo = createPlayerInfo(getPlayerTwo)
    document.querySelector('.player-one-column').append(playerOne.createEle());
    document.querySelector('.player-two-column').append(playerTwo.createEle());

    // create deck
    const deckpile = document.querySelector('.deck-pile')
    const deck = new Deck();
    deck.shuffle()

    // deal players 7 cards each
    for (let i = 0; i < 7; i++) {
        playerOne.hand.push(deck.deal());
        playerTwo.hand.push(deck.deal());
    }

    // insert exploding kitten card and reshuffle
    deck.deck.push(new ExplodingKittenCard());
    deck.shuffle();

}

const playButton = document.querySelector('#play-button');
playButton.addEventListener('click', start);