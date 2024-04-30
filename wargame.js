/**
 *
 */

const aceValue = 14;
const validNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const suits = ['spades', 'diamonds', 'clubs', 'hearts'];
const warSize = 4;

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
  cards = [];

  constructor() {
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
      console.log(`${this.cards[i].getCardNumber} of ${this.cards[i].getCardSuit}`);
    }
  }
}

/**
 * Shuffles deck using algorithm I found at
 * https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
 * @param {Deck} deck of cards
 */
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

class Player {
  #hand
  #score
  constructor(name){
    this.name = name;
    this.#score = 0;
  }

  getHand(){
    return this.#hand;
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
    this.#hand.push(card);
  }

  /**
   * Removes a card from the player's hand
   * @param {card} card
   */
  removeCardFromHand(card) {
    if(this.#hand.includes(card)) {
      this.#hand.splice(this.#hand.indexOf(card),1);
    }
  }
}

function compareCards(card1,card2){
  if (card1.getCardNumber() > card2.getCardNumber()){
    return card1;
  }else if (card2.getCardNumber() > card1.getCardNumber()){
    return card2;
  }
  return 0;
}

function createWarHand(hand,cardsToPull){
  let warHand = []
  for (let i = 1; i <= cardsToPull; i++){
    warHand.push(hand[hand.length-i]);
    hand.pop();
  }
  return warHand;
}

function declareWar(hand1,hand2){
  let hand1CardsToPull = 4;
  let hand2CardsToPull = 4;
  let warHand1 = [];
  let warHand2 = [];
  if (hand1.length < warSize) {
    hand1CardsToPull = hand1.length;
  }
  if (hand2.length < warSize) {
    hand2CardsToPull = hand2.length;
  }
  warHand1 = createWarHand(hand1,hand1CardsToPull);
  warHand2 = createWarHand(hand2CardsToPull);

  return compareCards(warHand1[warHand1.length-1],warHand2[warHand2.length-1]);
}

let deckOfCards = new Deck();
let playerOne = new Player("Mark");
let Player2 = new Player("CPU");
console.log(`Deck has ${deckOfCards.cards.length} cards`);
console.log(deckOfCards.cards);
deckOfCards.cards = shuffleDeck(deckOfCards.cards);
console.log(deckOfCards.cards);
