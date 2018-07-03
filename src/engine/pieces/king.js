import Piece from './piece';
import Square from '../square';
import Player from '../player';
import Rook from './rook';

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

        moves=this.removeInvalidMoves(moves,board);

        if(!this.hasMoved){
            if(this.player === Player.WHITE){
                if(board.getPiece(Square.at(0,0)) instanceof Rook &&
                   !board.isOccupied(Square.at(0,1))&&
                   !board.isOccupied(Square.at(0,2))&&
                   !board.isOccupied(Square.at(0,3))){
                    if(!board.getPiece(Square.at(0,0)).hasMoved){
                        moves.push(Square.at(0,1));
                    }
                }

                if(board.getPiece(Square.at(0,7)) instanceof Rook &&
                   !board.isOccupied(Square.at(0,6))&&
                   !board.isOccupied(Square.at(0,5))){                    
                    if(!board.getPiece(Square.at(0,7)).hasMoved){
                        moves.push(Square.at(0,6));
                    }
                }

            }else{
                if(board.getPiece(Square.at(7,0)) instanceof Rook &&
                !board.isOccupied(Square.at(7,1))&&
                !board.isOccupied(Square.at(7,2))&&
                !board.isOccupied(Square.at(7,3))){
                 if(!board.getPiece(Square.at(7,0)).hasMoved){
                     moves.push(Square.at(7,1));
                 }
             }

             if(board.getPiece(Square.at(7,7)) instanceof Rook &&
                !board.isOccupied(Square.at(7,6))&&
                !board.isOccupied(Square.at(7,5))){                    
                 if(!board.getPiece(Square.at(7,7)).hasMoved){
                     moves.push(Square.at(7,6));
                 }
             }
            }
        
    
        }
        return moves;
    }
}
