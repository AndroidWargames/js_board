import Board from "../src/board"
import Square from "../src/square"

describe("Board Serializer Test", () => {
  it("serializes the board correctly", () => {
    let definition: string[] = ["OOO", " O ", "OOO"];
    let board: Board = new Board(definition);
    expect(board.getSquare(0, 0)).toBeInstanceOf(Square);
    expect(board.getSquare(1, 1)!.inbounds).toBeTruthy();
    expect(board.getSquare(1, 0)!.inbounds).toBeFalsy();
  })
})
