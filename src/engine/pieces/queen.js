import Piece from './piece';
import King from'./king';

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }
    isTakeable(){
        return true;
    }
    getAvailableMoves(board) {
        let square = board.findPiece(this);
        let lateralMoves = this.getLateralMoves(board,square);
        let diagonalMoves = this.getDiagonalMoves(board,square);
        var moves = lateralMoves.concat(diagonalMoves);
        moves = this.removeInvalidMoves(moves,square,board);
        return moves;
        
    }
}
