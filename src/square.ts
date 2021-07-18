import Piece from '../src/piece'
import Board from '../src/board'
import { Color } from '../src/color'

export default class Square {
  inbounds: boolean
  row: number
  column: number
  piece?: Piece
  board: Board

  constructor(inbounds: boolean, row: number, column: number, board: Board) {
    this.inbounds = inbounds
    this.row = row
    this.column = column
    this.piece = undefined
    this.board = board
  }

  isEmpty() {
    return this.piece == undefined
  }

  hasPieceWithColor(color: Color) {
    if (this.isEmpty()) {
      return false
    }
    return this.piece!.color == color
  }
}
