class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }
  hit() {
    if (this.isSunk()) {
      return false;
    }
    this.hits++;
    return true;
  }
  isSunk() {
    return this.length <= this.sunk;
  }
}
class GameBoard {
}
export { Ship, GameBoard };
