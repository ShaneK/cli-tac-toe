export enum TokenType {
  X = "X",
  O = "O",
  Empty = " ",
}
export type Coordinate = {
  x: number;
  y: number;
};
export type WinVictoryOutput = {
  token?: TokenType.X | TokenType.O;
  isWon: boolean;
};

export class Game {
  public static readonly boardWidth: number = 3;
  public static readonly boardHeight: number = 3;
  public boardState: Array<Array<TokenType>> = [];

  constructor() {
    for (let y = 0; y < Game.boardHeight; y++) {
      if (!this.boardState[y]) {
        this.boardState[y] = [];
      }

      for (let x = 0; x < Game.boardWidth; x++) {
        this.boardState[y][x] = TokenType.Empty;
      }
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
   * Check if the game is won. Output identifies the winning token if so.
   */
  public isWon(): WinVictoryOutput {
    // Output storage
    let output: WinVictoryOutput = {
      isWon: false,
    };

    // Horizontal victory condition
    this.boardState.forEach((row) => {
      output = this.isWinningTokenTypeSet(row);
    });

    if (output.isWon) {
      return output;
    }

    // Vertical victory condition
    for (let column = 0; column < Game.boardWidth; column++) {
      const columnData = this.getColumn(column);
      output = this.isWinningTokenTypeSet(columnData);
      if (output.isWon) {
        return output;
      }
    }

    // Diagonal victory condition
    const diagonalValues = this.boardState.map((row, index) => {
      return row[index];
    });

    return this.isWinningTokenTypeSet(diagonalValues);
  }

  /**
   * Check a token type array to see if all of the values in the array are either X or O
   * @param types
   */
  public isWinningTokenTypeSet(types: TokenType[]): WinVictoryOutput {
    const output: WinVictoryOutput = {
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
    for (let y = 0; y < Game.boardHeight; y++) {
      console.log(this.boardState[y].join(" | "));
      if (y < Game.boardHeight - 1) {
        console.log("-----------");
      }
    }

    return "";
  }
}
