import Piece from './piece';
import Square from '../square';
import Player from '../player';
import GameSettings from '../gameSettings';


export default class Pawn extends Piece {
    constructor(player) {
        super(player);
        this.leftEnPassant= false;
        this.rightEnPassant= false;
    }

    isTakeable(){
        return true;
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
     
        let diagA = Square.at(square.row+1*direction,square.col+1);
        let diagB = Square.at(square.row+1*direction,square.col-1);
        
        if(canMoveOne && board.isOccupied(diagA)){
            moves.push(diagA);
        }
     
        if(canMoveOne && board.isOccupied(diagB)){
            moves.push(diagB);
        }

        moves = this.removeInvalidMoves(moves,board);

        if(this.leftEnPassant){
            moves.push(Square.at(square.row+direction*1,square.col-1));
        }

        if(this.rightEnPassant){
            moves.push(Square.at(square.row+direction*1,square.col+1));
        }
        
        return moves;
    }
}
