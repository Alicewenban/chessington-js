import Piece from './piece';
import GameSettings from '../gameSettings';
import Square from '../square';
import King from'./king';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let square = board.findPiece(this);
        var moves= this.getLateralMoves(board,square);
        moves.forEach(move=>{
            if(board.getPiece(move) instanceof King){
                moves.splice(moves.indexOf(move),1);
            };
        });
        return moves;
    }
}
