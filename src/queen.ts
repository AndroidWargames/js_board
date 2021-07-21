import Square from '../src/square'
import { Piece } from './piece'

export default class Queen extends Piece {
  canMoveTo(s: Square) {
    if (!s.isEmpty()) {
      return false
    }
    return this.canReach(s, Piece.Direction.Queen)
  }

  canAttack(s: Square) {
    if (s.isEmpty() || s.hasPieceWithColor(this.color)) {
      return false
    }
    return this.canReach(s, Piece.Direction.Queen)
  }
}
