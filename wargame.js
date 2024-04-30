/**
 *
 */

const aceValue = 14;
//face cards are 11-13 and Ace is 14
const validNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const suits = ['spades', 'diamonds', 'clubs', 'hearts'];

class Card {
  /**
   *
   * @param {Integer} number
   * @param {String} suit
   */
  constructor(number, suit) {
      this.cardNumber = number;
      this.cardSuit = suit;
  }

}

class Deck {

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
      console.log(`${this.cards[i].cardNumber} of ${this.cards[i].cardSuit}`);
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
  hand
  #score
  constructor(name){
    this.name = name;
    this.#score = 0;
    this.hand = [];
  }

  getHand(){
    let handString = ''
    for(let card of this.hand){
      handString += card.cardNumber + ' of ' + card.cardSuit + ' ';
    }
    return handString;
  }

  getScore(){
    return this.#score;
  }

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

function compareCards(card1,card2){
  if (card1.cardNumber > card2.cardNumber){
    return card1;
  }else if (card2.cardNumber > card1.cardNumber){
    return card2;
  }
  return 0;
}


let deckOfCards = new Deck();
let playerOne = new Player("Mark");
let playerTwo = new Player("CPU");
console.log(`Deck has ${deckOfCards.cards.length} cards`);
deckOfCards.shuffleDeck();
console.log(deckOfCards.cards);
deckOfCards.dealCards(playerOne,playerTwo);
console.log(`Player ${playerOne.name} hand is: ${playerOne.getHand()}`)
console.log(`Player ${playerTwo.name} hand is: ${playerTwo.getHand()}`)

for (let i = 0; i < deckOfCards.cards.length/2; i++) {
  let playerOneCard = playerOne.hand[i];
  let playerTwoCard = playerTwo.hand[i];
  console.log(`Player ${playerOne.name} plays ${playerOneCard.cardNumber} of ${playerOneCard.cardSuit}`);
  console.log(`Player ${playerTwo.name} plays ${playerTwoCard.cardNumber} of ${playerTwoCard.cardSuit}`);
  winningCard = compareCards(playerOne.hand[i],playerTwo.hand[i]);
  if(winningCard !== 0 && playerOne.hand.includes(winningCard)){
    playerOne.incrementScore();
    console.log(`Winning card was ${winningCard.cardNumber} of ${winningCard.cardSuit} held by player: ${playerOne.name}`);
  } else if (winningCard !== 0 && playerTwo.hand.includes(winningCard)) {
    playerTwo.incrementScore();
    console.log(`Winning card was ${winningCard.cardNumber} of ${winningCard.cardSuit} held by player: ${playerTwo.name}`);
  } else {
    console.log(`There was no score for this turn`);
  }
}
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
