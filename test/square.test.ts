import Square from "../src/square"
import Pawn from "../src/pieces"

describe("Square Test", () => {
  it("Square is instantiable", () => {
    expect(new Square(true, 2, 2)).toBeInstanceOf(Square)
  })

  it("initializes correctly", () => {
    expect(new Square(true, 0, 0).inbounds).toBeTruthy();
    expect(new Square(false, 0, 0).inbounds).toBeFalsy();
    expect(new Square(false, 1, 1).row).toEqual(1);
    expect(new Square(false, 1, 1).column).toEqual(1);
  })

  it("has information about its piece", () => {
    var s = new Square(true, 0, 0);
    expect(s.isEmpty()).toBeTruthy();
    var p = new Pawn(s, true);
    expect(s.isEmpty()).toBeFalsy();
    expect(s.hasPieceWithColor(true)).toBeTruthy();
    expect(s.hasPieceWithColor(false)).toBeFalsy();
  })
})
