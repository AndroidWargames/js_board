import Board from '../src/board'
import Square from '../src/square'
import Rook from '../src/rook'
import { Color } from '../src/color'

function newBoard() {
  var shape = ['OOOOO', 'OOOOO', 'OOOOO', 'OOOOO', 'OOOOO']
  var board = new Board(shape)
  return board
}

describe('rook', () => {
  it('is instantiable', () => {
    var dummyboard = newBoard()
    var s = new Square(true, 0, 0, dummyboard)
    expect(new Rook(s, Color.White)).toBeInstanceOf(Rook)
  })

  it('can call moveTo', () => {
    var board = newBoard()
    var s = new Square(true, 0, 0, board)
    var s2 = new Square(true, 0, 1, board)
    var r = new Rook(s, Color.White)
    r.moveTo(s2)
    expect(s.isEmpty()).toBeTruthy()
    expect(r.square).toEqual(s2)
  })

  it('should not be able to move from nowhere', () => {
    var board = newBoard()
    var b = new Rook(board.getSquare(2, 2), Color.White)
    b.square = undefined
    var up = board.getSquare(3, 2)
    expect(b.canMoveTo(up)).toBeFalsy()
  })

  it('should be able to move vertically', () => {
    var board = newBoard()
    var b = new Rook(board.getSquare(2, 2), Color.White)
    var up = board.getSquare(3, 2)
    var up2 = board.getSquare(4, 2)
    var down = board.getSquare(1, 2)
    var down2 = board.getSquare(0, 2)
    expect(b.canMoveTo(up)).toBeTruthy()
    expect(b.canMoveTo(up2)).toBeTruthy()
    expect(b.canMoveTo(down)).toBeTruthy()
    expect(b.canMoveTo(down2)).toBeTruthy()
  })

  it('should be able to move horizontally', () => {
    var board = newBoard()
    var b = new Rook(board.getSquare(2, 2), Color.White)
    var Right = board.getSquare(2, 3)
    var Right2 = board.getSquare(2, 4)
    var Left = board.getSquare(2, 1)
    var Left2 = board.getSquare(2, 0)
    expect(b.canMoveTo(Right)).toBeTruthy()
    expect(b.canMoveTo(Right2)).toBeTruthy()
    expect(b.canMoveTo(Left)).toBeTruthy()
    expect(b.canMoveTo(Left2)).toBeTruthy()
  })

  it('should not be able to attack from nowhere', () => {
    var board = newBoard()
    var rook = new Rook(board.getSquare(2, 2), Color.White)
    rook.square = undefined

    var enemy = new Rook(board.getSquare(3, 2), Color.Black)
    var up = board.getSquare(3, 2)
    expect(rook.canAttack(up)).toBeFalsy()
  })

  it('should be able to attack vertically', () => {
    var board = newBoard()
    var b = new Rook(board.getSquare(1, 1), Color.White)
    var enemySquare = board.getSquare(4, 1)
    var enemy = new Rook(enemySquare, Color.Black)
    expect(b.canAttack(enemySquare)).toBeTruthy()

    var enemySquare = board.getSquare(0, 1)
    var enemy = new Rook(enemySquare, Color.Black)
    expect(b.canAttack(enemySquare)).toBeTruthy()
  })

  it('should be able to attack horizontally', () => {
    var board = newBoard()
    var b = new Rook(board.getSquare(1, 1), Color.White)
    var enemySquare = board.getSquare(1, 4)
    var enemy = new Rook(enemySquare, Color.Black)
    expect(b.canAttack(enemySquare)).toBeTruthy()

    var enemySquare = board.getSquare(1, 0)
    var enemy = new Rook(enemySquare, Color.Black)
    expect(b.canAttack(enemySquare)).toBeTruthy()
  })

  it('should not move in place', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var b = new Rook(startSquare, Color.White)
    expect(b.canMoveTo(startSquare)).toBeFalsy()
  })

  it('should not move on or over pieces', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var p = new Rook(startSquare, Color.White)
    var farSquare = badWhiteBoard.getSquare(1, 4)
    var allySquare = badWhiteBoard.getSquare(1, 3)
    var ally = new Rook(allySquare, Color.Black)
    expect(p.canMoveTo(allySquare)).toBeFalsy()
    expect(p.canMoveTo(farSquare)).toBeFalsy()
  })

  it('should not move on or over out of bounds', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var p = new Rook(startSquare, Color.White)
    var farSquare = badWhiteBoard.getSquare(1, 4)
    var deadSquare = badWhiteBoard.getSquare(1, 3)
    deadSquare.inbounds = false
    expect(p.canMoveTo(deadSquare)).toBeFalsy()
    expect(p.canMoveTo(farSquare)).toBeFalsy()
  })

  it('should not move diagonally', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var b = new Rook(startSquare, Color.White)
    var diagonal1 = badWhiteBoard.getSquare(2, 2)
    var diagonal2 = badWhiteBoard.getSquare(3, 3)
    expect(b.canMoveTo(diagonal1)).toBeFalsy()
    expect(b.canMoveTo(diagonal2)).toBeFalsy()
  })

  it('should not be able to attack same color pieces', () => {
    var whiteAttBoard = newBoard()
    var startSquare = whiteAttBoard.getSquare(1, 1)
    var whitePieceSquare = whiteAttBoard.getSquare(2, 1)
    var ally = new Rook(whitePieceSquare, Color.White)
    var whiteRook = new Rook(startSquare, Color.White)
    expect(whiteRook.canAttack(whitePieceSquare)).toBeFalsy()
  })

  it('should not be able to attack out of bounds', () => {
    var whiteAttBoard = newBoard()
    var startSquare = whiteAttBoard.getSquare(1, 1)
    var outOfBounds = whiteAttBoard.getSquare(2, 1)
    outOfBounds.inbounds = false
    var whiteRook = new Rook(startSquare, Color.White)
    expect(whiteRook.canAttack(outOfBounds)).toBeFalsy()
    var enemy = new Rook(outOfBounds, Color.Black)
    expect(whiteRook.canAttack(outOfBounds)).toBeFalsy()
  })
})
