/**
 * test code for Game of war
 * this is for running the command line
 *
 */

var expect = require('chai').expect;
var assert = require('chai').assert;

const Card = require('../wargame').Card;
const Deck = require('../wargame').Deck;
const Player = require('../wargame').Player;
const compareCards = require('../wargame').compareCards


describe('Week 9 War Game:', () => {
  describe('Compare two cards', () => {
    it('Should Give the correct winning card', () => {
      card1 = new Card(2, 'spades');
      card2 = new Card(3, 'clubs');
      winningCard = compareCards(card1, card2);
      expect(winningCard).to.deep.equal(card2);
      winningCard = compareCards(card1, card1);
      expect(winningCard).to.equal(0);
    })
  })

  describe('Should shuffle the deck', () => {
    it('Should give us a randomly shuffled deck each time', () => {
      deck1 = new Deck();
      deck2 = new Deck();
      expect(deck1.cards).to.deep.equal(deck2.cards);
      deck1.shuffleDeck();
      sameOrder = true;
      let i = 0;
      while (i < deck1.cards.length && sameOrder) {
        if ((deck1.cards[i].cardNumber !== deck2.cards[i].cardNumber) ||
          (deck1.cards[i].cardSuit !== deck2.cards[i].cardSuit)) {
          sameOrder = false;
        }
        i++;
      }
      expect(sameOrder).to.equal(false);
    })
  })

  describe('Deal the cards and prove they are different hands', () => {
    it('Should deal the deck between two players and each should have a different hand', () => {
      let deck = new Deck();
      deck.shuffleDeck();
      let playerOne = new Player("Joe");
      let playerTwo = new Player("Steve");
      let handIsUnique = true;
      let i = 0;
      deck.dealCards(playerOne, playerTwo);
      expect(playerOne.hand.length).to.equal(playerTwo.hand.length);
      while (i < playerOne.hand.length && handIsUnique) {
        if (playerTwo.hand.includes(playerOne.hand[i])) {
          handIsUnique = false;
        }
        i++;
      }
      expect(handIsUnique).to.equal(true);
    })
  })
})
