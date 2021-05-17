import { Game, TokenType } from './src/game';

const game = new Game();
console.log('Current state:', game.toString());
game.markValue(TokenType.X, {
  x: 0,
  y: 0
});
game.markValue(TokenType.X, {
  x: 1,
  y: 1
});
game.markValue(TokenType.X, {
  x: 2,
  y: 2
});
console.log('New state:', game.toString());
console.log('Is won?', game.isWon());
