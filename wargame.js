/**
 *
 */

const aceValue = 14;
//face cards are 11-13 and Ace is 14
const validNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const suits = ['♠️', '♦️', '♣️', '❤️'];

class Card {
  /**
   * Constructor
   * @param {Integer} number
   * @param {String} suit
   */
  constructor(number, suit) {
      this.cardNumber = number;
      this.cardSuit = suit;
  }

  /**
   * properly displays face cards
   * @returns the card number or name if it's a face card
   */
  getCardNumber() {
    switch(this.cardNumber) {
      case 11 :
        return 'Jack';
      case 12 :
        return 'Queen';
      case 13 :
        return 'King';
      case 14 :
        return 'Ace';
      default :
      return this.cardNumber
    }
  }
}

class Deck {
  /**
   * constructor
   */
  constructor() {
    this.cards = [];
    //initialize deck
    for(let i = 0; i < validNumbers.length; i++){
      for(let j = 0 ; j < suits.length; j++) {
        this.cards.push(new Card(validNumbers[i],suits[j]));
      }
    }
  }
  /**
   * displays the deck
   */
  printDeck() {
    for (let i = 0; i < this.cards.length; i++){
      console.log(`${this.cards[i].getCardNumber()} of ${this.cards[i].cardSuit}`);
    }
  }
  /**
   * Shuffles deck using algorithm I found at
   * https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
   */
  shuffleDeck() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  /**
   * Deals the cards from the deck to the players using array operations
   * @param {Player} playerOne - the first player
   * @param {Player} playerTwo - the second player
   */
  dealCards(playerOne, playerTwo) {
    let deckLength = this.cards.length
    for(let i = 0; i < deckLength; i++) {
      if (i%2!==0){
        playerOne.addCardtoHand(this.cards[i]);
      }else {
        playerTwo.addCardtoHand(this.cards[i]);
      }
      this.cards.splice[i,1];
    }
  }
}


class Player {
  // so you can't cheat
  #score

  /**
   * Constructor
   * @param {string} name
   */
  constructor(name){
    this.name = name;
    this.#score = 0;
    this.hand = [];
  }
  /**
   * Builds a string of the player's hand
   * @returns a string representing the player's hand
   */
  getHand(){
    let handString = ''
    for(let card of this.hand){
      handString += card.getCardNumber() + ' of ' + card.cardSuit + ' ';
    }
    return handString;
  }

  /**
   * gets player score
   * @returns the current score
   */
  getScore(){
    return this.#score;
  }

  /**
   * adds one to players current score
   */
  incrementScore(){
    this.#score +=1;
  }

  /**
   * Adds a card to the player's hand
   * @param {Card} card
   */
  addCardtoHand(card){
    this.hand.push(card);
  }

  /**
   * Removes a card from the player's hand
   * @param {card} card
   */
  removeCardFromHand(card) {
    if(this.hand.includes(card)) {
      this.hand.splice(this.hand.indexOf(card),1);
    }
  }
}

/**
 * compares two cards to see which is the winner
 * @param {Card} card1
 * @param {Card} card2
 * @returns winning card or 0 if tie
 */
function compareCards(card1,card2){
  if (card1.cardNumber > card2.cardNumber){
    return card1;
  }else if (card2.cardNumber > card1.cardNumber){
    return card2;
  }
  return 0;
}

//initialize
let deckOfCards = new Deck();
let playerOne = new Player("Mark");
let playerTwo = new Player("CPU");
console.log(`Deck has ${deckOfCards.cards.length} cards`); //should be 52 cards
deckOfCards.shuffleDeck(); //ensure the deal is random
console.log(deckOfCards.cards);
//deal cards to players
deckOfCards.dealCards(playerOne,playerTwo);
console.log(`Player ${playerOne.name} hand is: ${playerOne.getHand()}`)
console.log(`Player ${playerTwo.name} hand is: ${playerTwo.getHand()}`)

//play the game for 26 turns
for (let i = 0; i < deckOfCards.cards.length/2; i++) {
  let playerOneCard = playerOne.hand[i];
  let playerTwoCard = playerTwo.hand[i];
  console.log(`Player ${playerOne.name} plays ${playerOneCard.getCardNumber()} of ${playerOneCard.cardSuit}`);
  console.log(`Player ${playerTwo.name} plays ${playerTwoCard.getCardNumber()} of ${playerTwoCard.cardSuit}`);
  winningCard = compareCards(playerOne.hand[i],playerTwo.hand[i]);
  if(winningCard !== 0 && playerOne.hand.includes(winningCard)){
    playerOne.incrementScore();
    console.log(`Winning card was ${winningCard.getCardNumber()} of ${winningCard.cardSuit} held by player: ${playerOne.name}`);
  } else if (winningCard !== 0 && playerTwo.hand.includes(winningCard)) {
    playerTwo.incrementScore();
    console.log(`Winning card was ${winningCard.getCardNumber()} of ${winningCard.cardSuit} held by player: ${playerTwo.name}`);
  } else {
    console.log(`There was no score for this turn`);
  }
}

//determine the final scores and winner
console.log(`Final score is Player: ${playerOne.name} Score: ${playerOne.getScore()}
Player: ${playerTwo.name} Score:${playerTwo.getScore()}`);
if (playerOne.getScore() > playerTwo.getScore()){
  console.log(`Player: ${playerOne.name} wins`);
} else if (playerTwo.getScore() > playerOne.getScore()) {
  console.log(`Player: ${playerTwo.name} wins`);
} else {
  console.log(`It was a tie!!!`);
}
console.log('Game Over');

/**
 * module exports (for unit testing)
 */
module.exports = {
  Card:Card,
  Deck:Deck,
  Player:Player,
  compareCards:compareCards
}
