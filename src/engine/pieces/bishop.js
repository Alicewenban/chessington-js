import Piece from './piece';
import GameSettings from '../gameSettings';
import Square from '../square';
import King from'./king';


export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }
    isTakeable(){
        return true;
    }
    getAvailableMoves(board) {
        let square = board.findPiece(this);
        let moves= this.getDiagonalMoves(board,square);
        moves = this.removeInvalidMoves(moves,board);
        return moves;
    }

}
