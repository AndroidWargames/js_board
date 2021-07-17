import Square from '../src/square'

export default class Bishop {
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
    if (!s.hasPieceWithColor(!this.white)) {
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

  moveTo(s: Square) {
    this.square!.piece = undefined
    this.square = s
    s.piece = this
    this.hasMoved = true
  }
}
