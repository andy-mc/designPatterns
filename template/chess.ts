abstract class GameTemplate {
  protected readonly numberOfPlayers: number
  protected currentPlayer: number = 0;

  constructor(numberOfPlayers: number) {
    this.numberOfPlayers = numberOfPlayers;
  }

  run() {
    this.start();
    while (!this.haveWinner) {
      this.takeTurn();
    }
    console.log(`Player ${this.winningPlayer} wins.`);
  }

  protected abstract start(): void;
  protected abstract get haveWinner(): boolean;
  protected abstract takeTurn(): void;
  protected abstract get winningPlayer(): number;
}

class Chess extends GameTemplate {
  private maxTurns = 10;
  private turn = 0;

  constructor(numberOfPlayers: number) {
    super(numberOfPlayers);
  }

  protected start(): void {
    console.log(`Starting a game of chess with ${this.numberOfPlayers} players.`);
  }
  protected get haveWinner(): boolean {
    return this.turn >= this.maxTurns;
  }
  protected takeTurn(): void {
    console.log(`Turn ${this.turn++} taken by player ${this.currentPlayer + 1}.`);
    this.currentPlayer = (this.currentPlayer + 1) % this.numberOfPlayers;
  }
  protected get winningPlayer(): number {
    return this.currentPlayer + 1;
  }
}


const chess = new Chess(2);
chess.run();