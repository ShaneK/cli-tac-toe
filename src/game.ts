export enum TokenType {
  X = "X",
  O = "O",
  Empty = " ",
}
export type Coordinate = {
  x: number;
  y: number;
};
export type GameStateOutput = {
  token?: TokenType.X | TokenType.O;
  isWon: boolean;
  isDrawn?: boolean;
};

export class Game {
  public static readonly boardWidth: number = 3;
  public static readonly boardHeight: number = 3;
  public boardState: Array<Array<TokenType>> = [];

  constructor() {
    for (let y = 0; y < Game.boardHeight; y++) {
      this.boardState[y] = new Array<TokenType>(Game.boardWidth);
      this.boardState[y].fill(TokenType.Empty);
    }
  }

  /**
   * Mark the provided coordinates with the provided token type
   * @param token
   * @param coordinate
   */
  public markValue(token: TokenType, coordinate: Coordinate): void {
    if (coordinate.x < 0 || coordinate.x > Game.boardWidth) {
      console.error(`The input X coordinate ${coordinate.x} is out of bounds!`);
      return;
    }

    if (coordinate.y < 0 || coordinate.y > Game.boardHeight) {
      console.error(`The input Y coordinate ${coordinate.y} is out of bounds!`);
      return;
    }

    this.boardState[coordinate.y][coordinate.x] = token;
  }

  /**
   * Check if the game is over either by draw or victory.
   */
  public get currentVictoryState(): GameStateOutput {
    // Output storage
    let output: GameStateOutput = {
      isWon: false,
    };

    // Horizontal victory condition
    for (let i = 0; i < this.boardState.length; i++){
      const row = this.boardState[i];
      output = this.isWinningTokenTypeSet(row);

      if (output.isWon) {
        return output;
      }
    }

    // Vertical victory condition
    for (let column = 0; column < Game.boardWidth; column++) {
      // Get each column in the board and check to see if it's a winner
      const columnData = this.getColumn(column);
      output = this.isWinningTokenTypeSet(columnData);
      if (output.isWon) {
        return output;
      }
    }

    // Diagonal victory condition
    const diagonalValues = this.boardState.map((row, index) => {
      // This will be getting the x and y at the same index, which will get us all of the
      // diagonal values across the board
      return row[index];
    });

    output = this.isWinningTokenTypeSet(diagonalValues);
    if (output.isWon) {
      return output;
    }

    output.isDrawn = this.isFull;
    return output;
  }

  /**
   * Determines if the board is full
   */
  public get isFull(): boolean {
    return this.boardState.every(row => {
      return row.every(rowColumnValue => rowColumnValue !== TokenType.Empty);
    })
  }

  /**
   * Check a token type array to see if all of the values in the array are either X or O
   * @param types
   */
  public isWinningTokenTypeSet(types: TokenType[]): GameStateOutput {
    const output: GameStateOutput = {
      isWon: false,
    };

    if (types.every((value) => value === TokenType.X)) {
      output.isWon = true;
      output.token = TokenType.X;
    } else if (types.every((value) => value === TokenType.O)) {
      output.isWon = true;
      output.token = TokenType.O;
    }

    return output;
  }

  /**
   * Get all of the tokens in a column by index
   * @param index
   */
  public getColumn(index: number): TokenType[] {
    if (index < 0 || index > Game.boardWidth) {
      console.error(`The provided index (${index}) is out of bounds!`);
      return [];
    }

    return this.boardState.map((row) => row[index] ?? TokenType.Empty);
  }

  /**
   * Output board state in an easy to scan way
   */
  public toString(): string {
    let output = '';
    this.boardState.forEach((row, index) => {
      output += row.join(" | ");

      if (index < Game.boardHeight - 1) {
        output += "\n----------\n";
      }
    });

    return output;
  }
}
