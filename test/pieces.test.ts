import Board from "../src/board"
import Square from "../src/square"
import Pawn from "../src/pieces"

describe("Pawn", () => {
  it("is instantiable", () => {
    var s = new Square(true, 0, 0);
    expect(new Pawn(s, true)).toBeInstanceOf(Pawn)
  })
    
  it("can call moveTo", () => {
    var s = new Square(true, 0, 0);
    var s2 = new Square(true, 1, 1);
    var p = new Pawn(s, true);
    p.moveTo(s2);
    expect(s.isEmpty()).toBeTruthy();
    expect(p.square).toEqual(s2);
  })

  it("evaluates white moves correctly", () => {
  })

  it("evaluates black moves correctly", () => {
  })
})
