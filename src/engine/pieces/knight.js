import Piece from './piece';
import Square from '../square';
import King from'./king';
import Player from '../player';

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }
    isTakeable(){
        return true;
    }

    getAvailableMoves(board) {
        let square = board.findPiece(this);

        var moves = [];
    
        let currentSquare = Square.at(square.row+1,square.col-2);
        if(board.isOnBoard(currentSquare)){moves.push(currentSquare)};
        currentSquare = Square.at(square.row-1,square.col-2);
        if(board.isOnBoard(currentSquare)){moves.push(currentSquare)};
        currentSquare = Square.at(square.row+1,square.col+2);
        if(board.isOnBoard(currentSquare)){moves.push(currentSquare)};
        currentSquare = Square.at(square.row-1,square.col+2);
        if(board.isOnBoard(currentSquare)){moves.push(currentSquare)};
        currentSquare = Square.at(square.row+2,square.col-1);
        if(board.isOnBoard(currentSquare)){moves.push(currentSquare)};
        currentSquare = Square.at(square.row+2,square.col+1);
        if(board.isOnBoard(currentSquare)){moves.push(currentSquare)};
        currentSquare = Square.at(square.row-2,square.col-1);
        if(board.isOnBoard(currentSquare)){moves.push(currentSquare)};
        currentSquare = Square.at(square.row-2,square.col+1);
        if(board.isOnBoard(currentSquare)){moves.push(currentSquare)};

        moves = this.removeInvalidMoves(moves,board);


        return moves;    
        
    }
}
