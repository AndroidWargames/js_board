import Square from '../src/square'
import { Color } from '../src/color'

export default class Piece {
  square?: Square
  color: Color

  constructor(square: Square, color: Color) {
    this.square = square
    this.square.piece = this
    this.color = color
  }

  canMoveTo(s: Square) {
    throw new Error('not Implemented')
  }

  canAttack(s: Square) {
    throw new Error('not Implemented')
  }

  moveTo(s: Square) {
    this.square!.piece = undefined
    this.square = s
    s.piece = this
  }
}
