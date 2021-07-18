import Square from '../src/square'
import Piece from '../src/piece'
import { Color } from '../src/color'

export default class Pawn extends Piece {
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
    var allowedMoveDistance = this.startingRank() == this.square.row ? 2 : 1
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
    return this.color == Color.White ? 1 : -1
  }

  startingRank() {
    return this.color == Color.White ? 1 : 6
  }

  canAttack(s: Square) {
    if (s == undefined || this.square == undefined) {
      return false
    }
    if (!s.inbounds) {
      return false
    }
    if (s.isEmpty() || s.hasPieceWithColor(this.color)) {
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
}
