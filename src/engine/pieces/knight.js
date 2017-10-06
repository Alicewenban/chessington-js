import Piece from './piece';
import Square from '../square';

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let square = board.findPiece(this);

        let moves=[]
                   
        moves.push(Square.at(square.row+1,square.col-2));
        moves.push(Square.at(square.row-1,square.col-2));        
        moves.push(Square.at(square.row+1,square.col+2));
        moves.push(Square.at(square.row-1,square.col+2));
        moves.push(Square.at(square.row+2,square.col+1));
        moves.push(Square.at(square.row+2,square.col-1));
        moves.push(Square.at(square.row-2,square.col+1));
        moves.push(Square.at(square.row-2,square.col-1));
              
        return moves;
           

        
        
    }
}
