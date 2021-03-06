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
    if (s == undefined || this.square == undefined) {
      return false
    }
    return this.canReachDiagonally(s, false)
  }

  canAttack(s: Square) {
    if (s == undefined || this.square == undefined) {
      return false
    }
    if (!s.hasPieceWithColor(!this.white)) {
      return false
    }
    return this.canReachDiagonally(s, true)
  }

  canReachDiagonally(s: Square, allowPiece: boolean): boolean {
    if (s == undefined || this.square == undefined) {
      return false
    }
    if ((!allowPiece && !s.isEmpty()) || !s.inbounds) {
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
    return nearerSquare == this.square || this.canReachDiagonally(nearerSquare, false)
  }

  moveTo(s: Square) {
    this.square!.piece = undefined
    this.square = s
    s.piece = this
    this.hasMoved = true
  }
}
