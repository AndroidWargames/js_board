import Board from '../src/board'
import Square from '../src/square'
import Pawn from '../src/pieces'

function newBoard() {
  var shape = ['OOOOO', 'OOOOO', 'OOOOO', 'OOOOO', 'OOOOO']
  var board = new Board(shape)
  return board
}

describe('Pawn', () => {
  it('is instantiable', () => {
    var dummyboard = newBoard()
    var s = new Square(true, 0, 0, dummyboard)
    expect(new Pawn(s, true)).toBeInstanceOf(Pawn)
  })

  it('can call moveTo', () => {
    var board = newBoard()
    var s = new Square(true, 0, 0, board)
    var s2 = new Square(true, 1, 1, board)
    var p = new Pawn(s, true)
    expect(p.hasMoved).toBeFalsy()
    p.moveTo(s2)
    expect(s.isEmpty()).toBeTruthy()
    expect(p.square).toEqual(s2)
    expect(p.hasMoved).toBeTruthy()
  })

  it('evaluates valid white moves correctly', () => {
    var board = newBoard()
    var p = new Pawn(board.getSquare(1, 1), true)
    var forwardOneSquare = board.getSquare(2, 1)
    expect(p.canMoveTo(forwardOneSquare)).toBeTruthy()
    var forwardTwoSquares = board.getSquare(3, 1)
    expect(p.canMoveTo(forwardTwoSquares)).toBeTruthy()
    p.moveTo(forwardOneSquare)
    expect(p.canMoveTo(forwardTwoSquares)).toBeTruthy()
  })

  it('evaluates black moves correctly', () => {
    var blackBoard = newBoard()
    var p = new Pawn(blackBoard.getSquare(4, 1), false)
    var forwardOneSquare = blackBoard.getSquare(3, 1)
    expect(p.canMoveTo(forwardOneSquare)).toBeTruthy()
    var forwardTwoSquares = blackBoard.getSquare(2, 1)
    expect(p.canMoveTo(forwardTwoSquares)).toBeTruthy()
    p.moveTo(forwardOneSquare)
    expect(p.canMoveTo(forwardTwoSquares)).toBeTruthy()
  })
})
