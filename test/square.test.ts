import Square from '../src/square'
import Pawn from '../src/pawn'
import Board from '../src/board'

var shape = ['OOOOO', 'OOOOO', 'OOOOO', 'OOOOO', 'OOOOO']
var board = new Board(shape)
describe('Square Test', () => {
  it('Square is instantiable', () => {
    expect(new Square(true, 2, 2, board)).toBeInstanceOf(Square)
  })

  it('initializes correctly', () => {
    expect(new Square(true, 0, 0, board).inbounds).toBeTruthy()
    expect(new Square(false, 0, 0, board).inbounds).toBeFalsy()
    expect(new Square(false, 1, 1, board).row).toEqual(1)
    expect(new Square(false, 1, 1, board).column).toEqual(1)
  })

  it('has information about its piece', () => {
    var s = new Square(true, 0, 0, board)
    expect(s.isEmpty()).toBeTruthy()
    var p = new Pawn(s, true)
    expect(s.isEmpty()).toBeFalsy()
    expect(s.hasPieceWithColor(true)).toBeTruthy()
    expect(s.hasPieceWithColor(false)).toBeFalsy()
  })
})
