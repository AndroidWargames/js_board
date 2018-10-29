import Board from '../src/board'
import Square from '../src/square'
import Pawn from '../src/pawn'

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
})

describe('White Pawn', () => {
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

  it('should be able to move forward one square', () => {
    var board = newBoard()
    var p = new Pawn(board.getSquare(1, 1), true)
    var forwardOneSquare = board.getSquare(2, 1)
    var forwardTwoSquares = board.getSquare(3, 1)
    expect(p.canMoveTo(forwardOneSquare)).toBeTruthy()
    p.moveTo(forwardOneSquare)
    expect(p.canMoveTo(forwardTwoSquares)).toBeTruthy()
  })

  it('should be able to move forward two squares as a first move', () => {
    var board = newBoard()
    var p = new Pawn(board.getSquare(1, 1), true)
    var forwardTwoSquares = board.getSquare(3, 1)
    expect(p.canMoveTo(forwardTwoSquares)).toBeTruthy()
  })

  it('should not move in place', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var p = new Pawn(startSquare, true)
    expect(p.canMoveTo(startSquare)).toBeFalsy()
  })

  it('should not move too far forward', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var p = new Pawn(startSquare, true)
    var farSquare = badWhiteBoard.getSquare(4, 1)
    expect(p.canMoveTo(farSquare)).toBeFalsy()
    var forwardOneSquare = badWhiteBoard.getSquare(2, 1)
    p.moveTo(forwardOneSquare)
    expect(p.canMoveTo(farSquare)).toBeFalsy()
  })

  it('should not move a direction other than forward', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var p = new Pawn(startSquare, true)
    var sideSquare = badWhiteBoard.getSquare(2, 2)
    expect(p.canMoveTo(sideSquare)).toBeFalsy()
    var backSquare = badWhiteBoard.getSquare(0, 1)
    expect(p.canMoveTo(backSquare)).toBeFalsy()
  })

  it('should not move through other pieces', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var p = new Pawn(startSquare, true)
    var forwardOneSquare = badWhiteBoard.getSquare(2, 1)
    var forwardTwoSquares = badWhiteBoard.getSquare(3, 1)
    var p2 = new Pawn(forwardOneSquare, true)
    expect(p.canMoveTo(forwardOneSquare)).toBeFalsy()
    expect(p.canMoveTo(forwardTwoSquares)).toBeFalsy()
  })

  it('should not move on or over out of bounds squares', () => {
    var badWhiteBoard = newBoard()
    var startSquare = badWhiteBoard.getSquare(1, 1)
    var p = new Pawn(startSquare, true)
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
    var blackPawnLeft = new Pawn(goodSquareLeft, false)
    var blackPawnRight = new Pawn(goodSquareRight, false)
    var whitePawn = new Pawn(startSquare, true)
    expect(whitePawn.canAttack(goodSquareLeft)).toBeTruthy()
    expect(whitePawn.canAttack(goodSquareRight)).toBeTruthy()
  })

  it('should not be able to attack white pieces', () => {
    var whiteAttBoard = newBoard()
    var startSquare = whiteAttBoard.getSquare(1, 1)
    var whitePieceSquare = whiteAttBoard.getSquare(2, 0)
    var wp1 = new Pawn(whitePieceSquare, true)
    var whitePawn = new Pawn(startSquare, true)
    expect(whitePawn.canAttack(whitePieceSquare)).toBeFalsy()
  })

  it('should not be able to attack out of bounds', () => {
    var whiteAttBoard = newBoard()
    var startSquare = whiteAttBoard.getSquare(1, 1)
    var outOfBounds = whiteAttBoard.getSquare(2, 2)
    outOfBounds.inbounds = false
    var whitePawn = new Pawn(startSquare, true)
    expect(whitePawn.canAttack(outOfBounds)).toBeFalsy()
    var bp3 = new Pawn(outOfBounds, false)
    expect(whitePawn.canAttack(outOfBounds)).toBeFalsy()
  })

  it('should not be able to attack the wrong direction', () => {
    var whiteAttBoard = newBoard()
    var startSquare = whiteAttBoard.getSquare(1, 1)
    var oneForward = whiteAttBoard.getSquare(2, 1)
    var oneLeft = whiteAttBoard.getSquare(1, 2)
    var bp1 = new Pawn(oneForward, false)
    var bp2 = new Pawn(oneLeft, false)
    var whitePawn = new Pawn(startSquare, true)
    expect(whitePawn.canAttack(oneForward)).toBeFalsy()
    expect(whitePawn.canAttack(oneLeft)).toBeFalsy()
  })
})

