const suits = function () {
  return ['♠️', '♦️', '♣️', '❤️'];
}

const validNumbers = function () {
  return [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
}

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
      return this.cardNumber;
    }
  }
}

module.exports = {
  Card : Card,
  suits : suits,
  validNumbers : validNumbers
};
