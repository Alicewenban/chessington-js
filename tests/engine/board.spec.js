import 'chai/register-should';
import Board from '../../src/engine/board';
import Pawn from '../../src/engine/pieces/pawn';
import Player from '../../src/engine/player';
import Square from '../../src/engine/square';
import Rook from '../../src/engine/pieces/rook';
import King from '../../src/engine/pieces/king';

describe('Board', () => {

    describe('pawns', () => {

        let board;
        beforeEach(() => { // Common code executed before each test.
            board = new Board();
        });

        it('can be added to the board', () => {
            // Arrange
            const pawn = new Pawn(Player.WHITE);
            const square = Square.at(0, 0);

            // Act
            board.setPiece(square, pawn);

            // Assert
            board.getPiece(square).should.equal(pawn); // Object equality: same object reference
        });

        it('can be found on the board', () => {
            // Arrange
            const pawn = new Pawn(Player.WHITE);
            const square = Square.at(6, 4);

            // Act
            board.setPiece(square, pawn);

            // Assert
            board.findPiece(pawn).should.eql(square); // Object equivalence: different objects, same data
        });

        it('check is detected', () => {
            // Arrange
            const king = new King(Player.BLACK);
            const rook = new Rook(Player.WHITE);

            // Act
            board.setPiece(Square.at(7,4),king);
            board.setPiece(Square.at(5,3),rook);
            board.movePiece(Square.at(5,3),Square.at(5,4));

            // Assert
            board.checkBlack.should.be.true;
        });

    });
});
