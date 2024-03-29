import Square from '../src/square'
import { Piece } from './piece'

export default class Rook extends Piece {
  canMoveTo(s: Square) {
    if (!s.isEmpty()) {
      return false
    }
    return this.canReach(s, Piece.Direction.Rook)
  }

  canAttack(s: Square) {
    if (s.isEmpty() || s.hasPieceWithColor(this.color)) {
      return false
    }
    return this.canReach(s, Piece.Direction.Rook)
  }
}
