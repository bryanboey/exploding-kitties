# Exploding Kitties - card game

A card game web application inspired by the original Exploding Kittens card game.

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#description">Description</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#how-to-play">How to Play</a></li>
    <li><a href="#flow-and-approach">Flow and Approach</a><ul>
        <li><a href="#building-cards-and-deck">Generate Cards and Deck</a></li>
        <li><a href="#building-the-game">Building the Game</a></li>
        <li><a href="#optimising-and-overall-design">Optimising and Overall Design</a></li>
      </ul>
    </li>
    <li><a href="#challenges-faced-and-lessons-learnt">Challenges Faced and Lessons Learnt</a></li>
    <li><a href="#areas-for-improvement">Areas for Improvement</a></li>
    <li><a href="#credits">Credits</a></li>
  </ol>
</details>

## Description
Exploding Kitties is a modified version of the original game with similar set of rules that governs the game. This is a GA exercise to help me translate the lessons I've learnt in the 2 weeks into skills I can apply onto future projects. During this trying time, I missed playing board/card games with friends. So, I've chose to build a game as my project that I could share with friends.

### Built With
* Javascript
* HTML
* CSS

## How to Play
### HOW IT WORKS
In the deck of cards are some Exploding Kittens.
You play the game by putting the deck face down and take turns drawing cards until someone draws an Exploding Kitten.

When that happens, that person explodes. They are now dead and out of the game.

This process continues until there’s only 1 player left, who wins the game.

BASICALLY, IF YOU EXPLODE, YOU LOSE.

### TAKING YOUR TURN
Gather all 5 of your cards into your hand and look at them. Do one of the following:
1. Either
    * PASS - Play no cards _OR_
    * PLAY - Play a card by placing it FACE UP on top of the Discard Pile. You can play as many cards as you’d like

2. End your turn by drawing a card from the Draw Pile into your hand and hope that it’s not an Exploding Kitten. You END YOUR TURN by drawing a card.

### ENDING THE GAME
The last player who hasn’t exploded wins the game.

### CARDS
#### EXPLODING KITTEN
You must show this card immediately. Unless you have a Defuse Card, you’re dead.
(Exploding Kitten is inserted back randomly after defusal)

#### DEFUSE
If you drew an Exploding Kitten, your Defuse Card will automatically be placed into Discard Pile and Exploding Kitten Card will be randomly inserted back (for now).

#### ATTACK
Do not draw any cards. Instead immediately force the next player to take 2 turns in a row. Play then continues from that player. The victim takes a turn as normal (pass-or-play then draw). When their first turn is over, It’s their turn again.

The victim of an Attack Card may play an Attack Card and the new victim will have to take 2 turns instead.

#### FAVOR
Randomly steals a player’s card from their hand.

#### NOPE
Stop action cards such as Skip and Attack Cards (for now). May not be used against Exploding Kitten and Defuse Card.

#### SHUFFLE
Self explanatory. Reshuffles the draw pile.

#### SKIP
Immediately end your turn without drawing a card. If you play a Skip Card as a defence to an Attack Card, it only ends 1 of the 2 turns. 2 Skip Cards would end both turns.

#### SEE THE FUTURE
View the top 3 cards from the Draw Pile.

**GOOD LUCK HAVE FUN & DON’T EXPLODE!**

## Flow and Approach
1. Generate Cards and Deck
    1. Class objects
    * Using Classes to create Cards, Deck and Game objects was the best approach to avoid long code blocks of arrays containing objects that are similar; because there are multiples of each card with the added benefit of Class Methods that can be called during an in-game round.
    <!-- show case multiple cards or a render -->
    * Like any card game, being able to shuffle a deck is essential. Utilising Class Methods we can do that.
    <!-- add code -->
    * We can also create HTML elements through the Class Card object method.
    <!-- add code -->

After all of the cards are generated and pushed into an array using Deck Class, we can start building our game.

2. Building the Game
    1. Functions for every action
        * Create functions for each action: draw, discard, playing an Action card.
        
        Started simple by drawing a card and die to an Exploding Kitten. Slowly added on from there; makes troubleshooting easier.

    2. Arrays to store data
        * Arrays are useful in storing data. For this game, we use them specifically for draw pile, discard pile, each player hands, and see the future cards.
        <!-- code snippets -->  

    3. Moving parts, manipulating DOM
        * Adding, removing, moving, and updating cards through use of the DOM.

        * Updating player's hand when drawing a new card.
        <!-- code snippet -->

        * Removing a card and adding it to the discard pile.
        <!-- code snippet -->

        * Move a card when player steals a card.
        <!-- code snippet -->

    4. Switch case for Action Cards
        * Players use Action cards against players during in-game rounds. Each Action card is unique properties and is may be interactable with played action cards on the discard pile such as playing a 'Nope' card on an 'Attack' card.
        <!-- code snippet -->

3. Optimising & Overall Design
    1. Card images are generated through the use of Class methods.
    <!-- code snippet -->

    2. Clean up codes, bug test, rinse and repeat.
    
    After the codes of the game was finished, it's only just to give the look and feel of the game it deserves. 

    3. Using CSS animation gives a whole different experience for the players. Adding an animation that simply show an 'Exploding Kitten' drawn and 'Defuse' card used helps explain to players that their a 'Defuse' card was discarded from their hand from that event.
        * Logging Action cards and player turns help make the game more intuitive and let players understand what is going on during rounds.
    <!-- render with mark ups -->

## Challenges Faced and Lessons Learnt
1. Current game model limitations
There are actually more cards in Exploding ~Kittens~Kitties which are not included in this game. Currently, the game is modelled in a manner that each round it only takes a single card from each player per round, which led to an incomplete product. The remaining cards are played in pairs, three of a kind, and five unique cards which won't work for the current model.

2. Creating a function to end player turns
A head scratcher. One of the challenges faced was how do I prevent the previous player from playing an Action card after drawing a card to end his turn? 

Remove the event listeners but only his/hers by targeting the parent HTML element containing them.

3. Remodelling key game function
_The 'Favor' card - stealing a player card - triggered a need for a method to update both player's hands._

One of my mistakes when building the game was how player's hand are updated. Initially, the card were simply appending into player's hand array. While that is fine and dandy, it is not efficient. It would mean that different event types would require different function to update players' cards. And that is way too confusing to read and troubleshoot when problems arises. 

One function, one job.
<!-- code snippet -->

4. From empty div to img element
After the game logic was completed, it was time to update those empty cards into images to dress up the game. It worked through the use of the ```Class Card``` method, ```getHTML()```, but it prevented me from playing any Action cards. Why? Another silly mistake of using ```innerText``` in the ```if else```.

An easy fix was to give each card an element ID and reading that instead.

5. CSS Grids
Scaling problems on different screens and not viewable on mobile devices.

In the process of updating the game to use Bootstrap instead of CSS Grids.
## Areas for Improvement
1. More efficient codes
There are still some repeating blocks of codes that are still present. Can be more efficient using callbacks.

2. Scaling different displays
Work in progress of moving to aforementioned Bootstrap.

3. Expand to full game
In order to this, because of the nature of the missing cards, I would have to remodel the eventListener to something else. Perhaps a submit button for Action cards; a 2-step process.

4. Bringing it online
Taking this game online will enable up to five players to play the game. Hopefully one where a player can create a lobby and have friends join them.

## Credits
Credits to the original game maker [Exploding Kittens Inc](https://www.explodingkittens.com/ "Exploding Kittens Inc"). If you enjoyed this game, get one and play with your friends!