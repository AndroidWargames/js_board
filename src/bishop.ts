import Square from '../src/square'
import { Piece } from '../src/piece'
import { Color } from '../src/color'

export default class Bishop extends Piece {
  canMoveTo(s: Square): boolean {
    if (!s.isEmpty()) {
      return false
    }
    return this.canReach(s, Piece.Direction.Bishop)
  }

  canAttack(s: Square) {
    if (s.isEmpty() || s.hasPieceWithColor(this.color)) {
      return false
    }
    return this.canReach(s, Piece.Direction.Bishop)
  }
}
