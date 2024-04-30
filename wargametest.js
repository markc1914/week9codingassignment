/**
 * test code for war
 *
 */

const expect = chai.expect;
const assert = chai.assert;

 describe('Week 9 War Game:',() => {
  describe('Compare two cards', () =>{
    it('Should Give the correct winning card',() =>{
      card1 = new Card(2,'spades');
      card2 = new Card(3,'clubs');
      winningCard = compareCards(card1,card2);
      expect(winningCard).to.deep.equal(card2);
      winningCard = compareCards(card1,card1);
      expect(winningCard).to.equal(0);
    })
  })

  describe('Should shuffle the deck', () => {
    it('Should give us a randomly shuffled deck each time', () =>{
      deck1 = new Deck();
      deck2 = new Deck();
      expect(deck1.cards).to.deep.equal(deck2.cards);
      deck1.cards = shuffleDeck(deck1.cards);
      sameOrder = true;
      let i = 0;
      while (i < deck1.cards.length && sameOrder){
        if((deck1.cards[i].cardNumber !== deck2.cards[i].cardNumber) ||
        (deck1.cards[i].cardSuit !== deck2.cards[i].cardSuit)) {
          sameOrder = false;
        }
        i++;
      }
      expect(sameOrder).to.equal(false);
    })
  })
})
