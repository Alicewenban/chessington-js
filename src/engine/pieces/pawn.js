import Piece from './piece';
import Square from '../square';
import Player from '../player';
export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let square = board.findPiece(this);
        let direction = this.player === Player.WHITE ? 1 : -1;
        let moves = [];
        moves.push(Square.at(square.row+1*direction,square.col));
        if(!this.hasMoved){ 
            moves.push(Square.at(square.row+2*direction,square.col));
        }
        return moves;
    }
}
