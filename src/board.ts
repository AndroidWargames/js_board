import Square from "../src/square"

export default class Board {
  rows: IBoard = {};
  height: number;
  width: number;
  constructor(public boardShape: string[])
  {
    this.height = boardShape.length;
    this.width = 0;
    this.squareSerializer(boardShape);
  }
  
  squareSerializer(boardShape: string[])
  {
    let rowNumber: number;
    rowNumber = 0;
    for (var row in boardShape)
    {
      this.rows[rowNumber] = {}
      var columnNumber = 0
      for (var char of boardShape[row])
      {
        var inbounds = char == "O";
        this.rows[rowNumber][columnNumber] = new Square(inbounds, rowNumber, columnNumber);
        columnNumber += 1;
        if (columnNumber > this.width) { this.width = columnNumber; }
      }
      rowNumber += 1;
    }
  }

  getSquare(row: number, column: number)
  {
    return this.rows[row][column];
  }
}

interface IBoard {
  [row: number]: IRow;
}

interface IRow {
  [column: number]: Square;
}
