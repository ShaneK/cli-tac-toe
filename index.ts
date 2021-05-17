import { Game, TokenType } from './src/game';

const game = new Game();
console.log('Current state:');
console.log(game.toString());
game.markValue(TokenType.O, {
  x: 0,
  y: 0
});
game.markValue(TokenType.O, {
  x: 1,
  y: 1
});
game.markValue(TokenType.O, {
  x: 2,
  y: 2
});
console.log('New state:\n', game.toString());
console.log('Is won?', game.isWon());
