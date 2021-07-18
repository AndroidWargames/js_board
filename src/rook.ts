import Square from '../src/square'
import Piece from './piece'

export default class Rook extends Piece {
  canMoveTo(s: Square) {
    if (this.square == undefined) {
      return false
    }
    if (!s.isEmpty()) {
      return false
    }
    return this.canReachVertically(s) || this.canReachHorizontally(s)
  }

  canAttack(s: Square) {
    if (this.square == undefined) {
      return false
    }
    if (s.isEmpty() || s.hasPieceWithColor(this.color)) {
      return false
    }
    return this.canReachVertically(s) || this.canReachHorizontally(s)
  }

  canReachVertically(s: Square): boolean {
    if (this.square == s || this.square == undefined) {
      return false
    }
    if (!s.inbounds) {
      return false
    }
    var rowDifference = s.row - this.square.row
    var columnDifference = s.column - this.square.column
    if (columnDifference != 0) return false
    var board = this.square.board
    var nearerRow = s.row - rowDifference / Math.abs(rowDifference)
    var nearerSquare = board.getSquare(nearerRow, s.column)
    if (nearerSquare == this.square) {
      return true
    }
    if (!nearerSquare.isEmpty() || nearerSquare == undefined) {
      return false
    }
    return this.canReachVertically(nearerSquare)
  }

  canReachHorizontally(s: Square): boolean {
    if (this.square == undefined) {
      return false
    }
    if (!s.inbounds) {
      return false
    }
    var rowDifference = s.row - this.square.row
    var columnDifference = s.column - this.square.column
    if (rowDifference != 0) return false
    var board = this.square.board
    var nearerColumn = s.column - columnDifference / Math.abs(columnDifference)
    var nearerSquare = board.getSquare(s.row, nearerColumn)
    if (nearerSquare == this.square) {
      return true
    }
    if (!nearerSquare.isEmpty() || nearerSquare == undefined) {
      return false
    }
    return this.canReachHorizontally(nearerSquare)
  }
}
