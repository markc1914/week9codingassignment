/**
 *
 */

const aceValue = 14;
//face cards are 11-13 and Ace is 14
//const validNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
//const suits = ['♠️', '♦️', '♣️', '❤️'];

const Card = require('./Card').Card;
const Deck = require('./Deck').Deck;
const compareCards = require('./Deck').compareCards;
const Player = require('./Player');



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
  let winningCard = compareCards(playerOne.hand[i],playerTwo.hand[i]);
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
