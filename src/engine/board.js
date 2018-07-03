import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Pawn from './pieces/pawn'
import King from './pieces/king'
import Rook from './pieces/rook';
import Piece from './pieces/piece';

export default class Board {
    constructor(currentPlayer) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
        this.checkWhite = false;
        this.checkBlack = false;
    }

    createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    setPiece(square, piece) {
        this.board[square.row][square.col] = piece;
    }

    getPiece(square) {
        return this.board[square.row][square.col];
    }

    findPiece(pieceToFind) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    movePiece(fromSquare, toSquare) {
        const movingPiece = this.getPiece(fromSquare);        
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.disableExpiredEnPassants();
            this.takeIfEnPassant(movingPiece,fromSquare,toSquare);
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            movingPiece.hasMoved = true;
            this.checkCasteling(movingPiece,fromSquare,toSquare);
            this.enableEnPassant(movingPiece,fromSquare,toSquare);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        }
        this.tagCheck();
    }

    disableExpiredEnPassants(){
        for(let i=0;i<GameSettings.BOARD_SIZE;i++){
            for(let p=0; p<GameSettings.BOARD_SIZE; p++){
                let square=Square.at(i,p);
                if(this.getPiece(square) instanceof Pawn){
                    this.getPiece(square).leftEnPassant = false;
                    this.getPiece(square).rightEnPassant = false;
                }
            }
        }
    }

    enableEnPassant(movingPiece,fromSquare,toSquare){
        if(movingPiece instanceof Pawn && Math.abs(fromSquare.row - toSquare.row) === 2){
            var otherpeice=this.getPiece(Square.at(toSquare.row,toSquare.col-1));
            if(otherpeice instanceof Pawn && movingPiece.player != otherpeice.player){
                otherpeice.rightEnPassant=true;
            }
            otherpeice=this.getPiece(Square.at(toSquare.row,toSquare.col+1));
            if(otherpeice instanceof Pawn && movingPiece.player != otherpeice.player){
                otherpeice.leftEnPassant=true;
            }
        }
    }

    takeIfEnPassant(movingPiece,fromSquare,toSquare){
        if(movingPiece instanceof Pawn && fromSquare.col !== toSquare.col){
            if(!this.isOccupied(toSquare)){
                let direction = this.player === Player.WHITE ? 1 : -1;
                this.setPiece(Square.at(toSquare.row+direction,toSquare.col), undefined);
            }
        }
    }

    checkCasteling(movingPiece,fromSquare,toSquare){
        if(movingPiece instanceof King && Math.abs(fromSquare.col - toSquare.col) >1){
            if(toSquare.col ===6){
                this.setPiece(Square.at(toSquare.row,7),undefined);
                let movedRook = new Rook(movingPiece.player);
                movedRook.hasMoved=true;
                this.setPiece(Square.at(toSquare.row,5),movedRook);
            }else{
                this.setPiece(Square.at(toSquare.row,0),undefined);
                let movedRook = new Rook(movingPiece.player);
                movedRook.hasMoved=true;
                this.setPiece(Square.at(toSquare.row,2),movedRook);
            }
        }            
    }

    isOccupied(square){
        return (typeof this.getPiece(square) !== 'undefined');
    }

    isOnBoard(square){
        let rowInBoard = square.row < GameSettings.BOARD_SIZE && square.row >= 0;
        let colInBoard = square.col< GameSettings.BOARD_SIZE && square.col >= 0;
        return colInBoard && rowInBoard;
    }
    tagCheck(){
       let kings =Array(2);
       for(let i =0; i <GameSettings.BOARD_SIZE;i++){
           for(let j=0;j<GameSettings.BOARD_SIZE;j++){
                let piece = this.getPiece(Square.at(i,j));
                if(piece instanceof King){
                    if(piece.player=== Player.WHITE){
                        kings[0] = Square.at(i,j);
                    }else{
                        kings[1] = Square.at(i,j);
                    }
                }
           }
       }
       this.checkWhite = this.checkCheck(kings[0],Player.WHITE);
       this.checkBlack = this.checkCheck(kings[1],Player.BLACK);
    }

    checkCheck(kingSquare, kingPlayer){
        if(typeof kingSquare !== 'undefined'){
            for(let i = 0; i < GameSettings.BOARD_SIZE; i++){
                for(let j = 0; j < GameSettings.BOARD_SIZE; j++){
                    if(this.isOccupied(Square.at(i,j)) && this.getPiece(Square.at(i,j)).player !== kingPlayer){
                        let moves =this.getPiece(Square.at(i,j)).getAvailableMoves(this);
                        let result =false;
                        moves.forEach(move => {
                            if(move.col===kingSquare.col && move.row===kingSquare.row){
                                result= true;
                            }
                        });
                        if(result){return true;}
                    }
                }
            }
        }
        return false;
    }

    validateMove(fromSquare,toSquare){
        let fromBackup = this.getPiece(fromSquare);
        let toBackup = this.getPiece(toSquare);
        this.setPiece(fromSquare,undefined);
        this.setPiece(toSquare,fromBackup);
        let checkWhiteResult = this.checkWhite;
        let checkBlackResult = this.checkBlack;
        this.setPiece(fromSquare,fromBackup);
        this.setPiece(toSquare,toBackup);
        switch(this.currentPlayer){
            case Player.WHITE:
                return !checkWhiteResult;

            case Player.BLACK:
                return !checkBlackResult;
        }
    }

}
