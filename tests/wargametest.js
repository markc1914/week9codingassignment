/**
 * test code for Game of war
 * this is for running the command line
 *
 */

var expect = require('chai').expect;
var assert = require('chai').assert;

const Card = require('../Card').Card;
const Deck = require('../Deck').Deck;
const compareCards = require('../Deck').compareCards;
const { suits } = require('../Card');
const Player = require('../Player');



describe('Week 9 War Game:', () => {
  describe ('Create Card requires correct input', () => {
    it('should fail with invalid input',()=>{
      expect(() => new Card(0,'♠️')).to.throw(Error)
      expect(() => new Card(3,'')).to.throw(Error)
     })
    it('should pass with correct input',()=>{
      expect(() => new Card(14,'♠️')).to.not.throw(Error)
    })
  })

    describe('Create Player requires correct input', () => {
      it('should fail wiht invalid input', () =>{
        expect(() => new Player()).to.throw(Error)
        expect(() => new Player('')).to.throw(Error)
      })
      it('should pass with correct input',()=>{
        expect(() => new Player('Joe')).to.not.throw(Error)
      })
        
    })
  describe('Compare two cards', () => {
    it('Should Give the correct winning card', () => {
      card1 = new Card(2, suits()[0]);
      card2 = new Card(3, suits()[2]);
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
    it('Should fail if players are not valid', () => {
      let deck = new Deck();
      deck.shuffleDeck();
      expect(() => deck.dealCards()).to.throw(Error)
      let playerOne = new Player("Gary");
      expect(() => deck.dealCards(playerOne)).to.throw(Error);
      expect(() => deck.dealCards(null,playerOne)).to.throw(Error)     
    })
    
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
