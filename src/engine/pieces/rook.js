import Piece from './piece';
import GameSettings from '../gameSettings';
import Square from '../square';
import King from'./king';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }
    isTakeable(){
        return true;
    }
    getAvailableMoves(board) {
        let square = board.findPiece(this);
        var moves= this.getLateralMoves(board,square);
        moves = this.removeInvalidMoves(moves,board);
        return moves;
    }
}
