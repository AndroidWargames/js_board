import Board from '../src/board'
import Square from '../src/square'
import { Color } from '../src/color'
import Bishop from '../src/bishop'

function newBoard() {
  var shape = ['OOOOO', 'OOOOO', 'OOOOO', 'OOOOO', 'OOOOO']
  var board = new Board(shape)
  return board
}

describe('bishop', () => {
  it('is instantiable', () => {
    var dummyboard = newBoard()
    var s = new Square(true, 0, 0, dummyboard)
    expect(new Bishop(s, Color.White)).toBeInstanceOf(Bishop)
  })

  it('should be able to move diagonally', () => {
    var board = newBoard()
    var b = new Bishop(board.getSquare(2, 2), Color.White)
    var upLeft = board.getSquare(3, 1)
    var upLeft2 = board.getSquare(4, 0)
    var upRight = board.getSquare(3, 3)
    var upRight2 = board.getSquare(4, 4)
    var downLeft = board.getSquare(1, 1)
    var downLeft2 = board.getSquare(0, 0)
    var downRight = board.getSquare(1, 3)
    var downRight2 = board.getSquare(0, 4)
    expect(b.canMoveTo(upLeft)).toBeTruthy()
    expect(b.canMoveTo(upLeft2)).toBeTruthy()
    expect(b.canMoveTo(upRight)).toBeTruthy()
    expect(b.canMoveTo(upRight2)).toBeTruthy()
    expect(b.canMoveTo(downLeft)).toBeTruthy()
    expect(b.canMoveTo(downLeft2)).toBeTruthy()
    expect(b.canMoveTo(downRight)).toBeTruthy()
    expect(b.canMoveTo(downRight2)).toBeTruthy()
  })

  it('should be able to attack diagonally', () => {
    var board = newBoard()
    var b = new Bishop(board.getSquare(1, 1), Color.White)
    var enemySquare = board.getSquare(4, 4)
    var enemy = new Bishop(enemySquare, Color.Black)
    expect(b.canAttack(enemySquare)).toBeTruthy()
  })

  it('should not move in place', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var b = new Bishop(startSquare, Color.White)
    expect(b.canMoveTo(startSquare)).toBeFalsy()
  })

  it('should not move on or over pieces', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var p = new Bishop(startSquare, Color.White)
    var farSquare = badWhiteBoard.getSquare(4, 4)
    var allySquare = badWhiteBoard.getSquare(3, 3)
    var ally = new Bishop(allySquare, Color.Black)
    expect(p.canMoveTo(allySquare)).toBeFalsy()
    expect(p.canMoveTo(farSquare)).toBeFalsy()
  })

  it('should not move on or over out of bounds', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var p = new Bishop(startSquare, Color.White)
    var farSquare = badWhiteBoard.getSquare(4, 4)
    var deadSquare = badWhiteBoard.getSquare(3, 3)
    deadSquare.inbounds = false
    expect(p.canMoveTo(deadSquare)).toBeFalsy()
    expect(p.canMoveTo(farSquare)).toBeFalsy()
  })

  it('should not move vertically', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var b = new Bishop(startSquare, Color.White)
    var forwardOneSquare = badWhiteBoard.getSquare(2, 1)
    var forwardTwoSquares = badWhiteBoard.getSquare(3, 1)
    expect(b.canMoveTo(forwardOneSquare)).toBeFalsy()
    expect(b.canMoveTo(forwardTwoSquares)).toBeFalsy()
  })

  it('should not move horizontally', () => {
    var badWhiteBoard2 = newBoard()
    var startSquare = badWhiteBoard2.getSquare(1, 1)
    var b = new Bishop(startSquare, Color.White)
    var sideOneSquare = badWhiteBoard2.getSquare(1, 2)
    var sideTwoSquares = badWhiteBoard2.getSquare(1, 3)
    expect(b.canMoveTo(sideOneSquare)).toBeFalsy()
    expect(b.canMoveTo(sideTwoSquares)).toBeFalsy()
  })

  it('should not be able to attack same color pieces', () => {
    var whiteAttBoard = newBoard()
    var startSquare = whiteAttBoard.getSquare(1, 1)
    var whitePieceSquare = whiteAttBoard.getSquare(2, 0)
    var ally = new Bishop(whitePieceSquare, Color.White)
    var whiteBishop = new Bishop(startSquare, Color.White)
    expect(whiteBishop.canAttack(whitePieceSquare)).toBeFalsy()
  })

  it('should not be able to attack out of bounds', () => {
    var whiteAttBoard = newBoard()
    var startSquare = whiteAttBoard.getSquare(1, 1)
    var outOfBounds = whiteAttBoard.getSquare(2, 2)
    outOfBounds.inbounds = false
    var whiteBishop = new Bishop(startSquare, Color.White)
    expect(whiteBishop.canAttack(outOfBounds)).toBeFalsy()
    var enemy = new Bishop(outOfBounds, Color.Black)
    expect(whiteBishop.canAttack(outOfBounds)).toBeFalsy()
  })

  it('should not move from undefined squares', () => {
    var board = newBoard()
    var startSquare = board.getSquare(0, 0)
    var bishop = new Bishop(startSquare, Color.White)
    bishop.square = undefined

    var newSquare = board.getSquare(1, 1)
    expect(bishop.canMoveTo(newSquare)).toBeFalsy()

    var enemySquare = board.getSquare(1, 1)
    var enemyBishop = new Bishop(enemySquare, Color.Black)
    expect(bishop.canAttack(enemySquare)).toBeFalsy()
  })
})
