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

    getDiagonalMoves(board,square){
        let moves=[];
        moves = getOneDirection(square,1,1,moves,this.player);
        moves = getOneDirection(square,1,-1,moves,this.player);
        moves = getOneDirection(square,-1,1,moves,this.player);
        moves = getOneDirection(square,-1,-1,moves,this.player);
        return moves;

        function getOneDirection(square, hdir, vdir, moves,player){
            let size = GameSettings.BOARD_SIZE;
            for(let i = 1; i<size; i++){

                let newrow = square.row + hdir*i;
                let newcol = square.col + vdir*i;


                if(newrow >= 0 && newrow < size && newcol >= 0 && newcol <size){
                   let nextSquare=Square.at(newrow,newcol);

                   if(board.isOccupied(nextSquare)){
                        if(board.getPiece(nextSquare).player === player){
                            break;
                        } else {
                            moves.push(nextSquare);
                            break;
                        }
                    } else {
                        moves.push(nextSquare);
                    }
                }
            }
            return moves;
        }
    }

    getLateralMoves(board,square){
        let moves=[];
        for(let i =0;i<GameSettings.BOARD_SIZE;i++){
            let nextSquare = Square.at(square.row,i);
            if(i!=square.col){
                if(board.isOccupied(nextSquare)){
                    if(board.getPiece(nextSquare).player === this.player){
                        break;
                    } else {
                        moves.push(nextSquare);
                        break;
                    }
                } else {
                    moves.push(nextSquare);
                }
                
            }
        }
        for(let i =0;i<GameSettings.BOARD_SIZE;i++){
            if(i!=square.row){
                moves.push(Square.at(i,square.col));
            }
        }
        return moves;
    }

    removeInvalidMoves(moves,board){
        moves.forEach(move=>{
           var movingTo=board.getPiece(move) ;
            if(typeof movingTo != 'undefined'){  
                if(!movingTo.isTakeable() || movingTo.player === this.player ){
                    moves.splice(moves.indexOf(move),1);
                }
            }
        });
        return moves;
    }
}
