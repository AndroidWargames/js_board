import IPiece from '../src/piece'
import Board from '../src/board'

export default class Square {
  inbounds: boolean
  row: number
  column: number
  piece?: IPiece
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

  hasPieceWithColor(white: boolean) {
    if (this.isEmpty()) {
      return false
    }
    return (this.piece!.white = white)
  }
}
