const Card = require('./Card').Card;

class Player {
  // so you can't cheat
  #score

  /**
   * Constructor
   * @param {string} name
   */
  constructor(name){
    if (name !== null && typeof name === 'string' && name.length > 0 ) {
      this.name = name;
      this.#score = 0;
      this.hand = [];
    } else {
      throw new Error ("Invalid input");
    }
  }
  /**
   * Builds a string of the player's hand
   * @returns a string representing the player's hand
   */
  getHand(){
    let handString = ''
    for(let card of this.hand){
      handString += card.getCardNumber() +  card.cardSuit + ' ';
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

module.exports = Player;
