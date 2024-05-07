const Card = require('./Card').Card;
const suits = require('./Card').suits;
const Player = require('./Player');
const validNumbers = require('./Card').validNumbers;


class Deck {
  /**
   * constructor
   */
  constructor() {
    this.cards = [];
    //initialize deck
    for(const validNumber of validNumbers()){
      for(const suit of suits()) {
        this.cards.push(new Card(validNumber,suit));
      }
    }
  }
  /**
   * displays the deck
   */
  printDeck() {
    for (const element of this.cards){
      console.log(`${element.getCardNumber()} of ${element.cardSuit}`);
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
      if(playerOne !== null && playerTwo !== null) {
        let deckLength = this.cards.length
        for(let i = 0; i < deckLength; i++) {
          if (i%2!==0){
            playerOne.addCardtoHand(this.cards[i]);
          }else {
            playerTwo.addCardtoHand(this.cards[i]);
          }
        }
      } else {
        throw new Error("Invalid Input");
      }
    }

}
  /**
 * compares two cards to see which is the winner
 * @param {Card} card1
 * @param {Card} card2
 * @returns winning card or 0 if tie
 */
  const compareCards =  (card1,card2) => {
  if (card1.cardNumber > card2.cardNumber){
    return card1;
  }else if (card2.cardNumber > card1.cardNumber){
    return card2;
  }
  return 0;
}

  module.exports = {
    Deck : Deck,
    compareCards : compareCards
  };
