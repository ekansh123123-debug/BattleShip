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
    if (this.hits === this.length) {
      this.sunk = true;
    }
    return true;
  }
  isSunk() {
    return this.length < this.hits;
  }
}
class GameBoard {
  constructor(length = 10) {
    this.length = 10;
    this.board = Array.from({ length }, () => Array(length).fill(0));
    this.ships = [];
    this.shorts = [];
  }
  isValid(x, y, ship, isHorizontal) {
    if (x >= this.length || x < 0 || y >= this.length || y < 0) return false;
    const z = isHorizontal ? x : y;
    if (z + ship.length > this.length) return false;
    return true;
  }
  isShipPresentAt(x, y) {
    return typeof this.board[x][y] === "object";
  }
  isHit(x, y) {
    return this.board[x][y] === 1 || this.board[x][y] === 3;
  }
  getShipAt(x, y) {
    if (!this.isShipPresentAt(x, y) || this.isHit(x, y)) return null;
    return this.board[x][y];
  }
  placeShip(x, y, ship, isHorizontal = true) {
    if (!this.isValid(x, y, ship, isHorizontal)) return false;
    if (this.isShipPresentAt(x, y)) return false;
    for (let i = 0; i < ship.length; i++) {
      const currentX = isHorizontal ? x + i : x;
      const currentY = isHorizontal ? y : y + i;
      if (this.isShipPresentAt(currentX, currentY)) {
        return false;
      }
    }
    for (let i = 0; i < ship.length; i++) {
      const currentX = isHorizontal ? x + i : x;
      const currentY = isHorizontal ? y : y + i;
      this.board[currentX][currentY] = ship;
    }
    this.ships.push(ship);
    return true;
  }
  isGameOver() {
    for (const ship of this.ships) {
      if (!ship.sunk) {
        return false;
      }
    }
    return true;
  }
  receiveAttack(x, y) {
    if (this.isHit(x, y)) return false;
    if (!this.isShipPresentAt(x, y)) {
      this.board[x][y] = 1;
      this.shorts.push([x, y]);
      return true;
    }
    const ship = this.getShipAt(x, y);
    ship.hit();
    this.board[x][y] = 3;
    this.shorts.push([x, y]);
    if (this.isGameOver()) {
      return "game end";
    }
    return true;
  }
}
function playerCount() {
  let count = 0;
  return () => {
    count++;
    return count;
  };
}
const nextPlayerId = playerCount();
class Player {
  constructor(name = `Player ${nextPlayerId()}`) {
    this.name = name;
    this.board = new GameBoard();
  }
}
export { Ship, GameBoard, Player };
