import Square from '../src/square'
import { Color } from '../src/color'

export class Piece {
  square: Square
  color: Color
  direction: Piece.Direction

  constructor(square: Square, color: Color) {
    this.square = square
    this.square.piece = this
    this.color = color
    this.direction = Piece.Direction.None
  }

  canMoveTo(s: Square) {
    if (!s.isEmpty()) {
      return false
    }
    return this.canReach(s, this.direction)
  }

  canAttack(s: Square) {
    if (s.isEmpty() || s.hasPieceWithColor(this.color)) {
      return false
    }
    return this.canReach(s, this.direction)
  }

  moveTo(s: Square) {
    this.square!.piece = undefined
    this.square = s
    s.piece = this
  }

  canReach(s: Square, direction: Piece.Direction) {
    if (this.validateDirection(s, direction)) {
      return this.isUnimpeded(s)
    } else {
      return false
    }
  }

  private isUnimpeded(s: Square): boolean {
    if (!s.inbounds) {
      return false
    }
    var columnDifference = s.column - this.square.column
    var rowDifference = s.row - this.square.row

    var board = this.square.board
    var nearerRow = s.row
    if (rowDifference != 0) {
      nearerRow = s.row - rowDifference / Math.abs(rowDifference)
    }
    var nearerColumn = s.column
    if (columnDifference != 0) {
      nearerColumn = s.column - columnDifference / Math.abs(columnDifference)
    }
    var nearerSquare = board.getSquare(nearerRow, nearerColumn)
    if (nearerSquare == undefined) {
      return false
    } else if (nearerSquare == this.square) {
      return true
    } else if (!nearerSquare.isEmpty() || !s.inbounds) {
      return false
    }
    return this.isUnimpeded(nearerSquare)
  }

  private validateDirection(s: Square, direction: Piece.Direction) {
    switch (direction) {
      case Piece.Direction.Bishop: {
        return this.sharesDiagonal(s)
      }
      case Piece.Direction.Rook: {
        return this.sharesRankOrFile(s)
      }
      case Piece.Direction.Queen: {
        return this.sharesDiagonal(s) || this.sharesRankOrFile(s)
      }
    }
  }

  private sharesDiagonal(s: Square) {
    if (this.square == undefined) {
      return false
    }
    var columnDifference = s.column - this.square.column
    var rowDifference = s.row - this.square.row
    return Math.abs(columnDifference) - Math.abs(rowDifference) == 0
  }

  private sharesRankOrFile(s: Square) {
    if (this.square == undefined) {
      return false
    }
    var columnDifference = s.column - this.square.column
    var rowDifference = s.row - this.square.row
    return Math.abs(columnDifference) == 0 || Math.abs(rowDifference) == 0
  }
}

export namespace Piece {
  export enum Direction {
    Bishop,
    Rook,
    Queen,
    None
  }
}
