import GameSettings from '../gameSettings';
import Square from '../square';

export default class Piece {
    constructor(player) {
        this.player = player;
        this.hasMoved=false;
    }

    getAvailableMoves(board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        this.hasMoved=true;
        board.movePiece(currentSquare, newSquare);
    }

    getDiagonalMoves(square){
        let moves=[];
        moves = getOneDirection(square,1,1,moves);
        moves = getOneDirection(square,1,-1,moves);
        moves = getOneDirection(square,-1,1,moves);
        moves = getOneDirection(square,-1,-1,moves);
        return moves;

        function getOneDirection(square, hdir, vdir, moves){
            let size = GameSettings.BOARD_SIZE;
            for(let i = 1; i<size; i++){
                let newrow = square.row + hdir*i;
                let newcol = square.col + vdir*i;
                if(newrow >= 0 && newrow < size && newcol >= 0 && newcol <size){
                    moves.push(Square.at(newrow,newcol));
                }
            }
            return moves;
        }
    }

    getLateralMoves(square){
        let moves=[];
        for(let i =0;i<GameSettings.BOARD_SIZE;i++){
            if(i!=square.col){
                moves.push(Square.at(square.row,i));
            }
        }
        for(let i =0;i<GameSettings.BOARD_SIZE;i++){
            if(i!=square.row){
                moves.push(Square.at(i,square.col));
            }
        }
        return moves;
    }
}
