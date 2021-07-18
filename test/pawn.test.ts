import Board from '../src/board'
import Square from '../src/square'
import Pawn from '../src/pawn'
import { Color } from '../src/color'

function newBoard() {
  var shape = [
    'OOOOOOOO',
    'OOOOOOOO',
    'OOOOOOOO',
    'OOOOOOOO',
    'OOOOOOOO',
    'OOOOOOOO',
    'OOOOOOOO',
    'OOOOOOOO'
  ]
  var board = new Board(shape)
  return board
}

describe('Pawn', () => {
  it('is instantiable', () => {
    var dummyboard = newBoard()
    var s = new Square(true, 0, 0, dummyboard)
    expect(new Pawn(s, Color.White)).toBeInstanceOf(Pawn)
  })
})

describe('White Pawn', () => {
  it('can call moveTo', () => {
    var board = newBoard()
    var s = new Square(true, 0, 0, board)
    var s2 = new Square(true, 1, 1, board)
    var p = new Pawn(s, Color.White)
    p.moveTo(s2)
    expect(s.isEmpty()).toBeTruthy()
    expect(p.square).toEqual(s2)
  })

  it('should be able to move forward one square', () => {
    var board = newBoard()
    var p = new Pawn(board.getSquare(1, 1), Color.White)
    var forwardOneSquare = board.getSquare(2, 1)
    var forwardTwoSquares = board.getSquare(3, 1)
    expect(p.canMoveTo(forwardOneSquare)).toBeTruthy()
    p.moveTo(forwardOneSquare)
    expect(p.canMoveTo(forwardTwoSquares)).toBeTruthy()
  })

  it('should be able to move forward two squares as a first move', () => {
    var board = newBoard()
    var p = new Pawn(board.getSquare(1, 1), Color.White)
    var forwardTwoSquares = board.getSquare(3, 1)
    expect(p.canMoveTo(forwardTwoSquares)).toBeTruthy()
  })

  it('should not move in place', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var p = new Pawn(startSquare, Color.White)
    expect(p.canMoveTo(startSquare)).toBeFalsy()
  })

  it('should not move too far forward', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var p = new Pawn(startSquare, Color.White)
    var farSquare = badWhiteBoard.getSquare(4, 1)
    expect(p.canMoveTo(farSquare)).toBeFalsy()
    var forwardOneSquare = badWhiteBoard.getSquare(2, 1)
    p.moveTo(forwardOneSquare)
    expect(p.canMoveTo(farSquare)).toBeFalsy()
  })

  it('should not move a direction other than forward', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var p = new Pawn(startSquare, Color.White)
    var sideSquare = badWhiteBoard.getSquare(2, 2)
    expect(p.canMoveTo(sideSquare)).toBeFalsy()
    var backSquare = badWhiteBoard.getSquare(0, 1)
    expect(p.canMoveTo(backSquare)).toBeFalsy()
  })

  it('should not move through other pieces', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var p = new Pawn(startSquare, Color.White)
    var forwardOneSquare = badWhiteBoard.getSquare(2, 1)
    var forwardTwoSquares = badWhiteBoard.getSquare(3, 1)
    var p2 = new Pawn(forwardOneSquare, Color.White)
    expect(p.canMoveTo(forwardOneSquare)).toBeFalsy()
    expect(p.canMoveTo(forwardTwoSquares)).toBeFalsy()
  })

  it('should not move on or over out of bounds squares', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var p = new Pawn(startSquare, Color.White)
    var forwardOneSquare = badWhiteBoard.getSquare(2, 1)
    var forwardTwoSquares = badWhiteBoard.getSquare(3, 1)
    forwardOneSquare.inbounds = false
    expect(p.canMoveTo(forwardTwoSquares)).toBeFalsy()
  })

  it('evaluates valid white attacks correctly', () => {
    var whiteAttBoard = newBoard()
    var startSquare = whiteAttBoard.getSquare(1, 1)
    var goodSquareLeft = whiteAttBoard.getSquare(2, 0)
    var goodSquareRight = whiteAttBoard.getSquare(2, 2)
    var blackPawnLeft = new Pawn(goodSquareLeft, Color.Black)
    var blackPawnRight = new Pawn(goodSquareRight, Color.Black)
    var whitePawn = new Pawn(startSquare, Color.White)
    expect(whitePawn.canAttack(goodSquareLeft)).toBeTruthy()
    expect(whitePawn.canAttack(goodSquareRight)).toBeTruthy()
  })

  it('should not be able to attack white pieces', () => {
    var whiteAttBoard = newBoard()
    var startSquare = whiteAttBoard.getSquare(1, 1)
    var whitePieceSquare = whiteAttBoard.getSquare(2, 0)
    var wp1 = new Pawn(whitePieceSquare, Color.White)
    var whitePawn = new Pawn(startSquare, Color.White)
    expect(whitePawn.canAttack(whitePieceSquare)).toBeFalsy()
  })

  it('should not be able to attack out of bounds', () => {
    var whiteAttBoard = newBoard()
    var startSquare = whiteAttBoard.getSquare(1, 1)
    var outOfBounds = whiteAttBoard.getSquare(2, 2)
    outOfBounds.inbounds = false
    var whitePawn = new Pawn(startSquare, Color.White)
    expect(whitePawn.canAttack(outOfBounds)).toBeFalsy()
    var bp3 = new Pawn(outOfBounds, Color.Black)
    expect(whitePawn.canAttack(outOfBounds)).toBeFalsy()
  })

  it('should not be able to attack the wrong direction', () => {
    var whiteAttBoard = newBoard()
    var startSquare = whiteAttBoard.getSquare(1, 1)
    var oneForward = whiteAttBoard.getSquare(2, 1)
    var oneLeft = whiteAttBoard.getSquare(1, 2)
    var bp1 = new Pawn(oneForward, Color.Black)
    var bp2 = new Pawn(oneLeft, Color.Black)
    var whitePawn = new Pawn(startSquare, Color.White)
    expect(whitePawn.canAttack(oneForward)).toBeFalsy()
    expect(whitePawn.canAttack(oneLeft)).toBeFalsy()
  })
})

