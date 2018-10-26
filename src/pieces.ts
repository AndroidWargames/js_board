import Square from "../src/square"

export default interface IPiece
{
  square?: Square;
  white: boolean;
  canAttack(s: Square): boolean;
  canMoveTo(s: Square): boolean;
  moveTo(s: Square): void;
}


export default class Pawn
{
  square?: Square;
  white: boolean;
  hasMoved: boolean;
  constructor(square: Square, white: boolean)
  {
    this.square = square;
    this.square.piece = this;
    this.white = white;
    this.hasMoved = false;
  }
  canMoveTo(s: Square)
  {
    if (s == undefined || this.square == undefined) { return false; }
    if (!s.isEmpty() || !s.inbounds) { return false; }
    if (s.column != this.square.column) { return false; }
    var moveDistance = this.hasMoved ? 1 : 2;
    if (moveDistance == 2)
    {
      var midSquare = this.square.board.getSquare(this.square.row + this.moveDirection(), this.square.column);
      if (!this.canMoveTo(midSquare)) return false;
    }
    var moveAmount = this.moveDirection() * moveDistance;
    var squareInRange = s.row > this.square.row && s.row - moveAmount <= this.square.row;
    return squareInRange;
  }

  moveDirection()
  {
    return this.white ? 1 : -1;
  }

  canAttack(s: Square)
  {
    if (s == undefined || this.square == undefined) { return false; }
    if (!s.hasPieceWithColor(!this.white)) { return false; }
    if (Math.abs(s.column - this.square.column) != 1) { return false; }
    if (s.row - this.square.row != this.moveDirection()) return false;
    return true;
  }

  moveTo(s: Square)
  {
    this.square!.piece = undefined;
    this.square = s;
    s.piece = this;
  } 
}


