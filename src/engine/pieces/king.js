import Piece from './piece';
import Square from '../square';
import Player from '../player';

export default class King extends Piece {
    constructor(player) {
        super(player);
    }
    isTakeable(){
        return false;
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

        moves.forEach(move=>{
            if(typeof board.getPiece(move) != 'undefined'){  
                if(board.getPiece(move) instanceof King || board.getPiece(move).player === Player.WHITE ){
                    moves.splice(moves.indexOf(move),1);
                };
            }

        });


        return moves;
    }
}
