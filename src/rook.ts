import Square from '../src/square'

export default class Rook {
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
    return this.canReachVertically(s, false) || this.canReachHorizontally(s, false)
  }

  canAttack(s: Square) {
    if (s == undefined || this.square == undefined) {
      return false
    }
    if (!s.hasPieceWithColor(!this.white)) {
      return false
    }
    return this.canReachVertically(s, true) || this.canReachHorizontally(s, true)
  }

  canReachVertically(s: Square, allowPiece: boolean): boolean {
    if (s == undefined || this.square == undefined) {
      return false
    }
    if ((!allowPiece && !s.isEmpty()) || !s.inbounds) {
      return false
    }
    var rowDifference = s.row - this.square.row
    var columnDifference = s.column - this.square.column
    if (columnDifference != 0) return false
    var board = this.square.board
    var nearerRow = s.row - rowDifference / Math.abs(rowDifference)
    var nearerSquare = board.getSquare(nearerRow, s.column)
    return nearerSquare == this.square || this.canReachVertically(nearerSquare, false)
  }

  canReachHorizontally(s: Square, allowPiece: boolean): boolean {
    if (s == undefined || this.square == undefined) {
      return false
    }
    if ((!allowPiece && !s.isEmpty()) || !s.inbounds) {
      return false
    }
    var rowDifference = s.row - this.square.row
    var columnDifference = s.column - this.square.column
    if (rowDifference != 0) return false
    var board = this.square.board
    var nearerColumn = s.column - columnDifference / Math.abs(columnDifference)
    var nearerSquare = board.getSquare(s.row, nearerColumn)
    return nearerSquare == this.square || this.canReachHorizontally(nearerSquare, false)
  }

  moveTo(s: Square) {
    this.square!.piece = undefined
    this.square = s
    s.piece = this
    this.hasMoved = true
  }
}
