import { Game, TokenType } from './src/game';

const game = new Game();
console.log('Initial state:\n', game.toString());
game.markValue(TokenType.X, {
  x: 0,
  y: 0
});
game.markValue(TokenType.O, {
  x: 1,
  y: 0
});
game.markValue(TokenType.X, {
  x: 2,
  y: 0
});
game.markValue(TokenType.X, {
  x: 0,
  y: 1
});
game.markValue(TokenType.O, {
  x: 1,
  y: 1
});
game.markValue(TokenType.X, {
  x: 2,
  y: 1
});
game.markValue(TokenType.O, {
  x: 0,
  y: 2
});
game.markValue(TokenType.X, {
  x: 1,
  y: 2
});
game.markValue(TokenType.O, {
  x: 2,
  y: 2
});
console.log('New state:\n', game.toString());
console.log('Current victory state:', game.currentVictoryState);
