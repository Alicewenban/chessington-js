import Piece from './piece';

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let square = board.findPiece(this);
        let lateralMoves = this.getLateralMoves(board,square);
        let diagonalMoves = this.getDiagonalMoves(board,square);
        return lateralMoves.concat(diagonalMoves);
    }
}
