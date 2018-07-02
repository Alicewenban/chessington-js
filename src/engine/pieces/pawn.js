import Piece from './piece';
import Square from '../square';
import Player from '../player';
import GameSettings from '../gameSettings';
export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let square = board.findPiece(this);
        let direction = this.player === Player.WHITE ? 1 : -1;
        let moves = [];
        let infront = Square.at(square.row+1*direction,square.col);
        let twoInFront = Square.at(square.row+2*direction,square.col);

        let canMoveOne = direction === 1 ? square.row < GameSettings.BOARD_SIZE-1 : square.row > 0;

        if(canMoveOne && !board.isOccupied(infront)){
            moves.push(infront);
            if(!this.hasMoved && !board.isOccupied(twoInFront)){ 
                moves.push(twoInFront);
            }
        }
        return moves;
    }
}
