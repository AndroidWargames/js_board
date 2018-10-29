import Square from '../src/square'

export default class Pawn {
  square?: Square
  white: boolean
  hasMoved: boolean
  constructor(square: Square, white: boolean) {
    this.square = square
    this.square.piece = this
    this.white = white
    this.hasMoved = false
  }
  canMoveTo(s: Square) {
    if (s == undefined || this.square == undefined) {
      return false
    }
    if (!s.isEmpty() || !s.inbounds) {
      return false
    }
    if (s.column != this.square.column) {
      return false
    }
    var allowedMoveDistance = this.hasMoved ? 1 : 2
    var actualMoveDistance = (s.row - this.square.row) * this.moveDirection()
    if (actualMoveDistance <= 0 || actualMoveDistance > allowedMoveDistance) return false
    if (actualMoveDistance == 2) {
      var midSquare = this.square.board.getSquare(
        this.square.row + this.moveDirection(),
        this.square.column
      )
      if (!this.canMoveTo(midSquare)) return false
    }
    return true
  }

  moveDirection() {
    return this.white ? 1 : -1
  }

  canAttack(s: Square) {
    if (s == undefined || this.square == undefined) {
      return false
    }
    if (!s.inbounds) {
      return false
    }
    if (!s.hasPieceWithColor(!this.white)) {
      return false
    }
    if (Math.abs(s.column - this.square.column) != 1) {
      return false
    }
    if (s.row - this.square.row != this.moveDirection()) {
      return false
    }
    return true
  }

  moveTo(s: Square) {
    this.square!.piece = undefined
    this.square = s
    s.piece = this
    this.hasMoved = true
  }
}