describe('Black Pawn', () => {
  it('should be able to move forward one square', () => {
    var board = newBoard()
    var p = new Pawn(board.getSquare(3, 1), Color.Black)
    var forwardOneSquare = board.getSquare(2, 1)
    var forwardTwoSquares = board.getSquare(1, 1)
    expect(p.canMoveTo(forwardOneSquare)).toBeTruthy()
    p.moveTo(forwardOneSquare)
    expect(p.canMoveTo(forwardTwoSquares)).toBeTruthy()
  })

  it('should be able to move forward two squares as a first move', () => {
    var board = newBoard()
    var p = new Pawn(board.getSquare(6, 1), Color.White)
    var forwardTwoSquares = board.getSquare(4, 1)
    //expect(p.canMoveTo(forwardTwoSquares)).toBeTruthy()
  })

  it('should not move in place', () => {
    var badBlackBoard = newBoard()
    var startSquare = badBlackBoard.getSquare(1, 1)
    var p = new Pawn(startSquare, Color.Black)
    expect(p.canMoveTo(startSquare)).toBeFalsy()
  })

  it('should not move too far forward', () => {
    var badBlackBoard = newBoard()
    var startSquare = badBlackBoard.getSquare(4, 1)
    var p = new Pawn(startSquare, Color.Black)
    var farSquare = badBlackBoard.getSquare(1, 1)
    expect(p.canMoveTo(farSquare)).toBeFalsy()
    var forwardOneSquare = badBlackBoard.getSquare(3, 1)
    p.moveTo(forwardOneSquare)
    expect(p.canMoveTo(farSquare)).toBeFalsy()
  })

  it('should not move a direction other than forward', () => {
    var badBlackBoard = newBoard()
    var startSquare = badBlackBoard.getSquare(1, 1)
    var p = new Pawn(startSquare, Color.Black)
    var sideSquare = badBlackBoard.getSquare(0, 2)
    expect(p.canMoveTo(sideSquare)).toBeFalsy()
    var backSquare = badBlackBoard.getSquare(2, 1)
    expect(p.canMoveTo(backSquare)).toBeFalsy()
  })

  it('should not move through other pieces', () => {
    var badBlackBoard = newBoard()
    var startSquare = badBlackBoard.getSquare(3, 1)
    var p = new Pawn(startSquare, Color.Black)
    var forwardOneSquare = badBlackBoard.getSquare(2, 1)
    var forwardTwoSquares = badBlackBoard.getSquare(1, 1)
    var p2 = new Pawn(forwardOneSquare, Color.White)
    expect(p.canMoveTo(forwardOneSquare)).toBeFalsy()
    expect(p.canMoveTo(forwardTwoSquares)).toBeFalsy()
  })

  it('should not move on or over out of bounds squares', () => {
    var badBlackBoard = newBoard()
    var startSquare = badBlackBoard.getSquare(3, 1)
    var p = new Pawn(startSquare, Color.Black)
    var forwardOneSquare = badBlackBoard.getSquare(2, 1)
    var forwardTwoSquares = badBlackBoard.getSquare(1, 1)
    forwardOneSquare.inbounds = false
    expect(p.canMoveTo(forwardTwoSquares)).toBeFalsy()
  })

  it('evaluates valid black attacks correctly', () => {
    var blackAttBoard = newBoard()
    var startSquare = blackAttBoard.getSquare(3, 1)
    var goodSquareLeft = blackAttBoard.getSquare(2, 0)
    var goodSquareRight = blackAttBoard.getSquare(2, 2)
    var blackPawnLeft = new Pawn(goodSquareLeft, Color.White)
    var blackPawnRight = new Pawn(goodSquareRight, Color.White)
    var blackPawn = new Pawn(startSquare, Color.Black)
    expect(blackPawn.canAttack(goodSquareLeft)).toBeTruthy()
    expect(blackPawn.canAttack(goodSquareRight)).toBeTruthy()
  })

  it('should not be able to attack black pieces', () => {
    var blackAttBoard = newBoard()
    var startSquare = blackAttBoard.getSquare(3, 1)
    var blackPieceSquare = blackAttBoard.getSquare(2, 0)
    var wp1 = new Pawn(blackPieceSquare, Color.Black)
    var blackPawn = new Pawn(startSquare, Color.Black)
    expect(blackPawn.canAttack(blackPieceSquare)).toBeFalsy()
  })

  it('should not be able to attack out of bounds', () => {
    var blackAttBoard = newBoard()
    var startSquare = blackAttBoard.getSquare(3, 1)
    var outOfBounds = blackAttBoard.getSquare(2, 2)
    outOfBounds.inbounds = false
    var blackPawn = new Pawn(startSquare, Color.Black)
    expect(blackPawn.canAttack(outOfBounds)).toBeFalsy()
    var bp3 = new Pawn(outOfBounds, Color.White)
    expect(blackPawn.canAttack(outOfBounds)).toBeFalsy()
  })

  it('should not be able to attack the wrong direction', () => {
    var blackAttBoard = newBoard()
    var startSquare = blackAttBoard.getSquare(3, 1)
    var oneForward = blackAttBoard.getSquare(2, 1)
    var oneLeft = blackAttBoard.getSquare(3, 2)
    var bp1 = new Pawn(oneForward, Color.White)
    var bp2 = new Pawn(oneLeft, Color.White)
    var blackPawn = new Pawn(startSquare, Color.Black)
    expect(blackPawn.canAttack(oneForward)).toBeFalsy()
    expect(blackPawn.canAttack(oneLeft)).toBeFalsy()
  })
})
