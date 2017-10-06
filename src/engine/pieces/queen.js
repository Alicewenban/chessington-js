import Piece from './piece';

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let square = board.findPiece(this);
        let lateralMoves = this.getLateralMoves(square);
        let diagonalMoves = this.getDiagonalMoves(square);
        return lateralMoves.concat(diagonalMoves);
    }
}
