import Square from '../src/square'
import Piece from '../src/piece'
import { Color } from '../src/color'

export default class Bishop extends Piece {
  canMoveTo(s: Square): boolean {
    if (this.square == undefined) {
      return false
    }
    if (!s.isEmpty()) {
      return false
    }
    return this.canReachDiagonally(s)
  }

  canAttack(s: Square) {
    if (this.square == undefined) {
      return false
    }
    if (s.isEmpty() || s.hasPieceWithColor(this.color)) {
      return false
    }
    return this.canReachDiagonally(s)
  }

  canReachDiagonally(s: Square): boolean {
    if (this.square == undefined || this.square == s) {
      return false
    }
    if (!s.inbounds) {
      return false
    }
    var columnDifference = s.column - this.square.column
    var rowDifference = s.row - this.square.row
    if (Math.abs(columnDifference) - Math.abs(rowDifference) != 0) {
      return false
    }
    var board = this.square.board
    var nearerRow = s.row - rowDifference / Math.abs(rowDifference)
    var nearerColumn = s.column - columnDifference / Math.abs(columnDifference)
    var nearerSquare = board.getSquare(nearerRow, nearerColumn)
    if (nearerSquare == this.square) {
      return true
    } else if (!nearerSquare.isEmpty() || !s.inbounds) {
      return false
    }
    return this.canReachDiagonally(nearerSquare)
  }
}
