import Piece from './piece';
import Square from '../square';

export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let square = board.findPiece(this);
        let moves=[];

        let currentSquare = Square.at(square.row+1,square.col);
        if(board.isOnBoard(currentSquare)){moves.push(currentSquare)};

        currentSquare = Square.at(square.row+1,square.col-1);
        if(board.isOnBoard(currentSquare)){moves.push(currentSquare)};

        currentSquare = Square.at(square.row+1,square.col+1);
        if(board.isOnBoard(currentSquare)){moves.push(currentSquare)};

        currentSquare = Square.at(square.row-1,square.col-1);
        if(board.isOnBoard(currentSquare)){moves.push(currentSquare)};

        currentSquare = Square.at(square.row-1,square.col+1);
        if(board.isOnBoard(currentSquare)){moves.push(currentSquare)};
        
        currentSquare = Square.at(square.row-1,square.col);
        if(board.isOnBoard(currentSquare)){moves.push(currentSquare)};


        currentSquare = Square.at(square.row,square.col+1);
        if(board.isOnBoard(currentSquare)){moves.push(currentSquare)};
        
        currentSquare = Square.at(square.row,square.col-1);
        if(board.isOnBoard(currentSquare)){moves.push(currentSquare)};

        return moves;
    }
}
