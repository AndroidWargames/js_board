import Square from '../src/square'

export default interface IPiece {
  square?: Square
  white: boolean
  canAttack(s: Square): boolean
  canMoveTo(s: Square): boolean
  moveTo(s: Square): void
}
