const suits = () => {
  return ['♠️', '♦️', '♣️', '❤️'];
}

const validNumbers =  () => {
  return [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
}

class Card {
  /**
   * Constructor
   * @param {Integer} number
   * @param {String} suit
   */
  constructor(number, suit) {
    //put this here so we can do some safety checks
    if(validNumbers().indexOf(number) >=0 && suits().indexOf(suit) >=0) {
        this.cardNumber = number;
        this.cardSuit = suit;
    } else {
      throw new Error("Invalid Input");
    }
  }

  /**
   * properly displays face cards
   * @returns the card number or name if it's a face card
   */
  getCardNumber() {
    switch(this.cardNumber) {
      case 11 :
        return 'J';
      case 12 :
        return 'Q';
      case 13 :
        return 'K';
      case 14 :
        return 'A';
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
