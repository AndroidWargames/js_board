import Board from '../src/board'
import Square from '../src/square'
import { Color } from '../src/color'
import Queen from '../src/queen'

function newBoard() {
  var shape = ['OOOOO', 'OOOOO', 'OOOOO', 'OOOOO', 'OOOOO']
  var board = new Board(shape)
  return board
}

describe('queen', () => {
  it('is instantiable', () => {
    var dummyboard = newBoard()
    var s = new Square(true, 0, 0, dummyboard)
    expect(new Queen(s, Color.White)).toBeInstanceOf(Queen)
  })

  it('should be able to move diagonally', () => {
    var board = newBoard()
    var q = new Queen(board.getSquare(2, 2), Color.White)
    var upLeft = board.getSquare(3, 1)
    var upLeft2 = board.getSquare(4, 0)
    var upRight = board.getSquare(3, 3)
    var upRight2 = board.getSquare(4, 4)
    var downLeft = board.getSquare(1, 1)
    var downLeft2 = board.getSquare(0, 0)
    var downRight = board.getSquare(1, 3)
    var downRight2 = board.getSquare(0, 4)
    expect(q.canMoveTo(upLeft)).toBeTruthy()
    expect(q.canMoveTo(upLeft2)).toBeTruthy()
    expect(q.canMoveTo(upRight)).toBeTruthy()
    expect(q.canMoveTo(upRight2)).toBeTruthy()
    expect(q.canMoveTo(downLeft)).toBeTruthy()
    expect(q.canMoveTo(downLeft2)).toBeTruthy()
    expect(q.canMoveTo(downRight)).toBeTruthy()
    expect(q.canMoveTo(downRight2)).toBeTruthy()
  })

  it('should be able to move vertically', () => {
    var board = newBoard()
    var q = new Queen(board.getSquare(2, 2), Color.White)
    var up = board.getSquare(3, 2)
    var up2 = board.getSquare(4, 2)
    var down = board.getSquare(1, 2)
    var down2 = board.getSquare(0, 2)
    expect(q.canMoveTo(up)).toBeTruthy()
    expect(q.canMoveTo(up2)).toBeTruthy()
    expect(q.canMoveTo(down)).toBeTruthy()
    expect(q.canMoveTo(down2)).toBeTruthy()
  })

  it('should be able to move horizontally', () => {
    var board = newBoard()
    var q = new Queen(board.getSquare(2, 2), Color.White)
    var Right = board.getSquare(2, 3)
    var Right2 = board.getSquare(2, 4)
    var Left = board.getSquare(2, 1)
    var Left2 = board.getSquare(2, 0)
    expect(q.canMoveTo(Right)).toBeTruthy()
    expect(q.canMoveTo(Right2)).toBeTruthy()
    expect(q.canMoveTo(Left)).toBeTruthy()
    expect(q.canMoveTo(Left2)).toBeTruthy()
  })

  it('should be able to attack diagonally', () => {
    var board = newBoard()
    var b = new Queen(board.getSquare(1, 1), Color.White)
    var enemySquare = board.getSquare(4, 4)
    var enemy = new Queen(enemySquare, Color.Black)
    expect(b.canAttack(enemySquare)).toBeTruthy()
  })

  it('should not move in place', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var b = new Queen(startSquare, Color.White)
    expect(b.canMoveTo(startSquare)).toBeFalsy()
  })

  it('should not move on or over pieces', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var p = new Queen(startSquare, Color.White)
    var farSquare = badWhiteBoard.getSquare(4, 4)
    var allySquare = badWhiteBoard.getSquare(3, 3)
    var ally = new Queen(allySquare, Color.Black)
    expect(p.canMoveTo(allySquare)).toBeFalsy()
    expect(p.canMoveTo(farSquare)).toBeFalsy()
  })

  it('should not move on or over out of bounds', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var p = new Queen(startSquare, Color.White)
    var farSquare = badWhiteBoard.getSquare(4, 4)
    var deadSquare = badWhiteBoard.getSquare(3, 3)
    deadSquare.inbounds = false
    expect(p.canMoveTo(deadSquare)).toBeFalsy()
    expect(p.canMoveTo(farSquare)).toBeFalsy()
  })

  it('should not be able to attack same color pieces', () => {
    var whiteAttBoard = newBoard()
    var startSquare = whiteAttBoard.getSquare(1, 1)
    var whitePieceSquare = whiteAttBoard.getSquare(2, 0)
    var ally = new Queen(whitePieceSquare, Color.White)
    var whiteQueen = new Queen(startSquare, Color.White)
    expect(whiteQueen.canAttack(whitePieceSquare)).toBeFalsy()
  })

  it('should not be able to attack out of bounds', () => {
    var whiteAttBoard = newBoard()
    var startSquare = whiteAttBoard.getSquare(1, 1)
    var outOfBounds = whiteAttBoard.getSquare(2, 2)
    outOfBounds.inbounds = false
    var whiteQueen = new Queen(startSquare, Color.White)
    expect(whiteQueen.canAttack(outOfBounds)).toBeFalsy()
    var enemy = new Queen(outOfBounds, Color.Black)
    expect(whiteQueen.canAttack(outOfBounds)).toBeFalsy()
  })

  it('should not move from undefined squares', () => {
    var board = newBoard()
    var startSquare = board.getSquare(0, 0)
    var queen = new Queen(startSquare, Color.White)
    queen.square = undefined

    var newSquare = board.getSquare(1, 1)
    expect(queen.canMoveTo(newSquare)).toBeFalsy()

    var enemySquare = board.getSquare(1, 1)
    var enemyQueen = new Queen(enemySquare, Color.Black)
    expect(queen.canAttack(enemySquare)).toBeFalsy()
  })
})