describe('Black Pawn', () => {
  it('should be able to move forward one square', () => {
    var board = newBoard()
    var p = new Pawn(board.getSquare(3, 1), false)
    var forwardOneSquare = board.getSquare(2, 1)
    var forwardTwoSquares = board.getSquare(1, 1)
    expect(p.canMoveTo(forwardOneSquare)).toBeTruthy()
    p.moveTo(forwardOneSquare)
    expect(p.canMoveTo(forwardTwoSquares)).toBeTruthy()
  })

  it('should be able to move forward two squares as a first move', () => {
    var board = newBoard()
    var p = new Pawn(board.getSquare(3, 1), false)
    var forwardTwoSquares = board.getSquare(1, 1)
    expect(p.canMoveTo(forwardTwoSquares)).toBeTruthy()
  })

  it('should not move in place', () => {
    var badBlackBoard = newBoard()
    var startSquare = badBlackBoard.getSquare(1, 1)
    var p = new Pawn(startSquare, false)
    expect(p.canMoveTo(startSquare)).toBeFalsy()
  })

  it('should not move too far forward', () => {
    var badBlackBoard = newBoard()
    var startSquare = badBlackBoard.getSquare(4, 1)
    var p = new Pawn(startSquare, false)
    var farSquare = badBlackBoard.getSquare(1, 1)
    expect(p.canMoveTo(farSquare)).toBeFalsy()
    var forwardOneSquare = badBlackBoard.getSquare(3, 1)
    p.moveTo(forwardOneSquare)
    expect(p.canMoveTo(farSquare)).toBeFalsy()
  })

  it('should not move a direction other than forward', () => {
    var badBlackBoard = newBoard()
    var startSquare = badBlackBoard.getSquare(1, 1)
    var p = new Pawn(startSquare, false)
    var sideSquare = badBlackBoard.getSquare(0, 2)
    expect(p.canMoveTo(sideSquare)).toBeFalsy()
    var backSquare = badBlackBoard.getSquare(2, 1)
    expect(p.canMoveTo(backSquare)).toBeFalsy()
  })

  it('should not move through other pieces', () => {
    var badBlackBoard = newBoard()
    var startSquare = badBlackBoard.getSquare(3, 1)
    var p = new Pawn(startSquare, false)
    var forwardOneSquare = badBlackBoard.getSquare(2, 1)
    var forwardTwoSquares = badBlackBoard.getSquare(1, 1)
    var p2 = new Pawn(forwardOneSquare, true)
    expect(p.canMoveTo(forwardOneSquare)).toBeFalsy()
    expect(p.canMoveTo(forwardTwoSquares)).toBeFalsy()
  })

  it('should not move on or over out of bounds squares', () => {
    var badBlackBoard = newBoard()
    var startSquare = badBlackBoard.getSquare(3, 1)
    var p = new Pawn(startSquare, false)
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
    var blackPawnLeft = new Pawn(goodSquareLeft, true)
    var blackPawnRight = new Pawn(goodSquareRight, true)
    var blackPawn = new Pawn(startSquare, false)
    expect(blackPawn.canAttack(goodSquareLeft)).toBeTruthy()
    expect(blackPawn.canAttack(goodSquareRight)).toBeTruthy()
  })

  it('should not be able to attack black pieces', () => {
    var blackAttBoard = newBoard()
    var startSquare = blackAttBoard.getSquare(3, 1)
    var blackPieceSquare = blackAttBoard.getSquare(2, 0)
    var wp1 = new Pawn(blackPieceSquare, false)
    var blackPawn = new Pawn(startSquare, false)
    expect(blackPawn.canAttack(blackPieceSquare)).toBeFalsy()
  })

  it('should not be able to attack out of bounds', () => {
    var blackAttBoard = newBoard()
    var startSquare = blackAttBoard.getSquare(3, 1)
    var outOfBounds = blackAttBoard.getSquare(2, 2)
    outOfBounds.inbounds = false
    var blackPawn = new Pawn(startSquare, false)
    expect(blackPawn.canAttack(outOfBounds)).toBeFalsy()
    var bp3 = new Pawn(outOfBounds, true)
    expect(blackPawn.canAttack(outOfBounds)).toBeFalsy()
  })

  it('should not be able to attack the wrong direction', () => {
    var blackAttBoard = newBoard()
    var startSquare = blackAttBoard.getSquare(3, 1)
    var oneForward = blackAttBoard.getSquare(2, 1)
    var oneLeft = blackAttBoard.getSquare(3, 2)
    var bp1 = new Pawn(oneForward, true)
    var bp2 = new Pawn(oneLeft, true)
    var blackPawn = new Pawn(startSquare, false)
    expect(blackPawn.canAttack(oneForward)).toBeFalsy()
    expect(blackPawn.canAttack(oneLeft)).toBeFalsy()
  })
})
